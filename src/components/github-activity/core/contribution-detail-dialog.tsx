"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GitCommit,
  GitPullRequest,
  FileText,
  Eye,
  ExternalLink,
  X,
} from "lucide-react";
import { ContributionDetail } from "@/components/github-activity/types";

interface ContributionDetailDialogProps {
  username: string;
  date: string;
  count: number;
  isOpen: boolean;
  onClose: () => void;
  githubToken?: string;
}

// Cache for contribution details - exported so it can be prefetched
export const detailsCache = new Map<string, ContributionDetail[]>();

// Helper functions
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getEventIcon = (type: ContributionDetail["type"]) => {
  switch (type) {
    case "commit":
      return <GitCommit className="w-4 h-4" />;
    case "pullRequest":
      return <GitPullRequest className="w-4 h-4" />;
    case "issue":
      return <FileText className="w-4 h-4" />;
    case "review":
      return <Eye className="w-4 h-4" />;
    default:
      return <GitCommit className="w-4 h-4" />;
  }
};

const getEventTypeLabel = (type: ContributionDetail["type"]) => {
  switch (type) {
    case "commit":
      return "Commit";
    case "pullRequest":
      return "Pull Request";
    case "issue":
      return "Issue";
    case "review":
      return "PR Review";
    default:
      return type;
  }
};

const getEventColor = (type: ContributionDetail["type"]) => {
  switch (type) {
    case "commit":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "pullRequest":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "issue":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "review":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

// Fetch contribution details from API
async function fetchContributionDetails(
  username: string,
  date: string,
  githubToken?: string
): Promise<ContributionDetail[]> {
  console.log("Fetching contribution details for:", { username, date });

  const response = await fetch(
    `/api/github-contribution-details?username=${encodeURIComponent(
      username
    )}&date=${encodeURIComponent(date)}${
      githubToken ? `&token=${encodeURIComponent(githubToken)}` : ""
    }`
  );

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error Response:", errorData);
    throw new Error(errorData.error || "Failed to fetch contribution details");
  }

  const result = await response.json();
  console.log("API Success Response:", result);

  if (!result.success || !result.data) {
    // Handle error array from GitHub API
    const errorMsg = Array.isArray(result.error)
      ? result.error.map((e: { message?: string }) => e.message || JSON.stringify(e)).join(", ")
      : result.error || "Invalid contribution details data";
    console.error("Error details:", errorMsg);
    throw new Error(errorMsg);
  }

  const details: ContributionDetail[] = [];
  const data = result.data;

  // Process commits
  if (data.commitContributionsByRepository) {
    data.commitContributionsByRepository.forEach(
      (repoData: {
        repository: { nameWithOwner: string; url: string };
        contributions: {
          nodes: Array<{
            commitCount: number;
            occurredAt: string;
          }>;
        };
      }) => {
        const repoName = repoData.repository.nameWithOwner;
        const repoUrl = repoData.repository.url;
        repoData.contributions.nodes.forEach(
          (commit: { commitCount: number; occurredAt: string }) => {
            details.push({
              type: "commit",
              repo: repoName,
              commitCount: commit.commitCount,
              url: repoUrl,
              occurredAt: commit.occurredAt,
            });
          },
        );
      },
    );
  }

  // Process pull requests
  if (data.pullRequestContributionsByRepository) {
    data.pullRequestContributionsByRepository.forEach(
      (repoData: {
        repository: { nameWithOwner: string };
        contributions: {
          nodes: Array<{
            pullRequest: { title: string; url: string; createdAt: string };
          }>;
        };
      }) => {
        const repoName = repoData.repository.nameWithOwner;
        repoData.contributions.nodes.forEach(
          (pr: {
            pullRequest: { title: string; url: string; createdAt: string };
          }) => {
            details.push({
              type: "pullRequest",
              repo: repoName,
              title: pr.pullRequest.title,
              url: pr.pullRequest.url,
              occurredAt: pr.pullRequest.createdAt,
            });
          },
        );
      },
    );
  }

  // Process issues
  if (data.issueContributionsByRepository) {
    data.issueContributionsByRepository.forEach(
      (repoData: {
        repository: { nameWithOwner: string };
        contributions: {
          nodes: Array<{
            issue: { title: string; url: string; createdAt: string };
          }>;
        };
      }) => {
        const repoName = repoData.repository.nameWithOwner;
        repoData.contributions.nodes.forEach(
          (issue: {
            issue: { title: string; url: string; createdAt: string };
          }) => {
            details.push({
              type: "issue",
              repo: repoName,
              title: issue.issue.title,
              url: issue.issue.url,
              occurredAt: issue.issue.createdAt,
            });
          },
        );
      },
    );
  }

  // Process reviews
  if (data.pullRequestReviewContributionsByRepository) {
    data.pullRequestReviewContributionsByRepository.forEach(
      (repoData: {
        repository: { nameWithOwner: string };
        contributions: {
          nodes: Array<{
            pullRequest: { title: string; url: string };
            occurredAt: string;
          }>;
        };
      }) => {
        const repoName = repoData.repository.nameWithOwner;
        repoData.contributions.nodes.forEach(
          (review: {
            pullRequest: { title: string; url: string };
            occurredAt: string;
          }) => {
            details.push({
              type: "review",
              repo: repoName,
              title: review.pullRequest.title,
              url: review.pullRequest.url,
              occurredAt: review.occurredAt,
            });
          },
        );
      },
    );
  }

  // Sort by time
  details.sort(
    (a, b) =>
      new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
  );

  return details;
}

// Loading skeleton component
function LoadingState({ count }: { count: number }) {
  return (
    <div className="space-y-4 mt-4">
      {Array.from({ length: count > 5 ? 5 : count }).map((_, idx) => (
        <div key={idx} className="border border-border/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="w-4 h-4 rounded-full mt-1" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="w-8 h-8 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component
function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="py-12 text-center">
      <p className="text-red-500">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 text-sm text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  );
}

// Empty state component
function EmptyState({ count }: { count: number }) {
  return (
    <div className="py-12 text-center">
      <p className="text-muted-foreground">
        {count > 0
          ? "Contributions to private repositories are hidden."
          : "No detailed contribution data found for this date"}
      </p>
    </div>
  );
}

// Details list component
function DetailsList({ details }: { details: ContributionDetail[] }) {
  return (
    <div className="space-y-4 mt-4">
      {details.map((detail, idx) => {
        const CardContent = (
          <>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-muted-foreground">
                {getEventIcon(detail.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={getEventColor(detail.type)}
                  >
                    {getEventTypeLabel(detail.type)}
                  </Badge>
                  {detail.type !== "commit" && (
                    <span className="text-xs text-muted-foreground">
                      {formatTime(detail.occurredAt)}
                    </span>
                  )}
                  {detail.commitCount && (
                    <span className="text-xs text-muted-foreground">
                      {detail.type === "commit" ? "" : "• "}
                      {detail.commitCount}{" "}
                      {detail.commitCount === 1 ? "commit" : "commits"}
                    </span>
                  )}
                </div>
                <div className="font-medium text-sm mb-1">
                  {detail.repo}
                </div>
                {detail.title && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {detail.title}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                {detail.type !== "commit" && detail.type !== "pullRequest" && (
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-md hover:bg-accent transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </>
        );

        if (detail.type === "pullRequest") {
          return (
            <a
              key={idx}
              href={detail.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border/50 rounded-lg p-4 transition-colors hover:bg-accent/50 cursor-pointer"
            >
              {CardContent}
            </a>
          );
        }

        return (
          <div
            key={idx}
            className="border border-border/50 rounded-lg p-4 transition-colors"
          >
            {CardContent}
          </div>
        );
      })}
    </div>
  );
}

export function ContributionDetailDialog({
  username,
  date,
  count,
  isOpen,
  onClose,
  githubToken,
}: ContributionDetailDialogProps) {
  const [details, setDetails] = useState<ContributionDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // Calculate actual contribution count from details
  const actualCount = details.reduce((total, detail) => {
    if (detail.type === "commit" && detail.commitCount) {
      return total + detail.commitCount;
    }
    return total + 1;
  }, 0);

  const loadContributionDetails = useCallback(async () => {
    if (loadingRef.current) return;
    
    const cacheKey = `${username}-${date}`;
    const cached = detailsCache.get(cacheKey);
    
    if (cached) {
      setDetails(cached);
      setLoading(false);
      setError(null);
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);
    setDetails([]);
    
    try {
      const data = await fetchContributionDetails(username, date, githubToken);
      detailsCache.set(cacheKey, data);
      setDetails(data);
    } catch (err) {
      console.error("Error fetching contribution details:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load contribution details";
      setError(errorMessage);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [username, date, githubToken]);

  useEffect(() => {
    if (isOpen && count > 0) {
      loadContributionDetails();
    }
  }, [isOpen, count, loadContributionDetails]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content className="bg-background fixed top-[50%] left-[50%] z-50 grid w-full sm:max-w-4xl max-w-[calc(100%-6rem)] max-h-[85vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Contributions on {formatDate(date)}
          </DialogTitle>
          <DialogDescription>
            {actualCount > 0 ? actualCount : count}{" "}
            {(actualCount > 0 ? actualCount : count) === 1
              ? "contribution"
              : "contributions"}{" "}
            on this day
            {actualCount > 0 && actualCount !== count && (
              <span className="text-xs text-muted-foreground ml-2">
                (GitHub calendar shows {count})
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <LoadingState count={count} />
        ) : error ? (
          <ErrorState error={error} onRetry={loadContributionDetails} />
        ) : details.length > 0 ? (
          <DetailsList details={details} />
        ) : (
          <EmptyState count={count} />
        )}
        
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-full border border-black/20 dark:border-white p-1.5 opacity-70 hover:opacity-100 hover:bg-accent transition-all cursor-pointer">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}


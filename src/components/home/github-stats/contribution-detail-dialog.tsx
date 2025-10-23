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
import { fetchContributionDetails, ContributionDetail } from "./queries";

interface ContributionDetailDialogProps {
  username: string;
  date: string;
  count: number;
  isOpen: boolean;
  onClose: () => void;
}

// Cache for contribution details - exported so it can be prefetched
export const detailsCache = new Map<string, ContributionDetail[]>();

// Helper functions moved outside component for performance
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
}: ContributionDetailDialogProps) {
  const [details, setDetails] = useState<ContributionDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const loadContributionDetails = useCallback(async () => {
    // Prevent duplicate calls
    if (loadingRef.current) return;
    
    const cacheKey = `${username}-${date}`;
    
    // Check cache first - if cached, set immediately without loading state
    const cached = detailsCache.get(cacheKey);
    if (cached) {
      setDetails(cached);
      setLoading(false);
      setError(null);
      return;
    }

    // Not cached - set loading immediately for instant feedback
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    setDetails([]); // Clear old details
    
    try {
      const data = await fetchContributionDetails(username, date);
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
  }, [username, date]);

  useEffect(() => {
    if (!isOpen) return;
    
    if (date && count > 0) {
      const cacheKey = `${username}-${date}`;
      const cached = detailsCache.get(cacheKey);
      
      if (cached) {
        // Cached - show immediately
        setDetails(cached);
        setLoading(false);
        setError(null);
      } else {
        // Not cached - show loading state immediately
        setLoading(true);
        setDetails([]);
        setError(null);
        // Start fetch asynchronously
        loadContributionDetails();
      }
    } else {
      // No contributions
      setDetails([]);
      setLoading(false);
      setError(null);
    }
  }, [isOpen, date, count, loadContributionDetails, username]);

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
            {count} {count === 1 ? "contribution" : "contributions"} on this day
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

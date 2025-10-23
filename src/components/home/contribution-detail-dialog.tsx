"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GitCommit,
  GitPullRequest,
  FileText,
  Eye,
  ExternalLink,
} from "lucide-react";
import { fetchContributionDetails, ContributionDetail } from "./queries";

interface ContributionDetailDialogProps {
  username: string;
  date: string;
  count: number;
  isOpen: boolean;
  onClose: () => void;
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

  useEffect(() => {
    if (isOpen && count > 0 && date) {
      loadContributionDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, date]);

  const loadContributionDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchContributionDetails(username, date);
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
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-w-[calc(100%-6rem)] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Contributions on {formatDate(date)}
          </DialogTitle>
          <DialogDescription>
            {count} {count === 1 ? "contribution" : "contributions"} on this day
          </DialogDescription>
        </DialogHeader>

        {loading ? (
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
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={loadContributionDetails}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        ) : details.length > 0 ? (
          <div className="space-y-4 mt-4">
            {details.map((detail, idx) => (
              <div
                key={idx}
                className="border border-border/50 rounded-lg p-4 transition-colors"
              >
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
                      <span className="text-xs text-muted-foreground">
                        {formatTime(detail.occurredAt)}
                      </span>
                      {detail.commitCount && (
                        <span className="text-xs text-muted-foreground">
                          • {detail.commitCount}{" "}
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
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-md hover:bg-accent transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              {count > 0
                ? "Contributions to private repositories are hidden."
                : "No detailed contribution data found for this date"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

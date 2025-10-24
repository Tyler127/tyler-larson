"use client";

import { useState, useEffect } from "react";
import { ContributionDetailDialog, detailsCache } from "./contribution-detail-dialog";
import { ContributionDetail } from "../types";

// Track in-progress fetches to prevent duplicates
const fetchInProgress = new Map<string, Promise<unknown>>();

// Prefetch function that can be called from anywhere
export async function prefetchContributionData(
  username: string,
  date: string,
  count: number,
  githubToken?: string
) {
  if (count === 0) return;
  
  const cacheKey = `${username}-${date}`;
  
  if (detailsCache.has(cacheKey) || fetchInProgress.has(cacheKey)) {
    return;
  }
  
  const fetchPromise = fetch(
    `/api/github-contribution-details?username=${encodeURIComponent(
      username
    )}&date=${encodeURIComponent(date)}${
      githubToken ? `&token=${encodeURIComponent(githubToken)}` : ""
    }`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || "Invalid data");
      }
      
      // Process the data structure to extract details
      const details: ContributionDetail[] = [];
      const data = result.data as {
        commitContributionsByRepository?: Array<{ repository: { nameWithOwner: string; url: string }; contributions: { nodes: Array<{ commitCount: number; occurredAt: string }> } }>;
        pullRequestContributionsByRepository?: Array<{ repository: { nameWithOwner: string }; contributions: { nodes: Array<{ pullRequest: { title: string; url: string; createdAt: string } }> } }>;
        issueContributionsByRepository?: Array<{ repository: { nameWithOwner: string }; contributions: { nodes: Array<{ issue: { title: string; url: string; createdAt: string } }> } }>;
        pullRequestReviewContributionsByRepository?: Array<{ repository: { nameWithOwner: string }; contributions: { nodes: Array<{ pullRequest: { title: string; url: string }; occurredAt: string }> } }>;
      };
      
      // Process commits
      if (data.commitContributionsByRepository) {
        data.commitContributionsByRepository.forEach((repoData) => {
          const repoName = repoData.repository.nameWithOwner;
          const repoUrl = repoData.repository.url;
          repoData.contributions.nodes.forEach((commit) => {
            details.push({
              type: "commit",
              repo: repoName,
              commitCount: commit.commitCount,
              url: repoUrl,
              occurredAt: commit.occurredAt,
            });
          });
        });
      }
      
      // Process pull requests
      if (data.pullRequestContributionsByRepository) {
        data.pullRequestContributionsByRepository.forEach((repoData) => {
          const repoName = repoData.repository.nameWithOwner;
          repoData.contributions.nodes.forEach((pr) => {
            details.push({
              type: "pullRequest",
              repo: repoName,
              title: pr.pullRequest.title,
              url: pr.pullRequest.url,
              occurredAt: pr.pullRequest.createdAt,
            });
          });
        });
      }
      
      // Process issues
      if (data.issueContributionsByRepository) {
        data.issueContributionsByRepository.forEach((repoData) => {
          const repoName = repoData.repository.nameWithOwner;
          repoData.contributions.nodes.forEach((issue) => {
            details.push({
              type: "issue",
              repo: repoName,
              title: issue.issue.title,
              url: issue.issue.url,
              occurredAt: issue.issue.createdAt,
            });
          });
        });
      }
      
      // Process reviews
      if (data.pullRequestReviewContributionsByRepository) {
        data.pullRequestReviewContributionsByRepository.forEach((repoData) => {
          const repoName = repoData.repository.nameWithOwner;
          repoData.contributions.nodes.forEach((review) => {
            details.push({
              type: "review",
              repo: repoName,
              title: review.pullRequest.title,
              url: review.pullRequest.url,
              occurredAt: review.occurredAt,
            });
          });
        });
      }
      
      // Sort by time
      details.sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
      
      return details;
    })
    .then((data: ContributionDetail[]) => {
      detailsCache.set(cacheKey, data);
      fetchInProgress.delete(cacheKey);
      return data;
    })
    .catch(() => {
      fetchInProgress.delete(cacheKey);
    });
  
  fetchInProgress.set(cacheKey, fetchPromise);
}

// Global event system for dialog
type DialogEventListener = (date: string, count: number) => void;
const dialogListeners = new Set<DialogEventListener>();

export function subscribeToDialogOpen(listener: DialogEventListener) {
  dialogListeners.add(listener);
  return () => {
    dialogListeners.delete(listener);
  };
}

export function openContributionDialog(date: string, count: number) {
  dialogListeners.forEach(listener => listener(date, count));
}

interface ContributionDialogManagerProps {
  username: string;
  githubToken?: string;
}

export function ContributionDialogManager({ username, githubToken }: ContributionDialogManagerProps) {
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    count: number;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToDialogOpen((date, count) => {
      setSelectedDay({ date, count });
      setIsDialogOpen(true);
    });
    return unsubscribe;
  }, []);

  return (
    <ContributionDetailDialog
      username={username}
      date={selectedDay?.date || ""}
      count={selectedDay?.count || 0}
      isOpen={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        setSelectedDay(null);
      }}
      githubToken={githubToken}
    />
  );
}


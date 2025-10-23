import { useState, useCallback, useEffect } from "react";
import { ContributionWeek } from "./contribution-graph";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
}

interface LanguageStats {
  [key: string]: number;
}

// Cache storage - permanent for the session since GitHub historical data doesn't change
const statsCache = new Map<string, { stats: GitHubStats; languages: LanguageStats }>();
const contributionsCache = new Map<string, ContributionWeek[]>();

// Fetch functions
async function fetchGitHubStats(username: string) {
  // Check cache first
  const cacheKey = username;
  const cached = statsCache.get(cacheKey);
  
  if (cached) {
    console.log("Using cached GitHub stats for", username);
    return cached;
  }
  // Fetch user data
  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  const userData = await userResponse.json();

  // Fetch repos to calculate stars, forks, and languages
  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
  );
  const reposData = await reposResponse.json();

  let totalStars = 0;
  let totalForks = 0;
  const langStats: LanguageStats = {};

  // Calculate stats from repos
  for (const repo of reposData) {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;

    // Fetch language stats for each repo
    if (repo.language) {
      langStats[repo.language] = (langStats[repo.language] || 0) + 1;
    }
  }

  const stats: GitHubStats = {
    publicRepos: userData.public_repos,
    followers: userData.followers,
    totalStars,
    totalForks,
  };

  // Sort languages by usage
  const languages = Object.entries(langStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6) // Top 6 languages
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  const result = { stats, languages };
  
  // Cache the result permanently
  statsCache.set(cacheKey, result);

  return result;
}

async function fetchGitHubContributions(username: string) {
  // Check cache first
  const cacheKey = username;
  const cached = contributionsCache.get(cacheKey);
  
  if (cached) {
    console.log("Using cached contributions for", username);
    return cached;
  }
  
  const response = await fetch(
    `/api/github-contributions?username=${username}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch contributions");
  }

  const result = await response.json();

  if (!result.success || !result.data?.weeks) {
    throw new Error("Invalid contribution data");
  }

  const getContributionLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 9) return 3;
    return 4;
  };

  const contributions: ContributionWeek[] = result.data.weeks.map(
    (week: {
      contributionDays: Array<{
        date: string;
        contributionCount: number;
      }>;
    }) => ({
      days: week.contributionDays.map(
        (day: { date: string; contributionCount: number }) => ({
          date: day.date,
          count: day.contributionCount,
          level: getContributionLevel(day.contributionCount),
        }),
      ),
    }),
  );

  // Cache the result permanently
  contributionsCache.set(cacheKey, contributions);

  return contributions;
}

export interface ContributionDetail {
  type: "commit" | "pullRequest" | "issue" | "review";
  repo: string;
  title?: string;
  url?: string;
  commitCount?: number;
  occurredAt: string;
}

async function fetchContributionDetails(username: string, date: string) {
  console.log("Fetching contribution details for:", { username, date });

  const response = await fetch(
    `/api/github-contribution-details?username=${username}&date=${date}`,
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

// Export the fetch function for use in components
export { fetchContributionDetails };

// Custom hooks using useMemo and manual state management
export function useGitHubStats(username: string) {
  const [state, setState] = useState<{
    stats: GitHubStats | null;
    languages: LanguageStats;
    loading: boolean;
    error: Error | null;
  }>({
    stats: null,
    languages: {},
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { stats, languages } = await fetchGitHubStats(username);
      setState({ stats, languages, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username]);

  // Auto-fetch on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

export function useGitHubContributions(username: string) {
  const [state, setState] = useState<{
    contributions: ContributionWeek[];
    loading: boolean;
    error: Error | null;
  }>({
    contributions: [],
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const contributions = await fetchGitHubContributions(username);
      setState({ contributions, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching contributions:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username]);

  // Auto-fetch on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

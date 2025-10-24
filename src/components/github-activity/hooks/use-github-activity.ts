"use client";

import { useState, useCallback, useEffect } from "react";
import {
  GitHubStats,
  LanguageStats,
  ContributionWeek,
  UseGitHubStatsOptions,
  UseGitHubContributionsOptions,
} from "../types";
import { fetchGitHubUser, fetchGitHubRepos } from "../utils/github-api";
import {
  fetchGitHubContributionsGraphQL,
  fetchGitHubContributionsViaAPI,
} from "../utils/github-api";

interface UseGitHubActivityOptions {
  token?: string;
  cache?: boolean;
  useApiRoute?: boolean;
  apiEndpoint?: string;
}

interface UseGitHubActivityReturn {
  stats: GitHubStats | null;
  languages: LanguageStats;
  contributions: ContributionWeek[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Combined hook that fetches all GitHub activity data at once
 * @param username - GitHub username
 * @param options - Configuration options including token and API settings
 */
export function useGitHubActivity(
  username: string,
  options: UseGitHubActivityOptions = {}
): UseGitHubActivityReturn {
  const {
    token,
    cache = true,
    useApiRoute = false,
    apiEndpoint = "/api/github-contributions",
  } = options;

  const [state, setState] = useState<{
    stats: GitHubStats | null;
    languages: LanguageStats;
    contributions: ContributionWeek[];
    loading: boolean;
    error: Error | null;
  }>({
    stats: null,
    languages: {},
    contributions: [],
    loading: true,
    error: null,
  });

  const fetchAllData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch user data and repos
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(username, token),
        fetchGitHubRepos(username, token),
      ]);

      // Calculate stats
      let totalStars = 0;
      let totalForks = 0;
      const langStats: LanguageStats = {};

      for (const repo of reposData) {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
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

      // Sort languages by usage and take top 6
      const languages = Object.entries(langStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      // Fetch contributions
      let contributions: ContributionWeek[];
      try {
        if (useApiRoute) {
          contributions = await fetchGitHubContributionsViaAPI(
            username,
            apiEndpoint
          );
        } else if (token) {
          contributions = await fetchGitHubContributionsGraphQL(username, token);
        } else {
          // If no token and no API route, just set empty contributions
          console.warn(
            "No token or API route provided for contributions. Contributions will be empty."
          );
          contributions = [];
        }
      } catch (contribError) {
        console.error("Error fetching contributions:", contribError);
        contributions = [];
      }

      setState({
        stats,
        languages,
        contributions,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching GitHub activity:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username, token, useApiRoute, apiEndpoint]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { ...state, refetch: fetchAllData };
}


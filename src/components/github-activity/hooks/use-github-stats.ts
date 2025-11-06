"use client";

import { useState, useCallback, useEffect } from "react";
import { GitHubStats, UseGitHubStatsOptions } from "@/components/github-activity/types";
import { fetchGitHubUser, fetchGitHubRepos } from "@/components/github-activity/utils/github-api";

interface UseGitHubStatsReturn {
  stats: GitHubStats | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGitHubStats(
  username: string,
  options: UseGitHubStatsOptions = {}
): UseGitHubStatsReturn {
  const { token, cache = true } = options;

  const [state, setState] = useState<{
    stats: GitHubStats | null;
    loading: boolean;
    error: Error | null;
  }>({
    stats: null,
    loading: true,
    error: null,
  });

  const fetchStats = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch user data and repos in parallel
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(username, token),
        fetchGitHubRepos(username, token),
      ]);

      // Calculate total stars and forks
      let totalStars = 0;
      let totalForks = 0;

      for (const repo of reposData) {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
      }

      const stats: GitHubStats = {
        publicRepos: userData.public_repos,
        followers: userData.followers,
        totalStars,
        totalForks,
      };

      setState({ stats, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching GitHub stats:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username, token]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { ...state, refetch: fetchStats };
}


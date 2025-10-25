"use client";

import { useState, useCallback, useEffect } from "react";
import { LanguageStats, UseGitHubStatsOptions } from "@/components/github-activity/types";
import { fetchGitHubRepos } from "@/components/github-activity/utils/github-api";

interface UseGitHubLanguagesReturn {
  languages: LanguageStats;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGitHubLanguages(
  username: string,
  options: UseGitHubStatsOptions = {}
): UseGitHubLanguagesReturn {
  const { token, cache = true } = options;

  const [state, setState] = useState<{
    languages: LanguageStats;
    loading: boolean;
    error: Error | null;
  }>({
    languages: {},
    loading: true,
    error: null,
  });

  const fetchLanguages = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const reposData = await fetchGitHubRepos(username, token);

      // Calculate language statistics
      const langStats: LanguageStats = {};
      for (const repo of reposData) {
        if (repo.language) {
          langStats[repo.language] = (langStats[repo.language] || 0) + 1;
        }
      }

      // Sort by usage and take top 6
      const languages = Object.entries(langStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      setState({ languages, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching GitHub languages:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username, token]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  return { ...state, refetch: fetchLanguages };
}


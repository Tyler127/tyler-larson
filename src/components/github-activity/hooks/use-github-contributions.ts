"use client";

import { useState, useCallback, useEffect } from "react";
import { ContributionWeek, UseGitHubContributionsOptions } from "@/components/github-activity/types";
import {
  fetchGitHubContributionsGraphQL,
  fetchGitHubContributionsViaAPI,
} from "@/components/github-activity/utils/github-api";

interface UseGitHubContributionsReturn {
  contributions: ContributionWeek[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGitHubContributions(
  username: string,
  options: UseGitHubContributionsOptions = {}
): UseGitHubContributionsReturn {
  const {
    token,
    cache = true,
    useApiRoute = false,
    apiEndpoint = "/api/github-contributions",
  } = options;

  const [state, setState] = useState<{
    contributions: ContributionWeek[];
    loading: boolean;
    error: Error | null;
  }>({
    contributions: [],
    loading: true,
    error: null,
  });

  const fetchContributions = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      let contributions: ContributionWeek[];

      // Choose fetching method
      if (useApiRoute) {
        // Use Next.js API route
        contributions = await fetchGitHubContributionsViaAPI(
          username,
          apiEndpoint
        );
      } else if (token) {
        // Use direct GraphQL with token
        contributions = await fetchGitHubContributionsGraphQL(username, token);
      } else {
        // No token and no API route - show error
        throw new Error(
          "Either provide a GitHub token or set useApiRoute to true"
        );
      }

      setState({ contributions, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching GitHub contributions:", err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err as Error,
      }));
    }
  }, [username, token, useApiRoute, apiEndpoint]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return { ...state, refetch: fetchContributions };
}


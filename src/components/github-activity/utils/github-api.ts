import { ContributionWeek } from "@/components/github-activity/types";
import { getContributionLevel } from "@/components/github-activity/utils/calculations";

// Cache storage
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper to get from cache
function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

// Helper to set cache
function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// GitHub REST API - Fetch user data
export async function fetchGitHubUser(
  username: string,
  token?: string
): Promise<{
  public_repos: number;
  followers: number;
  [key: string]: any;
}> {
  const cacheKey = `user:${username}`;
  const cached = getFromCache<any>(cacheKey);
  if (cached) return cached;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch user data: ${response.status}`
    );
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

// GitHub REST API - Fetch user repos
export async function fetchGitHubRepos(
  username: string,
  token?: string
): Promise<
  Array<{
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    [key: string]: any;
  }>
> {
  const cacheKey = `repos:${username}`;
  const cached = getFromCache<any[]>(cacheKey);
  if (cached) return cached;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Fetch up to 100 repos (could be extended with pagination)
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch repos: ${response.status}`
    );
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

// GitHub GraphQL - Fetch contributions
export async function fetchGitHubContributionsGraphQL(
  username: string,
  token: string
): Promise<ContributionWeek[]> {
  const cacheKey = `contributions:${username}`;
  const cached = getFromCache<ContributionWeek[]>(cacheKey);
  if (cached) return cached;

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors.map((e: any) => e.message).join(", ") ||
        "GraphQL query failed"
    );
  }

  const weeks =
    result.data?.user?.contributionsCollection?.contributionCalendar?.weeks ||
    [];

  const contributions: ContributionWeek[] = weeks.map(
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
        })
      ),
    })
  );

  setCache(cacheKey, contributions);
  return contributions;
}

// Fetch contributions via API route (for Next.js projects)
export async function fetchGitHubContributionsViaAPI(
  username: string,
  apiEndpoint: string = "/api/github-contributions"
): Promise<ContributionWeek[]> {
  const cacheKey = `contributions-api:${username}`;
  const cached = getFromCache<ContributionWeek[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${apiEndpoint}?username=${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch contributions from API");
  }

  const result = await response.json();

  if (!result.success || !result.data?.weeks) {
    throw new Error("Invalid contribution data from API");
  }

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
        })
      ),
    })
  );

  setCache(cacheKey, contributions);
  return contributions;
}

// Fetch contribution details for a specific date
export async function fetchContributionDetails(
  username: string,
  date: string,
  token?: string,
  apiEndpoint: string = "/api/github-contribution-details"
): Promise<any> {
  // If token is provided, could make direct GraphQL call
  // For now, use API endpoint
  const response = await fetch(
    `${apiEndpoint}?username=${username}&date=${date}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || "Failed to fetch contribution details"
    );
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(
      result.error || "Invalid contribution details data"
    );
  }

  return result.data;
}

// Helper to check rate limit
export async function checkGitHubRateLimit(
  token?: string
): Promise<{
  limit: number;
  remaining: number;
  reset: number;
}> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("https://api.github.com/rate_limit", {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to check rate limit");
  }

  const data = await response.json();
  return {
    limit: data.resources.core.limit,
    remaining: data.resources.core.remaining,
    reset: data.resources.core.reset,
  };
}


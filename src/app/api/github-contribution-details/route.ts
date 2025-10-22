import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const date = searchParams.get("date");

  if (!username || !date) {
    return NextResponse.json(
      { success: false, error: "Username and date are required" },
      { status: 400 },
    );
  }

  const githubToken = process.env.GITHUB_TOKEN;

  // Parse the date and get the date range
  const targetDate = new Date(date + "T00:00:00Z");
  const fromDate = targetDate.toISOString();

  const nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const toDate = nextDate.toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          commitContributionsByRepository {
            repository {
              name
              nameWithOwner
              url
            }
            contributions(first: 100) {
              nodes {
                commitCount
                occurredAt
              }
            }
          }
          pullRequestContributionsByRepository {
            repository {
              name
              nameWithOwner
              url
            }
            contributions(first: 100) {
              nodes {
                pullRequest {
                  title
                  url
                  createdAt
                }
              }
            }
          }
          issueContributionsByRepository {
            repository {
              name
              nameWithOwner
              url
            }
            contributions(first: 100) {
              nodes {
                issue {
                  title
                  url
                  createdAt
                }
              }
            }
          }
          pullRequestReviewContributionsByRepository {
            repository {
              name
              nameWithOwner
              url
            }
            contributions(first: 100) {
              nodes {
                pullRequest {
                  title
                  url
                }
                occurredAt
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(githubToken && { Authorization: `bearer ${githubToken}` }),
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromDate,
          to: toDate,
        },
      }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    console.log("GitHub API Response:", {
      ok: response.ok,
      status: response.status,
      hasData: !!data.data,
      hasUser: !!data.data?.user,
      hasContributions: !!data.data?.user?.contributionsCollection,
      errors: data.errors,
    });

    if (response.ok && data.data?.user?.contributionsCollection) {
      return NextResponse.json({
        success: true,
        data: data.data.user.contributionsCollection,
      });
    } else {
      console.error("GitHub API error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        {
          success: false,
          error:
            data.errors ||
            data.message ||
            "Failed to fetch contribution details",
          details: data,
        },
        { status: response.status || 500 },
      );
    }
  } catch (error) {
    console.error("Server error fetching GitHub contribution details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

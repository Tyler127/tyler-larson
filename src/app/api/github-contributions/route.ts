import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Tyler127";

  // Check if GitHub token is available
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!githubToken) {
    console.error("GITHUB_TOKEN environment variable is not set");
    return NextResponse.json(
      { 
        error: "GitHub token not configured", 
        message: "GITHUB_TOKEN environment variable is required for this API. Please add it to your environment variables." 
      },
      { status: 500 }
    );
  }

  try {
    // GitHub GraphQL query for contribution data
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

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `bearer ${githubToken}`,
    };

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch contributions", details: data.errors },
        { status: 500 },
      );
    }

    if (
      !data.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    ) {
      return NextResponse.json(
        { error: "No contribution data found" },
        { status: 404 },
      );
    }

    // Return the contribution data
    return NextResponse.json({
      success: true,
      data: data.data.user.contributionsCollection.contributionCalendar,
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 },
    );
  }
}

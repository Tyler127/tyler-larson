import { ContributionWeek } from "../types";

// Calculate contribution level based on count
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}

// Calculate total contributions
export function calculateTotalContributions(
  contributions: ContributionWeek[]
): number {
  return contributions.reduce(
    (total, week) =>
      total + week.days.reduce((sum, day) => sum + day.count, 0),
    0
  );
}

// Calculate current streak
export function calculateCurrentStreak(
  contributions: ContributionWeek[]
): number {
  const allDays = contributions.flatMap((week) => week.days);
  
  // Sort by date descending to find current streak
  const sortedDays = [...allDays].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let currentStreak = 0;
  for (const day of sortedDays) {
    if (day.count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}

// Calculate longest streak
export function calculateLongestStreak(
  contributions: ContributionWeek[]
): number {
  const allDays = contributions.flatMap((week) => week.days);
  let longestStreak = 0;
  let tempStreak = 0;

  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return longestStreak;
}

// Calculate day of week statistics
export function calculateDayOfWeekStats(contributions: ContributionWeek[]): {
  dayStats: { [key: string]: number };
  maxCount: number;
} {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayStats: { [key: string]: number } = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  contributions.forEach((week) => {
    week.days.forEach((day) => {
      const date = new Date(day.date + "T00:00:00Z");
      const dayName = dayNames[date.getUTCDay()];
      dayStats[dayName] += day.count;
    });
  });

  const maxCount = Math.max(...Object.values(dayStats));
  return { dayStats, maxCount };
}

// Calculate average contributions per day
export function calculateAverageContributions(
  contributions: ContributionWeek[]
): number {
  const allDays = contributions.flatMap((week) => week.days);
  const totalContributions = allDays.reduce((sum, day) => sum + day.count, 0);
  return allDays.length > 0 ? totalContributions / allDays.length : 0;
}

// Calculate monthly statistics
export function calculateMonthlyStats(contributions: ContributionWeek[]): {
  monthlyStats: [string, number][];
  busiestMonth: [string, number];
} {
  const monthlyStats: { [month: string]: number } = {};

  contributions.forEach((week) => {
    week.days.forEach((day) => {
      const date = new Date(day.date + "T00:00:00Z");
      const monthYear = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
      monthlyStats[monthYear] = (monthlyStats[monthYear] || 0) + day.count;
    });
  });

  // Get last 12 months sorted
  const sortedMonths = Object.entries(monthlyStats)
    .sort(([a], [b]) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 12);

  // Find busiest month
  const busiestMonth =
    sortedMonths.length > 0
      ? sortedMonths.reduce((max, curr) => (curr[1] > max[1] ? curr : max))
      : ["N/A", 0];

  return { monthlyStats: sortedMonths, busiestMonth };
}

// Get most active day of week
export function getMostActiveDay(contributions: ContributionWeek[]): string {
  const { dayStats } = calculateDayOfWeekStats(contributions);
  return Object.entries(dayStats).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];
}


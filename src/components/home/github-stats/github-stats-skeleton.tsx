import { Github, GitFork, Star, Code2 } from "lucide-react";

export function GitHubStatsSkeleton() {
  return (
    <div>
      <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
        <div className="flex items-center gap-3 mb-8">
          <Github className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">GitHub Activity</h3>
          <div className="ml-auto text-sm text-muted-foreground">View Profile →</div>
        </div>

      {/* Stats Grid - with skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-muted-foreground">Repositories</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Star className="w-5 h-5 mx-auto mb-2 text-yellow-500" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-muted-foreground">Stars</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <GitFork className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-muted-foreground">Forks</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
          <Github className="w-5 h-5 mx-auto mb-2 text-primary" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
      </div>

        {/* Contribution Graph - skeleton */}
        <div className="bg-background/50 border border-border/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Contribution Graph
          </h4>
            <div className="w-full">
              {/* Month labels with proper positioning */}
              <div className="relative mb-3 h-4 overflow-hidden">
                <div className="flex" style={{ width: '100%' }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                    const position = (idx / 12) * 100;
                    return (
                      <div
                        key={idx}
                        className="absolute text-xs text-muted-foreground font-medium"
                        style={{ left: `${position}%` }}
                      >
                        {month}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Day labels + Contribution cells */}
              <div className="flex gap-2">
                {/* Day labels */}
                <div className="flex flex-col justify-between py-1 text-xs text-muted-foreground">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                {/* Grid */}
                <div className="flex-1 overflow-x-auto">
                  <div
                    className="grid gap-[2px] p-0.5"
                    style={{
                      gridTemplateColumns: 'repeat(53, 1fr)',
                      gridAutoFlow: 'column',
                      minWidth: 'fit-content',
                    }}
                  >
                    {[...Array(53)].map((_, weekIdx) => (
                      <div key={weekIdx} className="grid grid-rows-7 gap-[2px]">
                        {[...Array(7)].map((_, dayIdx) => (
                          <div
                            key={`${weekIdx}-${dayIdx}`}
                            className="aspect-square rounded-sm bg-muted/30 min-w-[10px] min-h-[10px]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <span>Less</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-muted/30" />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
        </div>

        {/* Most Used Languages - skeleton */}
        <div className="mt-8 bg-background/50 border border-border/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Most Used Languages
          </h4>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-7 rounded-md bg-muted animate-pulse"
                style={{ width: `${80 + (i * 7) % 40}px` }}
              />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted/50 rounded-full" style={{ width: `${(6 - i) * 16.6}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Stats skeleton */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">
            Contribution Stats
          </h4>
          <div className="space-y-4">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="h-4 w-12 mx-auto mb-1 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-8 mx-auto bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="h-4 w-16 mx-auto mb-1 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-10 mx-auto bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
            {/* Activity by Day */}
            <div className="bg-background/50 border border-border/30 rounded-lg p-4">
              <div className="h-4 w-24 mb-3 bg-muted animate-pulse rounded" />
              <div className="space-y-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-8 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-8 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="h-1.5 bg-muted rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


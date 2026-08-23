"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total?: {
    lastYear?: number;
    [year: string]: number | undefined;
  };
  contributions: ContributionDay[];
}

const CACHE_KEY = "gh_contributions_cache_v1";
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

// Monochrome intensity palette matching the site's warm-minimal aesthetic
const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-[#E6E3DB] border-[#DDD9D0]",
  1: "bg-[#C4BFB4] border-[#B5B0A4]",
  2: "bg-[#8E887D] border-[#7F796E]",
  3: "bg-[#524D44] border-[#443F36]",
  4: "bg-[#181716] border-[#0A0A09]",
};

export function GitHubContributionGraph() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const fetchContributions = async () => {
    // 1. Check localStorage cache
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION_MS && parsed.data) {
          setData(parsed.data.contributions);
          setTotalCount(
            parsed.data.total?.lastYear ??
              parsed.data.contributions.reduce(
                (acc: number, cur: ContributionDay) => acc + cur.count,
                0
              )
          );
          setLoading(false);
          return;
        }
      }
    } catch {
      // localStorage error fallback
    }

    // 2. Fetch fresh data
    try {
      let res = await fetch(
        "https://github-contributions-api.jogruber.de/v4/harshkumar1306?y=last"
      );
      if (!res.ok) {
        res = await fetch(
          "https://github-contributions-api.jogruber.de/v4/harshkumar1306"
        );
      }

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const json: ApiResponse = await res.json();
      if (Array.isArray(json.contributions) && json.contributions.length > 0) {
        // Take the last 365 or 371 days
        const lastDays =
          json.contributions.length > 365
            ? json.contributions.slice(-365)
            : json.contributions;

        const total =
          json.total?.lastYear ??
          lastDays.reduce((acc, cur) => acc + cur.count, 0);

        setData(lastDays);
        setTotalCount(total);
        setHasError(false);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              data: {
                total: { lastYear: total },
                contributions: lastDays,
              },
            })
          );
        } catch {
          // ignore cache write error
        }
      } else {
        throw new Error("No contribution records found");
      }
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();

    // 6-hour refresh interval
    const interval = setInterval(fetchContributions, CACHE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  // Group days into 52-53 weeks (columns)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data.length) return { weeks: [], monthLabels: [] };

    const groupedWeeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // The first day's day of week (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = new Date(data[0].date).getDay();

    // Pad beginning of first week if not Sunday
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }

    data.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        groupedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      // Pad end of last week
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
      groupedWeeks.push(currentWeek);
    }

    // Determine month labels for columns
    const labels: Array<{ text: string; colIndex: number }> = [];
    let lastMonth = -1;

    groupedWeeks.forEach((week, colIdx) => {
      // Find the first valid date in this week
      const firstValidDay = week.find((d) => d.date);
      if (firstValidDay) {
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
          lastMonth = month;
          const monthName = new Date(firstValidDay.date).toLocaleString(
            "default",
            { month: "short" }
          );
          labels.push({ text: monthName, colIndex: colIdx });
        }
      }
    });

    return { weeks: groupedWeeks, monthLabels: labels };
  }, [data]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative w-full max-w-[480px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] p-4 sm:p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] font-mono flex flex-col justify-between transition-all duration-200">
      {/* Header Row: Terminal Label + Sync Status */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)]">
            // github.contributions
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span
            className={`w-2 h-2 rounded-full ${
              hasError ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
            }`}
          />
          <span>{hasError ? "offline" : "synced"}</span>
        </div>
      </div>

      {/* Prominent Contribution Count Headline */}
      <div className="mb-4">
        {loading ? (
          <div className="h-8 w-44 bg-[var(--border)] rounded animate-pulse" />
        ) : hasError ? (
          <div className="text-xs text-[var(--text-muted)] italic">
            // unable to sync contribution data
          </div>
        ) : (
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              {totalCount !== null ? totalCount.toLocaleString() : "--"}
            </span>
            <span className="font-sans text-xs sm:text-sm text-[var(--text-muted)] font-normal">
              contributions in the last year
            </span>
          </div>
        )}
      </div>

      {/* Heatmap Grid Section */}
      <div className="w-full relative overflow-x-auto pb-1 scrollbar-none">
        {loading ? (
          <div className="h-28 w-full bg-[var(--border)]/30 rounded-lg animate-pulse" />
        ) : hasError ? (
          <div className="h-28 flex items-center justify-center text-xs text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-lg">
            Contribution graph currently unavailable
          </div>
        ) : (
          <div className="min-w-[420px] select-none">
            {/* Month labels row */}
            <div className="relative h-4 mb-1 text-[9px] text-[var(--text-muted)] font-mono">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${(lbl.colIndex / weeks.length) * 100}%`,
                  }}
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Day Cells Grid (Columns of Weeks, 7 days per column) */}
            <div className="flex gap-[3px] items-center">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => {
                    if (!day.date) {
                      return (
                        <div
                          key={dIdx}
                          className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] opacity-0"
                        />
                      );
                    }

                    const isHovered = hoveredDay?.day.date === day.date;
                    const colorClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] rounded-[2px] border ${colorClass} transition-transform duration-150 cursor-pointer ${
                          isHovered ? "scale-150 z-20 ring-1 ring-[var(--accent)]" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && hoveredDay.day.date && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-2.5 px-2.5 py-1 rounded-md bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-mono shadow-md whitespace-nowrap"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y,
          }}
        >
          <span className="font-semibold">
            {hoveredDay.day.count === 0
              ? "No contributions"
              : `${hoveredDay.day.count} contribution${
                  hoveredDay.day.count > 1 ? "s" : ""
                }`}
          </span>{" "}
          <span className="opacity-80">on {formatDate(hoveredDay.day.date)}</span>
        </motion.div>
      )}

      {/* Footer: User profile handle & Theme-matched Intensity Legend */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
        <a
          href="https://github.com/harshkumar1306"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] hover:underline flex items-center gap-1 font-mono"
        >
          <span>@harshkumar1306</span>
          <span>&rarr;</span>
        </a>

        {/* Intensity Legend */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <div className="flex items-center gap-[2.5px]">
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <span
                key={level}
                className={`w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] rounded-[1.5px] border ${LEVEL_COLORS[level]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

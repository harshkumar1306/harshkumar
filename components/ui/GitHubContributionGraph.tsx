"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface RawContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE"
    | string;
  weekday?: number;
}

interface CalendarWeek {
  contributionDays: RawContributionDay[];
}

interface CalendarMonth {
  name: string;
  firstDay: string;
  totalWeeks: number;
}

interface ContributionCalendarResponse {
  totalContributions: number;
  weeks: CalendarWeek[];
  months?: CalendarMonth[];
}

// Monochrome intensity palette matching the site's warm-minimal aesthetic
const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-[#EDEBE6] border-[#E6E3DE]",
  1: "bg-[#C4BFB4] border-[#B5B0A4]",
  2: "bg-[#8E887D] border-[#7F796E]",
  3: "bg-[#524D44] border-[#443F36]",
  4: "bg-[#181716] border-[#0A0A09]",
};

function getNumericLevel(levelStr: string, count: number): 0 | 1 | 2 | 3 | 4 {
  switch (levelStr) {
    case "FOURTH_QUARTILE":
    case "4":
      return 4;
    case "THIRD_QUARTILE":
    case "3":
      return 3;
    case "SECOND_QUARTILE":
    case "2":
      return 2;
    case "FIRST_QUARTILE":
    case "1":
      return 1;
    case "NONE":
    case "0":
      return 0;
    default:
      if (count === 0) return 0;
      if (count <= 2) return 1;
      if (count <= 5) return 2;
      if (count <= 9) return 3;
      return 4;
  }
}

export function GitHubContributionGraph() {
  const [calendarData, setCalendarData] =
    useState<ContributionCalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const fetchContributions = async () => {
    try {
      const res = await fetch("/api/github-contributions", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const json: ContributionCalendarResponse = await res.json();
      if (json && Array.isArray(json.weeks) && json.weeks.length > 0) {
        setCalendarData(json);
        setHasError(false);
      } else {
        throw new Error("Invalid calendar structure returned");
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
    const interval = setInterval(fetchContributions, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute month labels aligned with columns
  const monthLabels = useMemo(() => {
    if (!calendarData?.weeks?.length) return [];

    const labels: Array<{ text: string; colIndex: number }> = [];
    let lastMonth = -1;

    calendarData.weeks.forEach((week, colIdx) => {
      const firstValidDay = week.contributionDays.find((d) => d.date);
      if (firstValidDay) {
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
          lastMonth = month;
          const monthName = new Date(firstValidDay.date).toLocaleString(
            "default",
            { month: "short" }
          );
          // Skip labels that would overlap (fewer than 3 columns from previous)
          const prevCol = labels.length > 0 ? labels[labels.length - 1].colIndex : -10;
          if (colIdx - prevCol >= 3) {
            labels.push({ text: monthName, colIndex: colIdx });
          }
        }
      }
    });

    return labels;
  }, [calendarData]);

  // Align each week column into strict 7 weekday slots (Sunday=0 to Saturday=6)
  const normalizedWeeks = useMemo(() => {
    if (!calendarData?.weeks?.length) return [];

    return calendarData.weeks.map((week) => {
      const slots: Array<RawContributionDay | null> = Array(7).fill(null);
      week.contributionDays.forEach((day) => {
        const weekdayIndex =
          day.weekday !== undefined
            ? day.weekday
            : new Date(day.date).getDay();
        if (weekdayIndex >= 0 && weekdayIndex < 7) {
          slots[weekdayIndex] = day;
        }
      });
      return slots;
    });
  }, [calendarData]);

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

  const totalContributions = calendarData?.totalContributions ?? null;

  return (
    <div className="w-full max-w-2xl font-mono flex flex-col justify-center select-none py-2">
      {/* Header Row: Terminal Label + Official Sync Status */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase text-[var(--text-primary)]">
            // github.contributions
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              hasError ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
            }`}
          />
          <span>{hasError ? "offline" : "synced"}</span>
        </div>
      </div>

      {/* Prominent Contribution Count Headline */}
      <div className="mb-4 sm:mb-5">
        {loading ? (
          <div className="h-10 sm:h-12 w-56 bg-[var(--border)] rounded animate-pulse" />
        ) : hasError ? (
          <div className="text-sm text-[var(--text-muted)] italic">
            // unable to sync contribution data
          </div>
        ) : (
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-none">
              {totalContributions !== null
                ? totalContributions.toLocaleString()
                : "--"}
            </span>
            <span className="font-sans text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal">
              contributions in the last year
            </span>
          </div>
        )}
      </div>

      {/* Heatmap Grid Section */}
      <div className="w-full relative overflow-x-auto pb-2 scrollbar-none">
        {loading ? (
          <div className="h-32 sm:h-36 w-full bg-[var(--border)]/30 rounded-lg animate-pulse" />
        ) : hasError ? (
          <div className="h-32 flex items-center justify-center text-sm text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-lg">
            Contribution graph currently unavailable
          </div>
        ) : (
          <div className="min-w-[560px] select-none">
            {/* Month labels row — offset to account for day-label column */}
            <div className="relative h-5 mb-1.5 text-[10px] sm:text-xs text-[var(--text-muted)] font-mono pl-8">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{
                    left: `calc(2rem + ${
                      (lbl.colIndex / normalizedWeeks.length) * 100
                    }% * (1 - 2rem / 100%))`,
                  }}
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Day Cells Grid (53 Week Columns, 7 Weekday Rows Sunday-Saturday) */}
            <div className="flex gap-[3px] sm:gap-[4px] items-start">
              {/* Day-of-week labels column (Sun=0..Sat=6, show Mon/Wed/Fri like GitHub) */}
              <div className="flex flex-col gap-[3px] sm:gap-[4px] mr-1 shrink-0">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                  <div
                    key={i}
                    className="h-[9px] sm:h-[11px] md:h-[12px] flex items-center"
                  >
                    <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono leading-none">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Week columns */}
              {normalizedWeeks.map((weekSlots, wIdx) => (
                <div
                  key={wIdx}
                  className="flex flex-col gap-[3px] sm:gap-[4px]"
                >
                  {weekSlots.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={dIdx}
                          className="w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px] opacity-0 pointer-events-none"
                        />
                      );
                    }

                    const numericLevel = getNumericLevel(
                      day.contributionLevel,
                      day.contributionCount
                    );
                    const colorClass = LEVEL_COLORS[numericLevel];
                    const isHovered = hoveredDay?.date === day.date;

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            date: day.date,
                            count: day.contributionCount,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay((prev) =>
                            prev?.date === day.date
                              ? null
                              : {
                                  date: day.date,
                                  count: day.contributionCount,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                }
                          );
                        }}
                        className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px] rounded-[2.5px] border ${colorClass} transition-transform duration-150 cursor-pointer ${numericLevel === 0 ? "opacity-40" : ""} ${
                          isHovered
                            ? "scale-150 z-20 ring-1.5 ring-[var(--accent)]"
                            : ""
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
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-3 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-mono shadow-lg whitespace-nowrap"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y,
          }}
        >
          <span className="font-semibold">
            {hoveredDay.count === 0
              ? "No contributions"
              : `${hoveredDay.count} contribution${
                  hoveredDay.count > 1 ? "s" : ""
                }`}
          </span>{" "}
          <span className="opacity-80">on {formatDate(hoveredDay.date)}</span>
        </motion.div>
      )}

      {/* Footer: User profile handle & Theme-matched Intensity Legend */}
      <div className="mt-4 sm:mt-5 pt-3.5 border-t border-[var(--border)] flex items-center justify-between text-xs sm:text-sm text-[var(--text-muted)]">
        <a
          href="https://github.com/harshkumar1306"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] hover:underline flex items-center gap-1.5 font-mono"
        >
          <span>@harshkumar1306</span>
          <span>&rarr;</span>
        </a>

        {/* Intensity Legend */}
        <div className="flex items-center gap-2 text-xs">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <span
                key={level}
                className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px] rounded-[2px] border ${LEVEL_COLORS[level]} ${level === 0 ? "opacity-40" : ""}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

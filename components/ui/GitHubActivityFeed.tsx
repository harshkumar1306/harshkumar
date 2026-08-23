"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGitCommit,
  FiGitPullRequest,
  FiStar,
  FiPlusCircle,
  FiGitBranch,
  FiActivity,
  FiAlertCircle,
} from "react-icons/fi";

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url?: string;
  };
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{ message: string }>;
  };
  created_at: string;
}

function getEventDescription(event: GitHubEvent): {
  verb: string;
  icon: React.ReactNode;
} {
  const iconClass = "w-3.5 h-3.5 shrink-0 text-[var(--text-primary)] mt-0.5";

  switch (event.type) {
    case "PushEvent": {
      const commitCount = event.payload?.commits?.length || 1;
      return {
        verb: `pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to`,
        icon: <FiGitCommit className={iconClass} />,
      };
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type || "repo";
      return {
        verb: `created ${refType} in`,
        icon: <FiPlusCircle className={iconClass} />,
      };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action || "opened";
      return {
        verb: `${action} PR in`,
        icon: <FiGitPullRequest className={iconClass} />,
      };
    }
    case "IssuesEvent": {
      const action = event.payload?.action || "updated";
      return {
        verb: `${action} issue in`,
        icon: <FiAlertCircle className={iconClass} />,
      };
    }
    case "WatchEvent":
      return {
        verb: "starred",
        icon: <FiStar className={iconClass} />,
      };
    case "ForkEvent":
      return {
        verb: "forked",
        icon: <FiGitBranch className={iconClass} />,
      };
    default:
      return {
        verb: "active in",
        icon: <FiActivity className={iconClass} />,
      };
  }
}

function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  } catch {
    return "";
  }
}

function formatRepoName(repoName: string): string {
  // Return just the repository name without username prefix for compact display
  if (repoName.includes("/")) {
    return repoName.split("/")[1];
  }
  return repoName;
}

export function GitHubActivityFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/users/harshkumar1306/events/public",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data.slice(0, 4));
        setHasError(false);
      } else {
        setEvents([]);
        setHasError(false);
      }
      setLastFetched(new Date());
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Poll every 60 seconds (within GitHub unauthenticated 60 req/hour limit)
    const interval = setInterval(() => {
      fetchEvents();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[460px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] p-5 sm:p-6 md:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] font-mono flex flex-col justify-between transition-all duration-200">
      {/* Header Row: Terminal Label + Pulsing Status Dot */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)]">
            // github.activity
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span
            className={`w-2 h-2 rounded-full ${
              hasError ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
            }`}
          />
          <span className="font-mono">
            {hasError ? "standby" : "live"}
          </span>
        </div>
      </div>

      {/* Events Readout List */}
      <div className="min-h-[140px] flex flex-col justify-center">
        {loading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] animate-pulse"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
                <span className="h-3.5 bg-[var(--border)] rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <ul className="space-y-3 text-xs">
              {events.map((event, idx) => {
                const { verb, icon } = getEventDescription(event);
                const repoShort = formatRepoName(event.repo.name);
                const timeAgo = getRelativeTime(event.created_at);

                return (
                  <motion.li
                    key={event.id || idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="flex items-start justify-between gap-2 text-[var(--text-body)] group leading-snug"
                  >
                    <div className="flex items-start gap-2 min-w-0 flex-1">
                      {icon}
                      <span className="truncate">
                        <span className="text-[var(--text-muted)]">
                          {verb}{" "}
                        </span>
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[var(--text-primary)] hover:underline"
                        >
                          {repoShort}
                        </a>
                      </span>
                    </div>

                    <span className="text-[11px] text-[var(--text-muted)] shrink-0 pl-1">
                      {timeAgo}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </AnimatePresence>
        ) : (
          <div className="py-4 text-xs text-[var(--text-muted)] italic text-center">
            {hasError
              ? "// feed standby (rate-limited or offline)"
              : "// no recent public activity found"}
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
        <a
          href="https://github.com/harshkumar1306"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] hover:underline flex items-center gap-1"
        >
          <span>@harshkumar1306</span>
          <span>&rarr;</span>
        </a>
        <span>
          {lastFetched
            ? `synced ${lastFetched.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "syncing..."}
        </span>
      </div>
    </div>
  );
}

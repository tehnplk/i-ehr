"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarDays } from "lucide-react";
import { navigationItems } from "./navigationItems";
import { ThemeToggle } from "./ThemeToggle";

function todayLabel() {
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export function TopToolbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="flex min-h-14 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-1">
          <Link
            href="/"
            className="inline-flex h-[34px] items-center gap-2 border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm font-semibold text-[var(--text)] lg:hidden"
          >
            <Activity size={15} className="text-[var(--invert)]" />
            i-EHR
          </Link>

          {navigationItems.map(({ href, shortLabel, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex h-[34px] items-center gap-2 border px-3 text-sm font-medium ${
                  active
                    ? "border-[var(--invert)] bg-[var(--invert)] text-[var(--invert-fg)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--invert)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                }`}
              >
                <Icon size={15} />
                <span className="hidden xl:inline">{shortLabel}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <div className="hidden h-[34px] items-center gap-2 border border-[var(--border)] bg-[var(--bg)] px-3 text-sm text-[var(--text-muted)] sm:inline-flex">
            <CalendarDays size={15} className="text-[var(--text-faint)]" />
            <span className="truncate">{todayLabel()}</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

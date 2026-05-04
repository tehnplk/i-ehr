"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { navigationItems } from "./navigationItems";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navigationItems;
    return navigationItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.shortLabel.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q),
    );
  }, [query]);

  function toggleCollapsed() {
    setCollapsed((value) => !value);
    if (!collapsed) setQuery("");
  }

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-[width] duration-200 lg:flex ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div
        className={`flex h-16 items-center gap-2 border-b border-[var(--border)] ${
          collapsed ? "justify-center px-2" : "px-3"
        }`}
      >
        {!collapsed && (
          <Link
            href="/"
            className="flex flex-1 items-center gap-2 px-2 text-[var(--text)]"
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--invert)] text-[var(--invert-fg)]">
              <Activity size={16} />
            </span>
            <span className="text-base font-semibold tracking-normal">i-EHR</span>
          </Link>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "ขยายแถบเมนู" : "ย่อแถบเมนู"}
          className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--invert)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {!collapsed && (
          <>
            <div className="relative mb-2">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ค้นหาเมนู"
                aria-label="ค้นหาเมนู"
                className="h-[34px] w-full border border-[var(--border)] bg-[var(--bg)] pl-9 pr-8 text-xs text-[var(--text)] outline-none placeholder:text-xs placeholder:text-[var(--text-faint)] focus:border-[var(--invert)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="ล้างคำค้นหา"
                  className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[var(--text-faint)] hover:text-[var(--text)]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
              ทะเบียน
            </p>
          </>
        )}

        {filteredItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            className={`inline-flex h-[34px] items-center gap-3 border border-transparent text-sm font-medium text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <Icon size={16} className="shrink-0 text-[var(--text-dim)]" />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}

        {!collapsed && filteredItems.length === 0 && (
          <p className="px-3 py-2 text-sm text-[var(--text-faint)]">ไม่พบเมนู</p>
        )}
      </nav>

      <div className="border-t border-[var(--border)] p-3" />
    </aside>
  );
}

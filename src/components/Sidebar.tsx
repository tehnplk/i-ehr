"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  IdCard,
  Stethoscope,
  Syringe,
  UserRound,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { href: "/person", label: "ทะเบียน Person", icon: UserRound },
  { href: "/patient", label: "ทะเบียน Patient", icon: IdCard },
  { href: "/visit", label: "ทะเบียน Visit", icon: ClipboardList },
  { href: "/ncd", label: "ทะเบียน NCD", icon: HeartPulse },
  { href: "/epi", label: "ทะเบียน EPI", icon: Syringe },
  { href: "/provider", label: "ทะเบียน Provider", icon: Stethoscope },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
            <span className="text-base font-semibold tracking-tight">i-EHR</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--invert)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {!collapsed && (
          <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
            ทะเบียน
          </p>
        )}
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            className={`inline-flex h-10 items-center gap-3 border border-transparent text-sm font-medium text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <Icon size={16} className="shrink-0 text-[var(--text-dim)]" />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>

      <div
        className={`flex items-center gap-2 border-t border-[var(--border)] p-3 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
            Theme
          </span>
        )}
        <ThemeToggle />
      </div>
    </aside>
  );
}

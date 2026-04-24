'use client';

import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type Status =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'open'
  | 'closed'
  | 'ongoing'
  | 'draft'
  | 'published'
  | 'approved'
  | 'waitlist'
  | 'new'
  | 'live'
  | 'rejected'
  | 'withdrawn'
  | 'scheduled'
  | 'walkover';

interface Props {
  status: Status;
  showDot?: boolean;
  size?: 'sm' | 'md';
}

// ─── Config Map ───────────────────────────────────────────────────────────────
type BadgeConfig = {
  label: string;
  bg: string;
  text: string;
  dot: string;
  pulse?: boolean;
};

const STATUS_MAP: Record<Status, BadgeConfig> = {
  // ── Positive / Active ──
  confirmed:  { label: 'Confirmed',  bg: 'bg-emerald-400/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  open:       { label: 'Open',       bg: 'bg-emerald-400/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  approved:   { label: 'Approved',   bg: 'bg-emerald-400/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  published:  { label: 'Published',  bg: 'bg-emerald-400/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },

  // ── Live / Ongoing ──
  live:       { label: 'Live',       bg: 'bg-blue-400/10',    text: 'text-blue-400',    dot: 'bg-blue-400',    pulse: true },
  ongoing:    { label: 'Ongoing',    bg: 'bg-blue-400/10',    text: 'text-blue-400',    dot: 'bg-blue-400',    pulse: true },
  scheduled:  { label: 'Scheduled',  bg: 'bg-blue-400/10',    text: 'text-blue-400',    dot: 'bg-blue-400' },

  // ── Pending / Waiting ──
  pending:    { label: 'Pending',    bg: 'bg-amber-400/10',   text: 'text-amber-400',   dot: 'bg-amber-400' },
  waitlist:   { label: 'Waitlist',   bg: 'bg-amber-400/10',   text: 'text-amber-400',   dot: 'bg-amber-400' },
  new:        { label: 'New',        bg: 'bg-amber-400/10',   text: 'text-amber-400',   dot: 'bg-amber-400', pulse: true },

  // ── Negative / Cancelled ──
  cancelled:  { label: 'Cancelled',  bg: 'bg-red-400/10',     text: 'text-red-400',     dot: 'bg-red-400' },
  rejected:   { label: 'Rejected',   bg: 'bg-red-400/10',     text: 'text-red-400',     dot: 'bg-red-400' },
  withdrawn:  { label: 'Withdrawn',  bg: 'bg-red-400/10',     text: 'text-red-400',     dot: 'bg-red-400' },

  // ── Neutral / Done ──
  completed:  { label: 'Completed',  bg: 'bg-zinc-400/10',    text: 'text-zinc-400',    dot: 'bg-zinc-400' },
  closed:     { label: 'Closed',     bg: 'bg-zinc-400/10',    text: 'text-zinc-400',    dot: 'bg-zinc-400' },
  draft:      { label: 'Draft',      bg: 'bg-zinc-600/10',    text: 'text-zinc-500',    dot: 'bg-zinc-500' },
  walkover:   { label: 'Walkover',   bg: 'bg-zinc-400/10',    text: 'text-zinc-400',    dot: 'bg-zinc-400' },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StatusBadge({ status, showDot = true, size = 'md' }: Props) {
  const cfg = STATUS_MAP[status] ?? {
    label: status,
    bg: 'bg-zinc-400/10',
    text: 'text-zinc-400',
    dot: 'bg-zinc-400',
  };

  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-2 py-0.5 gap-1.5 rounded-md'
    : 'text-xs px-2.5 py-1 gap-1.5 rounded-md';

  return (
    <span
      className={`inline-flex items-center font-sans font-semibold tracking-wide border border-transparent
        ${cfg.bg} ${cfg.text} ${sizeClasses}
        border-current/10`}
    >
      {showDot && (
        <span className="relative flex items-center justify-center flex-shrink-0">
          <span
            className={`block rounded-full flex-shrink-0 ${cfg.dot}
              ${size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}
          />
          {cfg.pulse && (
            <span
              className={`absolute inline-flex rounded-full opacity-75 animate-ping ${cfg.dot}
                ${size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}
            />
          )}
        </span>
      )}
      {cfg.label}
    </span>
  );
}

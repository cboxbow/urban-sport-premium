'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import EmptyState from './EmptyState';
import { SkeletonTable } from './LoadingSkeleton';

// ─── Types ────────────────────────────────────────────────────────────────────
type HiddenBreakpoint = 'sm' | 'md' | 'lg';

interface Column<T> {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
  hidden?: HiddenBreakpoint;
  sortable?: boolean;
}

interface Props<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  keyField?: string;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function hiddenClass(hidden?: HiddenBreakpoint) {
  switch (hidden) {
    case 'sm':  return 'hidden sm:table-cell';
    case 'md':  return 'hidden md:table-cell';
    case 'lg':  return 'hidden lg:table-cell';
    default:    return '';
  }
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: string;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
}) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className="text-white/20 ml-1 flex-shrink-0" />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="text-gold-400 ml-1 flex-shrink-0" />
    : <ChevronDown size={13} className="text-gold-400 ml-1 flex-shrink-0" />;
}

// ─── Row animation ────────────────────────────────────────────────────────────
const rowVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: 'easeOut' },
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PremiumDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found.',
  onRowClick,
  keyField = 'id',
  sortKey,
  sortDir,
  onSort,
}: Props<T>) {
  // ── Loading ──
  if (loading) {
    return <SkeletonTable rows={5} cols={columns.length} />;
  }

  // ── Empty ──
  if (!data.length) {
    return (
      <EmptyState
        title="No data found"
        description={emptyMessage}
        variant="compact"
      />
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-sans">
          {/* ── Head ── */}
          <thead>
            <tr className="border-b border-white/8">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold tracking-[0.12em] uppercase
                    text-white/40 whitespace-nowrap select-none
                    ${hiddenClass(col.hidden)}
                    ${col.sortable ? 'cursor-pointer hover:text-gold-400 transition-colors' : ''}
                    ${col.className ?? ''}`}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {data.map((row, rowIdx) => (
              <motion.tr
                key={String(row[keyField] ?? rowIdx)}
                custom={rowIdx}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className={`border-b border-white/5 last:border-0 transition-colors duration-150
                  ${onRowClick ? 'cursor-pointer hover:bg-white/4 hover:border-gold-400/15' : 'hover:bg-white/[0.02]'}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 text-white/70 whitespace-nowrap align-middle
                      ${hiddenClass(col.hidden)}
                      ${col.className ?? ''}`}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '—')}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

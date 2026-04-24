'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Base Skeleton Pulse ──────────────────────────────────────────────────────
function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'skeleton rounded-lg',
        className
      )}
    />
  );
}

// ─── stagger container ────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden:  { opacity: 0 },
  show:    { opacity: 1, transition: { duration: 0.35 } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════════════════════

/** Single card skeleton */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className={cn('glass-card overflow-hidden space-y-4 p-5', className)}
    >
      {/* Image area */}
      <Bone className="h-44 w-full" />
      {/* Title */}
      <Bone className="h-5 w-3/4" />
      {/* Subtitle */}
      <Bone className="h-4 w-1/2" />
      {/* Tags row */}
      <div className="flex gap-2">
        <Bone className="h-6 w-16 rounded-full" />
        <Bone className="h-6 w-20 rounded-full" />
        <Bone className="h-6 w-14 rounded-full" />
      </div>
    </motion.div>
  );
}

/** Multi-line text skeleton */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3', 'w-1/2'];
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-2.5"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <Bone className={cn('h-4', widths[i % widths.length])} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Table skeleton */
export function SkeletonTable({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div
        className="grid border-b border-white/5 px-4 py-3 gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <Bone key={i} className="h-3 w-20" />
        ))}
      </div>
      {/* Rows */}
      <motion.div variants={stagger} initial="hidden" animate="show">
        {Array.from({ length: rows }).map((_, r) => (
          <motion.div
            key={r}
            variants={item}
            className="grid border-b border-white/5 last:border-0 px-4 py-4 gap-4"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {Array.from({ length: cols }).map((_, c) => (
              <Bone
                key={c}
                className={cn(
                  'h-4',
                  c === 0 ? 'w-32' : c === cols - 1 ? 'w-16' : 'w-24'
                )}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/** Hero section skeleton */
export function SkeletonHero() {
  return (
    <div className="relative w-full h-[560px] bg-[#0e0e0e] overflow-hidden rounded-xl">
      {/* bg shimmer */}
      <div className="absolute inset-0 skeleton" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <Bone className="h-5 w-40 rounded-full mx-auto" />
        <Bone className="h-16 w-2/3 mx-auto" />
        <Bone className="h-16 w-1/2 mx-auto" />
        <Bone className="h-5 w-80 mx-auto" />
        <div className="flex gap-3 mt-2">
          <Bone className="h-12 w-36 rounded-lg" />
          <Bone className="h-12 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Grid of skeleton cards */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <SkeletonCard />
        </motion.div>
      ))}
    </motion.div>
  );
}

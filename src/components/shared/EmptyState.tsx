'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'compact';
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
}: Props) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass-card flex flex-col items-center justify-center text-center
        ${isCompact ? 'py-10 px-6' : 'py-20 px-8'}`}
    >
      {/* Icon wrapper */}
      <div
        className={`relative flex items-center justify-center rounded-2xl mb-5
          ${isCompact ? 'w-12 h-12' : 'w-16 h-16'}`}
      >
        {/* Glow background */}
        <div className="absolute inset-0 rounded-2xl bg-gold-soft" />
        <div className="absolute inset-0 rounded-2xl border border-gold-400/20" />
        <span className={`relative text-gold-400 ${isCompact ? 'w-5 h-5' : 'w-7 h-7'}`}>
          {icon ?? <Inbox size={isCompact ? 20 : 28} />}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-display tracking-wide text-white/90 mb-2
          ${isCompact ? 'text-lg' : 'text-2xl'}`}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={`text-white/45 leading-relaxed max-w-sm
            ${isCompact ? 'text-xs' : 'text-sm'}`}
        >
          {description}
        </p>
      )}

      {/* CTA */}
      {action && (
        <div className="mt-6">
          {action.href ? (
            <Link href={action.href} className="btn-primary text-sm px-6 py-2.5 rounded-lg font-sans font-semibold">
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="btn-primary text-sm px-6 py-2.5 rounded-lg font-sans font-semibold"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

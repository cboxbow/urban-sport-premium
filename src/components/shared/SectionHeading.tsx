'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  goldWord?: string;
  cta?: React.ReactNode;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function alignClass(align: Props['align']) {
  switch (align) {
    case 'center': return 'items-center text-center';
    case 'right':  return 'items-end text-right';
    default:       return 'items-start text-left';
  }
}

/** Wraps the `goldWord` inside the title with a gold-gradient span */
function renderTitle(title: string, goldWord?: string) {
  if (!goldWord) {
    return <span>{title}</span>;
  }
  const idx = title.indexOf(goldWord);
  if (idx === -1) return <span>{title}</span>;

  return (
    <>
      {title.slice(0, idx)}
      <span className="text-gold-gradient">{goldWord}</span>
      {title.slice(idx + goldWord.length)}
    </>
  );
}

// ─── Fade-up animation variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  goldWord,
  cta,
  className = '',
}: Props) {
  const hasCtaRow = align !== 'center' && cta;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col ${alignClass(align)} gap-3 ${className}`}
    >
      {/* Optional CTA row (left-aligned variant only) */}
      {hasCtaRow ? (
        <div className="flex items-start justify-between w-full gap-6">
          <div className={`flex flex-col ${alignClass(align)} gap-3`}>
            {eyebrow && (
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-gold-400">
                  <span className="w-4 h-px bg-gold-gradient" />
                  {eyebrow}
                </span>
              </motion.div>
            )}
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide text-white leading-none"
            >
              {renderTitle(title, goldWord)}
            </motion.h2>
            {subtitle && (
              <motion.p variants={itemVariants} className="text-sm sm:text-base text-white/55 leading-relaxed max-w-xl">
                {subtitle}
              </motion.p>
            )}
          </div>
          {/* CTA pinned to the right */}
          <motion.div variants={itemVariants} className="flex-shrink-0 mt-1">
            {cta}
          </motion.div>
        </div>
      ) : (
        <>
          {eyebrow && (
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-gold-400">
                {align === 'center' && <span className="w-4 h-px bg-gold-gradient" />}
                {align !== 'center' && <span className="w-4 h-px bg-gold-gradient" />}
                {eyebrow}
                {align === 'center' && <span className="w-4 h-px bg-gold-gradient" />}
              </span>
            </motion.div>
          )}
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide text-white leading-none"
          >
            {renderTitle(title, goldWord)}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className={`text-sm sm:text-base text-white/55 leading-relaxed ${
                align === 'center' ? 'max-w-2xl' : 'max-w-xl'
              }`}
            >
              {subtitle}
            </motion.p>
          )}
          {cta && (
            <motion.div variants={itemVariants} className="mt-2">
              {cta}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

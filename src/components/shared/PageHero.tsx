'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: BreadcrumbItem[];
  background?: 'dark' | 'image';
  imageUrl?: string;
  children?: React.ReactNode;
  height?: 'sm' | 'md' | 'lg';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function heightClass(h: Props['height']) {
  switch (h) {
    case 'sm': return 'min-h-[280px] py-20';
    case 'lg': return 'min-h-[560px] py-28';
    default:   return 'min-h-[400px] py-24';
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  background = 'dark',
  imageUrl,
  children,
  height = 'md',
}: Props) {
  return (
    <section
      className={`relative flex flex-col justify-end overflow-hidden ${heightClass(height)}`}
    >
      {/* ── Background ── */}
      {background === 'image' && imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
          <div className="absolute inset-0 bg-hero-overlay" />
        </>
      ) : (
        <>
          {/* Dark radial glow */}
          <div className="absolute inset-0 bg-[#0A0A0A]" />
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-400/6 rounded-full blur-[100px] pointer-events-none"
          />
          {/* Subtle grid pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,179,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,179,0,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </>
      )}

      {/* Gold thin decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-40" />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 mb-6 flex-wrap"
          >
            <Link
              href="/"
              className="flex items-center text-white/40 hover:text-white/70 transition-colors text-xs"
            >
              <Home size={12} />
            </Link>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={12} className="text-white/20" />
                {crumb.href && idx < breadcrumb.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs text-gold-400/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-gold-400">
              <span className="w-4 h-px bg-gold-gradient" />
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-white leading-none mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed mb-6"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, User, Users, CheckCircle, Loader2, Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  inquiry_type: z.enum(['corporate', 'private', 'team_building']),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  company_name: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  preferred_date: z.string().optional(),
  expected_guests: z.coerce.number().min(1).max(500).optional(),
  message: z.string().min(10, 'Please provide at least 10 characters of detail'),
});

type FormData = z.infer<typeof schema>;

// ─── Inquiry type config ──────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  { value: 'corporate' as const,     label: 'Corporate',      icon: Building2, desc: 'Company events & team days' },
  { value: 'private' as const,       label: 'Private',        icon: User,      desc: 'Birthday, celebration, family' },
  { value: 'team_building' as const, label: 'Team Building',  icon: Users,     desc: 'Group challenges & activities' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function EventInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { inquiry_type: 'corporate' },
  });

  const inquiryType = watch('inquiry_type');

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch('/api/event-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: data.inquiry_type,
          fullName: data.full_name,
          companyName: data.company_name ?? '',
          email: data.email,
          phone: data.phone ?? '',
          preferredDate: data.preferred_date ?? '',
          expectedGuests: String(data.expected_guests ?? ''),
          message: data.message,
        }),
      });
      if (!response.ok) throw new Error('Unable to send inquiry');
      setSubmitted(true);
    } catch (err: unknown) {
      toast.error((err as { message?: string })?.message ?? 'Something went wrong. Please try again.');
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-gold rounded-2xl p-10 flex flex-col items-center justify-center gap-5 text-center min-h-[360px]"
      >
        <div className="w-16 h-16 rounded-full bg-[#FFB300]/15 flex items-center justify-center ring-2 ring-[#FFB300]/40">
          <CheckCircle className="w-8 h-8 text-[#FFB300]" />
        </div>
        <div>
          <p className="text-label text-[#FFB300] mb-2">REQUEST RECEIVED</p>
          <h3 className="heading-card text-white mb-3">Thank You!</h3>
          <p className="text-muted max-w-xs">
            We&apos;ll be in touch within 24 hours to discuss your event and shape a premium proposal.
          </p>
        </div>
        <div className="flex items-center gap-2 text-white/30 text-sm">
          <Mail className="w-4 h-4" />
          The request is now stored in the local admin system.
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* ── Inquiry type tabs ─────────────────────────────────── */}
          <div>
            <p className="field-label mb-3">Inquiry Type</p>
            <div className="grid grid-cols-3 gap-2">
              {INQUIRY_TYPES.map(({ value, label, icon: Icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue('inquiry_type', value)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-xl p-3 border transition-all text-center',
                    inquiryType === value
                      ? 'border-[#FFB300] bg-[#FFB300]/10 text-[#FFB300]'
                      : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-semibold tracking-wide">{label}</span>
                  <span className="text-[10px] leading-tight opacity-70 hidden sm:block">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Name + Email ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Full Name *</label>
              <input
                {...register('full_name')}
                className={cn('field-input', errors.full_name && 'border-red-500/60 focus:border-red-500')}
                placeholder="Your full name"
              />
              {errors.full_name && <p className="field-error">{errors.full_name.message}</p>}
            </div>
            <div>
              <label className="field-label">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  {...register('email')}
                  type="email"
                  className={cn('field-input pl-9', errors.email && 'border-red-500/60')}
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && <p className="field-error">{errors.email.message}</p>}
            </div>
          </div>

          {/* ── Company + Phone ───────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">
                Company Name <span className="text-white/30 ml-1">(optional)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  {...register('company_name')}
                  className="field-input pl-9"
                  placeholder="Your company"
                />
              </div>
            </div>
            <div>
              <label className="field-label">
                Phone <span className="text-white/30 ml-1">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  {...register('phone')}
                  type="tel"
                  className="field-input pl-9"
                  placeholder="+230 5XXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* ── Preferred Date + Expected Guests ─────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">
                Preferred Date <span className="text-white/30 ml-1">(optional)</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  {...register('preferred_date')}
                  type="date"
                  className="field-input pl-9"
                />
              </div>
            </div>
            <div>
              <label className="field-label">
                Expected Guests <span className="text-white/30 ml-1">(optional)</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  {...register('expected_guests')}
                  type="number"
                  min={1}
                  max={500}
                  className={cn('field-input pl-9', errors.expected_guests && 'border-red-500/60')}
                  placeholder="e.g. 50"
                />
              </div>
              {errors.expected_guests && <p className="field-error">Must be between 1 and 500</p>}
            </div>
          </div>

          {/* ── Message ───────────────────────────────────────────── */}
          <div>
            <label className="field-label">Message *</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/30 pointer-events-none" />
              <textarea
                {...register('message')}
                rows={4}
                className={cn('field-input pl-9 resize-none', errors.message && 'border-red-500/60')}
                placeholder="Tell us about your event, your vision, any special requirements…"
              />
            </div>
            {errors.message && <p className="field-error">{errors.message.message}</p>}
          </div>

          {/* ── Submit ────────────────────────────────────────────── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary btn-lg w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending Request…</>
            ) : (
              'Submit Event Inquiry'
            )}
          </button>

          <p className="text-center text-muted text-xs">
            By submitting you agree to our Privacy Policy. We respond within 24 hours.
          </p>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

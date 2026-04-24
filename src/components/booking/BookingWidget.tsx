'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CalendarDays, Clock3, Mail, MapPin, Phone, User, Wallet } from 'lucide-react';
import type { ClubContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

const SLOT_MAP = {
  'grand-baie': ['07:30', '09:00', '17:30', '19:00'],
  'black-river': ['08:00', '10:00', '18:00', '19:30'],
} as const;

type Step = 1 | 2 | 3 | 4;

export default function BookingWidget({ clubs }: { clubs: ClubContent[] }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [clubSlug, setClubSlug] = useState(clubs[0]?.slug ?? 'grand-baie');
  const [date, setDate] = useState('2026-05-30');
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const activeClub = clubs.find((club) => club.slug === clubSlug) ?? clubs[0];
  const slots = SLOT_MAP[clubSlug as keyof typeof SLOT_MAP] ?? ['08:00', '10:00'];
  const price = clubSlug === 'black-river' ? 'Rs 1,200' : 'Rs 950';

  async function submitRequest() {
    setLoading(true);
    const response = await fetch('/api/booking-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clubSlug,
        date,
        preferredSlot: slot,
        name,
        phone,
        email,
        notes,
      }),
    });
    setLoading(false);

    if (response.ok) {
      router.push('/booking/success');
    }
  }

  return (
    <div className="glass-card-gold rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 flex flex-wrap gap-3">
            {['Location', 'Date', 'Slot', 'Confirm'].map((label, index) => {
              const current = (index + 1) as Step;
              const done = step > current;
              const active = step === current;
              return (
                <div
                  key={label}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all',
                    active && 'border-[#ffb300] bg-[#ffb300]/12 text-[#ffb300]',
                    done && 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
                    !active && !done && 'border-white/10 text-white/35'
                  )}
                >
                  {done ? 'Done' : label}
                </div>
              );
            })}
          </div>

          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              {clubs.map((club) => (
                <button
                  key={club.id}
                  type="button"
                  onClick={() => {
                    setClubSlug(club.slug);
                    setStep(2);
                  }}
                  className={cn(
                    'rounded-[1.5rem] border p-5 text-left transition-all',
                    club.slug === clubSlug
                      ? 'border-[#ffb300] bg-white/[0.05]'
                      : 'border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.045]'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-white/35">{club.region}</div>
                      <div className="mt-3 font-display text-4xl uppercase tracking-[0.12em] text-white">{club.name.replace('Urban Sport ', '')}</div>
                    </div>
                    <ArrowRight className={cn('mt-1 h-4 w-4 transition-transform', club.slug === clubSlug && 'translate-x-1 text-[#ffb300]')} />
                  </div>
                  <div className="mt-2 text-sm text-white/55">{club.shortDescription}</div>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#ffb300]">
                    <MapPin className="h-3.5 w-3.5" />
                    {club.phone}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-sm text-white/62">
                Choose a preferred date for <span className="text-white">{activeClub?.name}</span>. The team will confirm the final session with you directly.
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {['2026-05-30', '2026-05-31', '2026-06-01'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setDate(value);
                      setStep(3);
                    }}
                    className={cn(
                      'rounded-[1.25rem] border px-4 py-5 text-left transition-all',
                      date === value ? 'border-[#ffb300] bg-[#ffb300]/10' : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.045]'
                    )}
                  >
                    <div className="text-xs uppercase tracking-[0.2em] text-white/35">Date</div>
                    <div className="mt-2 flex items-center gap-2 text-white">
                      <CalendarDays className="h-4 w-4 text-[#ffb300]" />
                      {value}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="text-sm text-white/62">
                Select your preferred slot. This is a premium request flow, so the club confirms the final availability manually.
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {slots.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSlot(value);
                      setStep(4);
                    }}
                    className={cn(
                      'rounded-[1.25rem] border px-4 py-4 text-left transition-all',
                      slot === value ? 'border-[#ffb300] bg-[#ffb300]/10' : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.045]'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 text-white">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-[#ffb300]" />
                        {value} - 90 min
                      </div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[#ffb300]">{price}</div>
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/35">Preferred timing request</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="field-label">Name</span>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input className="field-input pl-9" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </label>
                <label className="grid gap-2">
                  <span className="field-label">Phone</span>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input className="field-input pl-9" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="field-label">Email</span>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input className="field-input pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="field-label">Notes</span>
                  <textarea className="field-input min-h-[120px]" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </label>
              </div>
              <button className="btn-premium w-full justify-center" onClick={submitRequest} disabled={loading || !name || !phone || !email || !slot}>
                {loading ? 'Sending request...' : 'Send booking request'}
              </button>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="surface-panel p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#ffb300]">
              <Wallet className="h-4 w-4" />
              Booking summary
            </div>
            <div className="mt-5 space-y-4">
              <SummaryRow label="Club" value={activeClub?.name ?? ''} />
              <SummaryRow label="Date" value={date} />
              <SummaryRow label="Slot" value={slot || 'Select a time'} />
              <SummaryRow label="Rate" value={`${price} / 90 min`} />
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/38">Booking model</div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Your request is saved locally and reviewed by the Urban Sport team for final confirmation.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 text-sm last:border-b-0 last:pb-0">
      <span className="uppercase tracking-[0.18em] text-white/35">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

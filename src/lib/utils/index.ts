import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// =============================================================================
// cn – Tailwind class merging helper
// =============================================================================
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// =============================================================================
// formatCurrency – e.g. 1500 → "Rs 1,500"
// =============================================================================
export function formatCurrency(amount: number): string {
  return `Rs ${new Intl.NumberFormat('en-MU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

// =============================================================================
// formatDate – "YYYY-MM-DD" → "20 May 2026"
// =============================================================================
export function formatDate(date: string): string {
  if (!date) return '';
  const d = new Date(date.includes('T') ? date : `${date}T00:00:00`);
  return d.toLocaleDateString('en-MU', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });
}

// =============================================================================
// formatTime – "14:30" or "14:30:00" → "2:30 PM"
// =============================================================================
export function formatTime(time: string): string {
  if (!time) return '';
  // Build a dummy date so we can use toLocaleTimeString.
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d.toLocaleTimeString('en-US', {
    hour:   'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// =============================================================================
// slugify – "Urban Sport Open 2026" → "urban-sport-open-2026"
// =============================================================================
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')       // remove special chars
    .replace(/[\s_]+/g, '-')        // spaces and underscores → hyphens
    .replace(/--+/g, '-')           // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');       // strip leading/trailing hyphens
}

// =============================================================================
// getDurationHours – ("07:00", "09:30") → 2.5
// =============================================================================
export function getDurationHours(start: string, end: string): number {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m ?? 0);
  };
  const diff = toMinutes(end) - toMinutes(start);
  if (diff <= 0) return 0;
  return diff / 60;
}

// =============================================================================
// getTodayString – returns current date as "YYYY-MM-DD"
// =============================================================================
export function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// =============================================================================
// generateTimeSlots – e.g. (7, 22, 90) → [{start: "07:00", end: "08:30"}, ...]
// =============================================================================
export function generateTimeSlots(
  startHour:   number,
  endHour:     number,
  durationMin: number
): Array<{ start: string; end: string }> {
  const slots: Array<{ start: string; end: string }> = [];
  const startMinutes = startHour * 60;
  const endMinutes   = endHour   * 60;

  let cursor = startMinutes;
  while (cursor + durationMin <= endMinutes) {
    const slotEnd = cursor + durationMin;
    const fmt = (mins: number) =>
      `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
    slots.push({ start: fmt(cursor), end: fmt(slotEnd) });
    cursor = slotEnd;
  }

  return slots;
}

// =============================================================================
// truncate – truncate a string to maxLength with ellipsis
// =============================================================================
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

// =============================================================================
// capitalize – "hello world" → "Hello World"
// =============================================================================
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}

// =============================================================================
// isValidEmail – simple RFC-like email check
// =============================================================================
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =============================================================================
// getInitials – "John Smith" → "JS"
// =============================================================================
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Home, Images, LayoutDashboard, LogOut, Settings, Shield, ShoppingBag, Sparkles, Target, Trophy, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/clubs', label: 'Clubs', icon: Sparkles },
  { href: '/admin/coaching', label: 'Coaching', icon: Target },
  { href: '/admin/experiences', label: 'Experiences', icon: Sparkles },
  { href: '/admin/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/admin/booking-requests', label: 'Booking Requests', icon: CalendarDays },
  { href: '/admin/event-inquiries', label: 'Event Inquiries', icon: CalendarDays },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/admin/league', label: 'League', icon: Trophy },
  { href: '/admin/memberships', label: 'Memberships', icon: Users },
  { href: '/admin/events', label: 'Events', icon: CalendarDays },
  { href: '/admin/sponsors', label: 'Sponsors', icon: Shield },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-white/8 bg-[#050505] lg:flex">
      <div className="border-b border-white/8 px-6 py-6">
        <Image
          src="/logos/urban-sport-primary-dark.png"
          alt="Urban Sport"
          width={180}
          height={44}
          className="h-9 w-auto"
        />
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#ffb300]/30 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#ffb300]">
          <Shield className="h-3.5 w-3.5" />
          Admin Control
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {ADMIN_LINKS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors',
                active
                  ? 'border-[#ffb300]/30 bg-[#ffb300]/10 text-[#ffb300]'
                  : 'border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.03] hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 px-6 py-5">
        <button
          className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin/login';
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

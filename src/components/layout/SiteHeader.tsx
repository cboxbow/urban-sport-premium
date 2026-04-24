'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/clubs', label: 'Clubs' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/membership', label: 'Membership' },
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/league', label: 'League' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isHome && 'home-header-enter',
        scrolled
          ? 'border-b border-white/10 bg-black/72 backdrop-blur-2xl'
          : isHome
            ? 'bg-transparent'
            : 'bg-transparent'
      )}
    >
      <div className="page-container pt-3">
        <div
          className={cn(
            'flex items-center gap-4 rounded-[1.5rem] px-4 transition-all duration-300 sm:px-5 xl:px-6',
            isHome
              ? scrolled
                ? 'min-h-[4.7rem] border border-white/10 bg-black/78 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
                : 'min-h-[5.05rem] border border-white/8 bg-black/58 backdrop-blur-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.28)]'
              : scrolled
                ? 'min-h-[5rem] border border-white/10 bg-black/58 shadow-[0_18px_60px_rgba(0,0,0,0.45)]'
                : 'min-h-[5.2rem] border border-white/8 bg-black/22 backdrop-blur-xl'
          )}
        >
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/urban-sport-primary-dark.png"
              alt="Urban Sport"
              width={186}
              height={46}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            <nav
              className={cn(
                'flex min-w-0 flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full px-5 py-3 transition-all duration-300',
                isHome ? 'border border-white/10 bg-white/[0.04]' : 'border border-white/10 bg-white/[0.035]'
              )}
            >
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-[12px] uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:text-white',
                      active && 'text-[#d4af37] [text-shadow:0_0_18px_rgba(201,168,76,0.2)]'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link href="/login" className={cn('btn-shell', isHome && 'hover:border-[#c9a24a]/25 hover:text-white')}>
              Login
            </Link>
            <Link
              href="/booking"
              className={cn('btn-premium', isHome && 'shadow-[0_12px_30px_rgba(201,168,76,0.24)] hover:shadow-[0_18px_42px_rgba(201,168,76,0.34)]')}
            >
              Book Now
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/96 xl:hidden">
          <div className="page-container flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/78"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Link href="/login" className="btn-shell justify-center">
                Login
              </Link>
              <Link href="/booking" className="btn-premium justify-center">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

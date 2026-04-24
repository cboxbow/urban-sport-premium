import Image from 'next/image';
import Link from 'next/link';
import { getFooterData } from '@/lib/site-content';

const PARTNER_LOGO_RAIL = [
  {
    id: 'mpl-msra',
    src: '/partners/mpl-msra.png',
    alt: 'Mauritius Squash Rackets Association and Mauritius Padel League',
    width: 400,
    height: 96,
  },
  {
    id: 'afrasia',
    src: '/partners/afrasia-white.png',
    alt: 'Afrasia Bank Padel League',
    width: 280,
    height: 72,
  },
  {
    id: 'dove',
    src: '/partners/dove.png',
    alt: 'Dove',
    width: 180,
    height: 74,
  },
  {
    id: 'heineken',
    src: '/partners/heineken.png',
    alt: 'Heineken 0.0',
    width: 180,
    height: 74,
  },
  {
    id: 'weaver-fintech',
    src: '/partners/weaver-fintech.png',
    alt: 'Weaver Fintech',
    width: 190,
    height: 74,
  },
  {
    id: 'padel-house',
    src: '/partners/padel-house.png',
    alt: 'Padel House',
    width: 280,
    height: 60,
  },
];

const PRIMARY_PARTNER_LOGOS = PARTNER_LOGO_RAIL.filter((logo) =>
  ['mpl-msra', 'afrasia'].includes(logo.id)
);

const SECONDARY_PARTNER_LOGOS = PARTNER_LOGO_RAIL.filter((logo) =>
  ['dove', 'heineken', 'weaver-fintech', 'padel-house'].includes(logo.id)
);

export default async function SiteFooter() {
  const { settings, clubs } = await getFooterData();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="page-container grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <Image
            src={settings.logoPrimary}
            alt="Urban Sport"
            width={220}
            height={52}
            className="h-11 w-auto"
          />
          <p className="max-w-xl text-sm leading-7 text-white/58">
            {settings.footer.headline}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/48">
            <Link
              href="https://www.facebook.com/urbansportmauritius"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/8 px-4 py-2 transition-colors hover:border-[#d4af37]/30 hover:text-white"
            >
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/urbansportmauritius/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/8 px-4 py-2 transition-colors hover:border-[#d4af37]/30 hover:text-white"
            >
              Instagram
            </Link>
          </div>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
              {PRIMARY_PARTNER_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className={`flex items-center justify-center px-1 py-1 transition-all duration-300 hover:-translate-y-0.5 ${
                    logo.id === 'mpl-msra' ? 'min-h-[86px]' : 'min-h-[68px]'
                  }`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={`h-auto w-auto transition-all duration-300 hover:opacity-100 ${
                      logo.id === 'mpl-msra'
                        ? 'max-h-[72px] opacity-95'
                        : 'max-h-[52px] opacity-88'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-6 gap-y-4">
              {SECONDARY_PARTNER_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className="flex min-h-[68px] items-center justify-center px-1 py-1 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={`h-auto w-auto opacity-88 transition-all duration-300 hover:opacity-100 ${
                      logo.id === 'padel-house' ? 'max-h-[60px]' : 'max-h-[52px]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-3xl uppercase tracking-[0.14em] text-white">Platform</h3>
          <div className="grid gap-3 text-sm uppercase tracking-[0.18em] text-white/62">
            <Link href="/clubs">Clubs</Link>
            <Link href="/coaching">Coaching</Link>
            <Link href="/experiences">Experiences</Link>
            <Link href="/booking">Booking</Link>
            <Link href="/tournaments">Tournaments</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/league">League</Link>
            <Link href="/membership">Membership</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-3xl uppercase tracking-[0.14em] text-white">Club Lines</h3>
          <div className="grid gap-4">
            {clubs.map((club) => (
              <div key={club.name} className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/40">{club.region}</div>
                <div className="mt-2 text-lg font-semibold text-white">{club.name}</div>
                <div className="text-sm uppercase tracking-[0.18em] text-[#d4af37]">{club.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-5">
        <div className="page-container flex flex-col gap-2 text-xs uppercase tracking-[0.16em] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <span>{settings.footer.copyright}</span>
          <span>{settings.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

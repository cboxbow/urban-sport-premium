import Image from 'next/image';
import Link from 'next/link';

type CircuitStop = {
  date: string;
  category: string;
  field: string;
};

type CircuitHighlight = {
  title: string;
  items: string[];
};

const CIRCUITS: Array<{
  slug: 'grand-baie' | 'black-river';
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  posterImage: string;
  supportImage: string;
  posterHref: string;
  accent: string;
  stats: string[];
  highlights: CircuitHighlight[];
  stops: CircuitStop[];
}> = [
  {
    slug: 'grand-baie',
    label: 'Grand Baie Tournaments',
    eyebrow: 'North circuit',
    title: 'Grand Baie 2026 season',
    description:
      'Grand Baie carries the social side of the Urban Sport tournament season with regular men, mixed, and junior stops. The poster folder shows a structured monthly rhythm built around repeat club play and a clear seasonal cadence.',
    posterImage: '/tournaments/season/grand-baie-season-poster.jpg',
    supportImage: '/tournaments/season/grand-baie-date-board.jpeg',
    posterHref: '/tournaments/grand-baie-season-poster-2026.pdf',
    accent: '#d4af37',
    stats: ['15 listed season stops', 'M500 major category included', 'Club-first event rhythm'],
    highlights: [
      {
        title: 'Circuit profile',
        items: [
          'More social and community-led than Black River',
          'Regular club rhythm built around repeat participation',
          'Mixed and junior formats keep the calendar accessible',
        ],
      },
      {
        title: 'Format mix',
        items: [
          'M50, M100, M250 and M25 are all present',
          'Mixed stop confirmed on 30 May',
          'Junior stop confirmed on 17 October',
        ],
      },
      {
        title: 'Season notes',
        items: [
          'Season opens on 24 January',
          'M500 is the major Grand Baie category and appears on 19 September',
          'Final stop closes on 5 December',
        ],
      },
    ],
    stops: [
      { date: '24 Jan', category: 'M50', field: 'Men' },
      { date: '07 Feb', category: 'M100', field: 'Men' },
      { date: '07 Mar', category: 'M250', field: 'Men / Women' },
      { date: '04 Apr', category: 'M25', field: 'Men / Women' },
      { date: '02 May', category: 'M50', field: 'Men / Women' },
      { date: '30 May', category: 'Mixed', field: 'Open format' },
      { date: '13 Jun', category: 'M100', field: 'Men / Women' },
      { date: '04 Jul', category: 'M250', field: 'Men / Women' },
      { date: '01 Aug', category: 'M25', field: 'Men / Women' },
      { date: '05 Sep', category: 'M50', field: 'Men / Women' },
      { date: '19 Sep', category: 'M500', field: 'Special stop' },
      { date: '03 Oct', category: 'M100', field: 'Men / Women' },
      { date: '17 Oct', category: 'Junior', field: 'Youth' },
      { date: '21 Nov', category: 'M250', field: 'Men' },
      { date: '05 Dec', category: 'M25', field: 'Men' },
    ],
  },
  {
    slug: 'black-river',
    label: 'Black River Tournaments',
    eyebrow: 'West circuit',
    title: 'Black River 2026 season',
    description:
      'Black River reads as the larger tournament destination in the source folder. The season poster shows a denser competition atmosphere, larger category spread, and a stronger event-day identity across men, mixed, junior, and league moments.',
    posterImage: '/tournaments/season/black-river-season-poster.jpeg',
    supportImage: '/tournaments/season/urban-2026-calendar.jpeg',
    posterHref: '/tournaments/black-river-season-poster-2026.pdf',
    accent: '#d4af37',
    stats: ['15 listed season stops', 'M500 major category included', 'Competition-led venue'],
    highlights: [
      {
        title: 'Circuit profile',
        items: [
          'Reads as the stronger competition-led destination',
          'Broader event-day atmosphere across the season',
          'More explicit tournament identity in the poster set',
        ],
      },
      {
        title: 'Format mix',
        items: [
          'M250, M100, M50 and M25 all recur',
          'Mixed stop confirmed on 21 March',
          'Junior programming appears on 25 July',
        ],
      },
      {
        title: 'Season notes',
        items: [
          'Season opens on 24 January',
          'M500 is the major Black River category and appears on 9 May',
          'Afrasia Bank Padel League poster links to this circuit',
          'December closes with an M100 men / women stop',
        ],
      },
    ],
    stops: [
      { date: '24 Jan', category: 'M250', field: 'Men / Women' },
      { date: '07 Feb', category: 'M25', field: 'Men / Women' },
      { date: '07 Mar', category: 'M50', field: 'Men / Women' },
      { date: '21 Mar', category: 'Mixed', field: 'Open format' },
      { date: '04 Apr', category: 'M100', field: 'Men' },
      { date: '02 May', category: 'M250', field: 'Men' },
      { date: '09 May', category: 'M500', field: 'Special stop' },
      { date: '13 Jun', category: 'M25', field: 'Men / Women' },
      { date: '04 Jul', category: 'M50', field: 'Men' },
      { date: '25 Jul', category: 'Junior', field: 'U11 / U13 / U15' },
      { date: '01 Aug', category: 'M100', field: 'Men / Women' },
      { date: '05 Sep', category: 'M250', field: 'Men / Women' },
      { date: '03 Oct', category: 'M25', field: 'Men' },
      { date: '21 Nov', category: 'M50', field: 'Men / Women' },
      { date: '05 Dec', category: 'M100', field: 'Men / Women' },
    ],
  },
];

export default function TournamentsPage() {
  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Tournament season</div>
            <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Grand Baie and Black River circuits</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">
              The `TOURNAMENT POSTER` folder contains a full 2026 competition system: one annual calendar, one season poster for each club, and a monthly poster sequence for Grand Baie and Black River. This page is now structured around those real source materials instead of generic placeholder cards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#grand-baie" className="btn-shell">Grand Baie Circuit</Link>
              <Link href="#black-river" className="btn-shell">Black River Circuit</Link>
              <Link href="/tournaments/2026-urban-calendar.pdf" className="btn-premium">Open 2026 Calendar</Link>
            </div>
          </div>

          <article className="premium-media-card overflow-hidden">
            <div className="relative h-[420px]">
              <Image src="/tournaments/season/urban-2026-calendar.jpeg" alt="Urban Sport 2026 tournament calendar" fill className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.3)_55%,rgba(0,0,0,0.82))]" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Verified from folder</div>
                <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">2026 Calendar</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                  One master board mapping both clubs, with Grand Baie on the left and Black River on the right.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="page-container pb-20">
        <div className="grid gap-12">
          {CIRCUITS.map((circuit) => (
            <section key={circuit.slug} id={circuit.slug} className="grid gap-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{circuit.label}</div>
                  <h2 className="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-white sm:text-6xl">{circuit.title}</h2>
                </div>
                <Link href={circuit.posterHref} className="btn-premium">Open Season Poster</Link>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <article className="premium-media-card overflow-hidden">
                  <div className="relative h-[560px]">
                    <Image src={circuit.posterImage} alt={`${circuit.label} season poster`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.82))]" />
                  </div>
                </article>

                <div className="grid gap-6">
                  <article className="surface-panel p-6">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{circuit.eyebrow}</div>
                    <p className="mt-4 text-sm leading-8 text-white/64">{circuit.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {circuit.stats.map((item) => (
                        <span key={item} className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/8 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#d4af37]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>

                  <article className="premium-media-card overflow-hidden">
                    <div className="relative h-[250px]">
                      <Image src={circuit.supportImage} alt={`${circuit.label} support board`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.55))]" />
                    </div>
                  </article>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {circuit.highlights.map((item) => (
                  <article key={`${circuit.slug}-${item.title}`} className="surface-panel p-6">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{item.title}</div>
                    <div className="mt-4 grid gap-3">
                      {item.items.map((line) => (
                        <div key={line} className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/66">
                          {line}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <article className="surface-panel p-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">2026 schedule</div>
                    <h3 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-white">Verified from poster files</h3>
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/38">
                    Derived from every `GB` / `BR` filename in the folder
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {circuit.stops.map((stop) => (
                    <div key={`${circuit.slug}-${stop.date}-${stop.category}`} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-white">{stop.date}</div>
                        <span className="rounded-full border border-[#d4af37]/22 bg-[#d4af37]/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
                          {stop.category}
                        </span>
                      </div>
                      <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">{stop.field}</div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

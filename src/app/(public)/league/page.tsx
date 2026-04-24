import Image from 'next/image';
import Link from 'next/link';

const SEASON_PILLARS = [
  {
    title: 'Weekly club play',
    description:
      'The season starts with regular club rhythm: bookings, social sessions, repeat play, and day-to-day activity at Grand Baie and Black River.',
  },
  {
    title: 'Mauritius Padel League context',
    description:
      'Urban Sport sits inside the wider Mauritius Padel League environment shown throughout the season posters, league visuals, and supporting calendar assets present in the project folder.',
  },
  {
    title: 'Tournament formats',
    description:
      'The calendar then expands into M25, M50, M100, M250, Mixed, Junior, and one major M500 category in each club.',
  },
  {
    title: 'Major stops',
    description:
      'The M500 category is the top marker of each circuit. It acts as the main season highlight inside the wider club calendar.',
  },
];

const CLUB_SEASONS = [
  {
    slug: 'grand-baie',
    name: 'Grand Baie',
    role: 'Social club season',
    image: '/tournaments/season/grand-baie-season-poster.jpg',
    summary:
      'Grand Baie keeps a more social and community-driven rhythm, while still carrying a full season structure with mixed, junior, and major-category stops.',
    points: ['15 listed season stops', 'M500 major on 19 September', 'Mixed and junior formats present'],
  },
  {
    slug: 'black-river',
    name: 'Black River',
    role: 'Competition destination season',
    image: '/tournaments/season/black-river-season-poster.jpeg',
    summary:
      'Black River reads as the stronger competition venue, with a denser event atmosphere and a clearer tournament-day identity across the season.',
    points: ['15 listed season stops', 'M500 major on 9 May', 'Afrasia league-linked moment in the poster set'],
  },
];

export default function LeaguePage() {
  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-14">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Season guide</div>
            <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">
              How the Urban Sport season works
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">
              This page is worth keeping only as a guide layer, not as a second tournament archive. Its role is to explain how club play, tournament formats, and major season stops connect across Grand Baie and Black River.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/60">
              It also helps position Urban Sport within the wider Mauritius Padel League structure visible across the poster set, while keeping the clubs as the main point of entry for the player experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/clubs" className="btn-shell">
                Explore Clubs
              </Link>
              <Link href="/tournaments" className="btn-premium">
                Open Tournaments
              </Link>
            </div>
          </div>

          <article className="premium-media-card overflow-hidden">
            <div className="relative h-[420px]">
              <Image src="/tournaments/season/urban-2026-calendar.jpeg" alt="Urban Sport 2026 season calendar" fill className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.82))]" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">2026 season overview</div>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/68">
                  One calendar board shows both clubs side by side. This is the clearest way to read the season as one ecosystem with two distinct venues inside the wider Mauritius Padel League context.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="page-container pb-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {SEASON_PILLARS.map((item) => (
            <article key={item.title} className="surface-panel p-6 lg:p-7">
              <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{item.title}</div>
              <p className="mt-4 text-sm leading-8 text-white/64">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container pb-20">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">By club</div>
          <h2 className="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-white sm:text-6xl">
            Two seasons, one Urban Sport standard
          </h2>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {CLUB_SEASONS.map((club) => (
            <article key={club.slug} className="premium-media-card overflow-hidden">
              <div className="relative h-[420px]">
                <Image src={club.image} alt={`${club.name} season poster`} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.82))]" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{club.role}</div>
                  <h3 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">{club.name}</h3>
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <p className="text-sm leading-8 text-white/64">{club.summary}</p>
                <div className="mt-5 grid gap-3">
                  {club.points.map((point) => (
                    <div key={point} className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/68">
                      {point}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/tournaments" className="btn-shell">
                    View Tournament Structure
                  </Link>
                  <Link href={`/clubs/${club.slug}`} className="btn-premium">
                    Explore {club.name}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { getActiveClubs, getClubDisplayLine } from '@/lib/site-content';

const BEST_FOR: Record<string, string[]> = {
  'grand-baie': ['Social', 'Daily play', 'Community'],
  'black-river': ['Competition', 'Events', 'Destination'],
};

export default async function ClubsPage() {
  const clubs = await getActiveClubs();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Club discovery</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Two club locations</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">
          From social sessions and family meet-ups to regular play, coaching, and event moments, each club brings its own atmosphere to the Urban Sport experience.
        </p>
      </section>

      <section className="page-container grid gap-6 pb-20 lg:grid-cols-2">
        {clubs.map((club) => (
          <article key={club.id} className="premium-media-card group">
            <div className="relative h-96">
              <Image src={club.heroImage} alt={club.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.82))]" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">{club.region}</div>
                <div className="mt-2 font-display text-5xl uppercase tracking-[0.12em] text-white">{club.name.replace('Urban Sport ', '')}</div>
                <div className="mt-3 inline-flex rounded-full border border-white/12 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/76">
                  {getClubDisplayLine(club)}
                </div>
              </div>
            </div>
            <div className="grid gap-4 p-6">
              <p className="text-sm leading-7 text-white/58">{club.shortDescription}</p>
              <div className="text-xs uppercase tracking-[0.18em] text-[#d4af37]">Best for</div>
              <div className="flex flex-wrap gap-2">
                {BEST_FOR[club.slug]?.map((item) => (
                  <span key={item} className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/8 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#d4af37]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {club.highlights.slice(0, 3).map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Link href={`/clubs/${club.slug}`} className="btn-shell justify-center">Explore Club</Link>
                <Link href="/booking" className="btn-premium justify-center">Book Now</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

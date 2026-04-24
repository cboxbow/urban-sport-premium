import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClubDetail, getClubDisplayLine, getCoachingPageData } from '@/lib/site-content';

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ club, clubTournaments }, coaching] = await Promise.all([getClubDetail(slug), getCoachingPageData()]);

  if (!club) notFound();

  const coachingAvailable = coaching.locations.some((location) => club.name.toLowerCase().includes(location.toLowerCase()) || club.region.toLowerCase().includes(location.toLowerCase()));

  return (
    <div className="bg-black pt-24 text-white">
      <section className="page-container grid gap-8 py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/8">
          <div className="relative h-[520px]">
            <Image src={club.heroImage} alt={club.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{club.region}</div>
              <h1 className="mt-3 font-display text-6xl uppercase tracking-[0.1em] sm:text-8xl">{club.name.replace('Urban Sport ', '')}</h1>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/55">{getClubDisplayLine(club)}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Club brief</div>
            <p className="mt-4 text-sm leading-7 text-white/62">{club.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {club.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/52">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d4af37]/30 bg-[#d4af37]/10 p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Contact</div>
            <div className="mt-4 text-3xl font-semibold text-white">{club.phone}</div>
            <p className="mt-2 text-sm text-white/66">{club.address}</p>
            <p className="mt-4 text-sm leading-7 text-white/68">{club.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/booking" className="btn-premium">Launch booking request</Link>
              <Link href="/events" className="btn-shell">Plan an event</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container grid gap-6 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Coaching availability</div>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white">{coachingAvailable ? 'Available at this club' : 'Available across the network'}</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">{coaching.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {coaching.whatToExpect.slice(0, 5).map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/52">
                {item}
              </span>
            ))}
          </div>
          <Link href="/coaching" className="btn-shell mt-6 inline-flex">Explore coaching</Link>
        </div>

        <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Upcoming tournaments</div>
          <div className="mt-5 grid gap-4">
            {clubTournaments.slice(0, 4).map((tournament) => (
              <Link key={tournament.id} href={`/tournaments/${tournament.slug}`} className="rounded-[1.25rem] border border-white/8 px-4 py-4 transition-colors hover:border-[#d4af37]/30">
                <div className="text-lg font-semibold text-white">{tournament.title}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/42">{tournament.date}</div>
              </Link>
            ))}
            {clubTournaments.length === 0 && (
              <div className="rounded-[1.25rem] border border-white/8 px-4 py-4 text-sm text-white/60">
                Tournament storytelling is managed from the archive and upcoming entries in the admin panel.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="page-container pb-20">
        <div className="mb-6 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Gallery</div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {club.galleryImages.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[2rem] border border-white/8">
              <div className="relative h-72">
                <Image src={image} alt={`${club.name} gallery ${index + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTournamentDetail } from '@/lib/site-content';

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { tournament, club } = await getTournamentDetail(slug);

  if (!tournament) notFound();

  return (
    <div className="bg-black pt-24 text-white">
      <section className="page-container grid gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/8">
          <div className="relative h-[540px]">
            <Image src={tournament.coverImage} alt={tournament.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">{club?.name ?? tournament.clubSlug}</div>
              <h1 className="mt-3 font-display text-6xl uppercase tracking-[0.1em] sm:text-8xl">{tournament.title}</h1>
              <div className="mt-3 text-sm uppercase tracking-[0.18em] text-white/58">{tournament.date} | {tournament.category}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Event overview</div>
            <p className="mt-4 text-sm leading-7 text-white/62">{tournament.summary}</p>
            <div className="mt-5 grid gap-3">
              {!!tournament.posterFile && <Link href={tournament.posterFile} className="btn-shell">Download poster</Link>}
              {!!tournament.archiveFile && <Link href={tournament.archiveFile} className="btn-shell">Open archive file</Link>}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ffb300]/30 bg-[#ffb300]/10 p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Tournament status</div>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Status: <span className="text-white">{tournament.status}</span>. Tournament entries and poster assets are managed locally from the admin panel in this edition.
            </p>
            <Link href="/events" className="btn-premium mt-6 inline-flex">Request tournament information</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

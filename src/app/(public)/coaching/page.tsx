import Image from 'next/image';
import Link from 'next/link';
import { getCoachingPageData } from '@/lib/site-content';

export default async function CoachingPage() {
  const coaching = await getCoachingPageData();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container grid gap-8 pb-12 lg:grid-cols-[1fr_0.92fr]">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Coaching</div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-[0.08em] text-white sm:text-6xl xl:text-7xl">
            Academy-backed progression
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{coaching.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {coaching.locations.map((location) => (
              <span key={location} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/62">
                {location}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-[#d4af37]/25 bg-[#d4af37]/8 p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{coaching.partnerLabel}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{coaching.contactName} | {coaching.contactPhone}</div>
            <Link href="/booking" className="btn-premium mt-6 inline-flex">Book session</Link>
          </div>
        </div>

        <div className="surface-panel overflow-hidden p-4 sm:p-5">
          <div className="relative h-[560px] rounded-[1.5rem] bg-black">
            <div className="absolute left-5 top-5 z-10 rounded-full border border-[#d4af37]/30 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#d4af37] backdrop-blur-md">
              Coach with Sam
            </div>
            <video
              className="h-full w-full rounded-[1.5rem] object-cover"
              autoPlay
              loop
              playsInline
              controls
              preload="metadata"
              poster={coaching.heroImage}
            >
              <source src="/videos/urban-coaching.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="page-container pb-12">
        <div className="surface-panel p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">What to expect</div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {coaching.whatToExpect.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {coaching.coaches.length > 0 && (
        <section className="page-container pb-12">
          <div className="mb-6 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Coaches</div>
          <div className="grid gap-6 lg:grid-cols-2">
            {coaching.coaches.map((coach) => (
              <article key={coach.id} className="premium-media-card overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="border-b border-white/8 bg-black lg:border-b-0 lg:border-r">
                    <div className="relative h-[360px] sm:h-[420px]">
                      <Image src={coach.image} alt={coach.name} fill className="object-contain p-5" />
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">{coach.location}</div>
                    <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">{coach.name}</h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">{coach.tagline}</p>
                    <div className="mt-6 rounded-[1.25rem] border border-[#d4af37]/25 bg-[#d4af37]/8 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#d4af37]">Direct contact</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{coach.phone}</div>
                    </div>
                    <Link href="/booking" className="btn-premium mt-6 inline-flex">Book with {coach.name}</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="page-container grid gap-6 pb-20">
        {coaching.levels.map((level) => (
          <article key={level.id} className="premium-media-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-white/8 bg-black lg:border-b-0 lg:border-r">
                <div className="relative h-[320px] sm:h-[360px]">
                  <Image src={level.image} alt={level.title} fill className="object-contain p-5" />
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">{level.levelRange}</div>
                <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">{level.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{level.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {level.focusPoints.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/55">
                      {item}
                    </span>
                  ))}
                </div>
                <Link href={level.ctaHref} className="btn-premium mt-6 inline-flex">{level.ctaLabel}</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

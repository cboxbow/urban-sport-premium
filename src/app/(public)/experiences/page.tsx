import Image from 'next/image';
import Link from 'next/link';
import { getExperiencesPageData } from '@/lib/site-content';

export default async function ExperiencesPage() {
  const experiences = await getExperiencesPageData();
  const ghostPadel = experiences.items.find((item) => item.id === 'experience-ghost-padel');
  const kidsBirthday = experiences.items.find((item) => item.id === 'experience-kids-birthday');
  const privateEvents = experiences.items.find((item) => item.id === 'experience-private-events');

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Experiences</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Club experiences</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">{experiences.intro}</p>
      </section>

      <section className="page-container grid gap-6 pb-16 lg:grid-cols-2">
        {[ghostPadel, kidsBirthday].filter(Boolean).map((item) => (
          <article key={item!.id} className="surface-panel overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-white/8 bg-black md:border-b-0 md:border-r">
                <div className="relative h-[340px]">
                  <Image src={item!.image} alt={item!.title} fill className="object-contain p-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">{item!.shortLabel}</div>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl">{item!.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{item!.description}</p>
                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/72">{item!.location}</div>
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/72">{item!.timeLabel}</div>
                  <div className="rounded-[1.25rem] border border-[#d4af37]/25 bg-[#d4af37]/8 px-4 py-4 text-sm text-white">{item!.priceLabel}</div>
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/72">{item!.contactLabel}</div>
                </div>
                <Link href={item!.ctaHref} className="btn-premium mt-6 inline-flex">{item!.ctaLabel}</Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {privateEvents && (
        <section className="border-y border-white/8 bg-white/[0.02] py-20">
          <div className="page-container">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Host your event at Urban Sport</div>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.08em] sm:text-5xl">Club-based event formats</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">{privateEvents.description}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="surface-panel overflow-hidden p-0">
                <div className="border-b border-white/8 bg-black px-5 py-5">
                  <div className="relative h-[280px]">
                    <Image src="/clubs/grand-baie/grand-baie-aerial.jpeg" alt="Grand Baie events" fill className="object-cover" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Grand Baie Events</div>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-white">Smaller and social</h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    Better suited to birthdays, casual gatherings, club socials, and lighter private formats with a more accessible day-to-day feel.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Birthdays', 'Casual socials', 'Smaller private groups'].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/55">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              <article className="surface-panel overflow-hidden p-0">
                <div className="border-b border-white/8 bg-black px-5 py-5">
                  <div className="relative h-[280px]">
                    <Image src="/clubs/black-river/urban-black-river.jpeg" alt="Black River events" fill className="object-cover" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Black River Events</div>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-white">Larger and event-led</h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    Better suited to corporate sessions, brand activations, tournament-linked hospitality, and larger group formats with a stronger destination feel.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Corporate', 'Brand activations', 'Larger groups'].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/55">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn-premium">Open Event Inquiry</Link>
              <Link href="/clubs" className="btn-shell">Compare Clubs</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

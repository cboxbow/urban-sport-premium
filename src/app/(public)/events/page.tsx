import EventInquiryForm from '@/app/(public)/events/EventInquiryForm';
import { getEventsPageData } from '@/lib/site-content';

export default async function EventsPage() {
  const events = await getEventsPageData();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Events and corporate</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Host club events</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">{events.intro}</p>
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-3">
        {events.eventTypes.map((item) => (
          <article key={item.id} className="surface-panel p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">{item.title}</div>
            <p className="mt-4 text-sm leading-7 text-white/58">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Why Urban Sport</div>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">Event value</h2>
          <div className="mt-6 grid gap-3">
            {events.benefits.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/70">{item}</div>
            ))}
          </div>
        </div>
        <div className="surface-panel p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Inquiry form</div>
          <p className="mt-4 text-sm leading-7 text-white/60">{events.formIntro}</p>
          <div className="mt-6">
            <EventInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}

import { getSponsorsPageData } from '@/lib/site-content';

export default async function SponsorsPage() {
  const sponsors = await getSponsorsPageData();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Sponsor ecosystem</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Partners</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">{sponsors.intro}</p>
      </section>

      <section className="page-container grid gap-4 pb-12 md:grid-cols-4">
        {sponsors.metrics.map((item) => (
          <div key={item.label} className="surface-panel p-5">
            <div className="font-display text-5xl uppercase tracking-[0.1em] text-[#ffb300]">{item.value}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/48">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-3">
        {sponsors.tiers.map((tier, index) => (
          <div key={tier.id} className={index === 0 ? 'rounded-[2rem] border border-[#ffb300]/30 bg-[#ffb300]/10 p-6' : 'surface-panel p-6'}>
            <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">{tier.name}</div>
            <p className="mt-4 text-sm leading-7 text-white/58">{tier.description}</p>
          </div>
        ))}
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Current partners</div>
          <div className="mt-5 flex flex-wrap gap-3">
            {sponsors.partners.map((partner) => (
              <div key={partner.id} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/62">
                {partner.name}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#ffb300]/30 bg-[#ffb300]/10 p-8">
          <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Become a partner</div>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">{sponsors.featureHeading}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{sponsors.featureCopy}</p>
        </div>
      </section>
    </div>
  );
}

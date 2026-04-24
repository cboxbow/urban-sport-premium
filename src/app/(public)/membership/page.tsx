import Image from 'next/image';
import Link from 'next/link';

const APPLE_STORE_URL = 'https://apps.apple.com/kg/app/urban-sport-mauritius/id1628008644';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.smartappmu.urbansport';

const COURT_RATES = [
  { label: '60 min', value: 'Rs 1600 per court' },
  { label: '90 min', value: 'Rs 2200 per court' },
  { label: 'Rental racket', value: 'Rs 250 each' },
];

const PACKAGES = [
  {
    name: 'Single Package',
    price: 'Rs 3900 monthly',
    details: ['Unlimited games per week'],
  },
  {
    name: 'Family Package',
    price: 'Rs 4900 monthly',
    details: ['Unlimited games per week', 'Limited to spouse and kids under 18'],
  },
];

const YEARLY = [
  { label: 'Yearly single', value: 'Rs 39,000' },
  { label: 'Yearly family', value: 'Rs 49,000' },
];

export default function MembershipPage() {
  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-12">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Pricing</div>
            <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Court rates and club packages</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              This page is based directly on the Urban Sport `pricing.jpeg` board found in the project folder. It brings together court hire, monthly packages, yearly formulas, and the current booking direction shown on the original visual.
            </p>

            <div className="mt-8 grid gap-4">
              <article className="surface-panel p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">Court hire</div>
                <div className="mt-5 grid gap-3">
                  {COURT_RATES.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <div className="text-sm uppercase tracking-[0.16em] text-white/55">{item.label}</div>
                      <div className="text-lg font-semibold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-[#ffb300]/25 bg-[#ffb300]/8 p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">Weekend advantage</div>
                <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">Half price on weekends</h2>
                <p className="mt-4 text-sm leading-7 text-white/66">
                  The pricing board explicitly highlights a weekend offer: half price on weekends / moitie prix le week-end.
                </p>
              </article>
            </div>
          </div>

          <article className="premium-media-card overflow-hidden xl:sticky xl:top-32">
            <div className="border-b border-white/8 bg-black/40 px-5 py-5">
              <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">Original pricing board</div>
            </div>
            <div className="relative h-[520px] bg-black sm:h-[560px] xl:h-[620px]">
              <Image src="/pricing.jpeg" alt="Urban Sport pricing board" fill className="object-contain object-top p-4 sm:p-5" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.28))]" />
            </div>
          </article>
        </div>
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-2">
        {PACKAGES.map((plan) => (
          <article key={plan.name} className="surface-panel p-6 lg:p-7">
            <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">{plan.name}</div>
            <div className="mt-4 font-display text-4xl uppercase tracking-[0.06em] text-white sm:text-5xl">{plan.price}</div>
            <div className="mt-5 grid gap-3">
              {plan.details.map((detail) => (
                <div key={detail} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/70">
                  {detail}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="page-container grid gap-6 pb-12 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="surface-panel p-6 lg:p-7">
          <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">Yearly formulas</div>
          <div className="mt-5 grid gap-3">
            {YEARLY.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="text-sm uppercase tracking-[0.16em] text-white/55">{item.label}</div>
                <div className="text-xl font-semibold text-[#ffb300]">{item.value}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-panel p-6 lg:p-7">
          <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">Club contacts</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-xs uppercase tracking-[0.16em] text-white/42">Grand Baie</div>
              <div className="mt-3 text-3xl font-semibold text-white">268 2942</div>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-xs uppercase tracking-[0.16em] text-white/42">Black River</div>
              <div className="mt-3 text-3xl font-semibold text-white">484 5336</div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-[#ffb300]/22 bg-[#ffb300]/8 p-5">
            <div className="text-xs uppercase tracking-[0.16em] text-[#ffb300]">Booking access</div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              The pricing board specifies booking on the mobile application: Urban Sport Mauritius.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={APPLE_STORE_URL} target="_blank" rel="noreferrer" className="btn-premium">
                App Store
              </Link>
              <Link href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" className="btn-shell">
                Google Play
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

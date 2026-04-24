import Link from 'next/link';

const APPLE_STORE_URL = 'https://apps.apple.com/kg/app/urban-sport-mauritius/id1628008644';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.smartappmu.urbansport';

export default function BookingPage() {
  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Booking access</div>
          <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-7xl">Book Through The Urban Sport App</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
            Download the official Urban Sport Mauritius app to book courts in Grand Baie and Black River, manage your sessions, and access the club calendar directly.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <article className="surface-panel p-8 text-center">
            <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">iPhone</div>
            <h2 className="mt-4 font-home-display text-4xl uppercase tracking-[0.05em] text-white">App Store</h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Open the App Store and download the Urban Sport Mauritius app on iPhone.
            </p>
            <Link
              href={APPLE_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-premium mt-8 inline-flex"
            >
              Open App Store
            </Link>
          </article>

          <article className="surface-panel p-8 text-center">
            <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Android</div>
            <h2 className="mt-4 font-home-display text-4xl uppercase tracking-[0.05em] text-white">Google Play</h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Download the Urban Sport Mauritius app on Android and book directly from Google Play.
            </p>
            <Link
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-premium mt-8 inline-flex"
            >
              Open Google Play
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-20">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#ffb300]/30 bg-[#ffb300]/10 p-8 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Request received</div>
          <h1 className="mt-4 font-display text-6xl uppercase tracking-[0.1em] text-white">We&apos;ll confirm your session</h1>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Your preferred club, date, and slot have been saved to the local admin system. The Urban Sport team will contact you directly to confirm the final booking details.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="btn-shell">Send another request</Link>
            <Link href="/" className="btn-premium">Back to home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

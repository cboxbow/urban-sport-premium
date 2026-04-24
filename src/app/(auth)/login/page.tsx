import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.88),rgba(0,0,0,0.97))]" />

      <div className="surface-panel relative z-10 flex w-full max-w-xl flex-col items-center px-6 py-8 text-center sm:px-8 sm:py-10">
        <Image
          src="/logos/urban-sport-primary-dark.png"
          alt="Urban Sport"
          width={260}
          height={64}
          className="h-12 w-auto"
          priority
        />

        <div className="mt-6 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Private access</div>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-white sm:text-4xl">
          Club management access
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/62">
          This entry point is reserved for the local admin area used to manage pages, images, tournaments, memberships, and booking requests.
        </p>

        <div className="mt-8 grid w-full gap-3">
          <Link href="/admin/login" className="btn-premium w-full justify-center">
            Open Admin Login
          </Link>
          <Link href="/clubs" className="btn-shell w-full justify-center">
            Return to Clubs
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/membership" className="text-white/56 transition-colors hover:text-white">
            Membership
          </Link>
          <Link href="/events" className="text-white/56 transition-colors hover:text-white">
            Events
          </Link>
          <Link href="/booking" className="text-white/56 transition-colors hover:text-white">
            Booking
          </Link>
        </div>
      </div>
    </div>
  );
}

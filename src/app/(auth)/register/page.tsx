import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/8 bg-white/[0.03] p-8">
        <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Access requests</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.1em]">Private Access</h1>
        <p className="mt-5 text-sm leading-7 text-white/60">
          Public self-registration is not active in this local-admin edition. For club access, memberships, or event participation, contact Urban Sport directly.
        </p>
        <div className="mt-6 grid gap-3">
          <Link href="/events" className="btn-premium w-full justify-center">Contact Urban Sport</Link>
          <Link href="/membership" className="btn-shell w-full justify-center">View memberships</Link>
        </div>
      </div>
    </div>
  );
}

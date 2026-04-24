import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-25"
          style={{
            background:
              'radial-gradient(ellipse, rgba(201,168,76,0.45) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Back link */}
      <div className="w-full max-w-md mb-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-gold-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>
      </div>

      {/* Logo */}
      <div className="mb-8 text-center relative z-10">
        <Link href="/" className="inline-block group">
          <div className="flex items-baseline gap-1.5 justify-center">
            <span className="font-display text-3xl tracking-[0.2em] text-gold-400">URBAN</span>
            <span className="font-display text-3xl tracking-[0.2em] text-white">SPORT</span>
          </div>
        </Link>
        <div className="gold-line mt-3 max-w-[120px] mx-auto" />
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}

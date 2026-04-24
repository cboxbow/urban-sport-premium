import Link from 'next/link';
import GalleryShowcase from '@/components/gallery/GalleryShowcase';
import { getPublishedGallery } from '@/lib/site-content';
import { cn } from '@/lib/utils';

const FILTERS = [
  { value: 'clubs', label: 'Clubs' },
  { value: 'events', label: 'Events' },
  { value: 'campaigns', label: 'Campaigns' },
] as const;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filter = typeof params.filter === 'string' ? params.filter : 'clubs';
  const items = await getPublishedGallery(filter as 'all' | 'clubs' | 'events' | 'campaigns');

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">Gallery</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] sm:text-6xl">Clubs first</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">
          Club visuals come first, followed by event storytelling, then campaign material. The gallery stays structured and avoids poster overload.
        </p>
      </section>

      <div className="page-container flex flex-wrap gap-3 pb-8">
        {FILTERS.map((item) => (
          <Link
            key={item.value}
            href={`/gallery?filter=${item.value}`}
            className={cn(
              'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em]',
              filter === item.value ? 'border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]' : 'border-white/10 text-white/48'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <GalleryShowcase items={items} />
    </div>
  );
}

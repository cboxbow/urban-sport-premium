'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useState } from 'react';
import type { GalleryItem } from '@/lib/content/types';

export default function GalleryShowcase({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <section className="page-container grid gap-6 pb-20 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="premium-media-card group cursor-pointer overflow-hidden"
            onClick={() => setActive(item)}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[#ffb300]">{item.category}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-white/66">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {active && (
        <div className="glass-overlay fixed inset-0 z-[70] flex items-center justify-center bg-black/88 p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white"
            onClick={() => setActive(null)}
            aria-label="Close gallery modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="surface-panel relative w-full max-w-6xl overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[360px] lg:min-h-[680px]">
                <Image src={active.image} alt={active.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-end p-6 lg:p-10">
                <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">{active.category}</div>
                <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">
                  {active.title}
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/68">{active.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

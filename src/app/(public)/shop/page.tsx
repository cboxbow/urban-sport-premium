import Image from 'next/image';
import Link from 'next/link';
import { getShopPageData } from '@/lib/site-content';

export default async function ShopPage() {
  const shop = await getShopPageData();

  return (
    <div className="bg-black pt-28 text-white">
      <section className="page-container pb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Shop</div>
        <h1 className="mt-4 font-display text-6xl uppercase tracking-[0.1em] sm:text-8xl">Club apparel</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">{shop.intro}</p>
      </section>

      <section className="page-container grid gap-6 pb-20">
        {shop.items.map((item) => (
          <article key={item.id} className="premium-media-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[420px]">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.88))]" />
              </div>
              <div className="p-6 lg:p-8">
                <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Featured product</div>
                <h2 className="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-white">{item.name}</h2>
                <div className="mt-4 text-3xl font-semibold text-white">{item.price}</div>
                <p className="mt-4 text-sm leading-7 text-white/60">{item.description}</p>
                <div className="mt-5 rounded-[1.5rem] border border-[#ffb300]/25 bg-[#ffb300]/8 p-4 text-sm text-white/74">
                  {item.customization}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/56">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-white/60">{shop.orderIntro}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={shop.whatsappOrderLink} className="btn-premium">{item.orderChannel}</a>
                  <Link href="/gallery?filter=campaigns" className="btn-shell">View campaign visuals</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

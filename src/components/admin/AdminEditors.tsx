'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  ClubContent,
  CoachingContent,
  EventsContent,
  ExperiencesContent,
  GalleryItem,
  HomepageContent,
  LeagueContent,
  MembershipPlan,
  ShopContent,
  SiteSettings,
  SponsorsContent,
  TournamentContent,
} from '@/lib/content/types';
import { cn, slugify } from '@/lib/utils';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

async function saveContent<T>(key: string, data: T) {
  const response = await fetch(`/api/admin/content/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Unable to save content');
  }

  return response.json();
}

async function uploadAsset(file: File, folder: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.path as string;
}

function SaveBar({ state, onSave, label = 'Save changes' }: { state: SaveState; onSave: () => Promise<void>; label?: string }) {
  return (
    <div className="sticky bottom-4 z-20 mt-8 flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/85 px-5 py-4 backdrop-blur-xl">
      <div className="text-sm text-white/60">
        {state === 'saved' && 'Saved locally'}
        {state === 'saving' && 'Saving content...'}
        {state === 'error' && 'Save failed, please try again'}
        {state === 'idle' && 'Changes stay local to this project'}
      </div>
      <button onClick={onSave} className="btn-premium" disabled={state === 'saving'}>
        {label}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-panel p-6">
      <h2 className="font-display text-4xl uppercase tracking-[0.08em] text-white">{title}</h2>
      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="field-label">{label}</span>
      {textarea ? (
        <textarea className="field-input min-h-[120px]" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="field-input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

function StringListEditor({ label, items, onChange, addLabel = 'Add item' }: { label: string; items: string[]; onChange: (items: string[]) => void; addLabel?: string }) {
  return (
    <div className="grid gap-3">
      <div className="field-label">{label}</div>
      {items.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-3">
          <input
            className="field-input"
            value={item}
            onChange={(e) => onChange(items.map((current, currentIndex) => (currentIndex === index ? e.target.value : current)))}
          />
          <button
            type="button"
            className="btn-shell"
            onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-shell w-fit" onClick={() => onChange([...items, ''])}>
        {addLabel}
      </button>
    </div>
  );
}

function AssetField({
  label,
  value,
  folder,
  onChange,
}: {
  label: string;
  value: string;
  folder: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="grid gap-3">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-shell cursor-pointer">
          {uploading ? 'Uploading...' : 'Upload file'}
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const path = await uploadAsset(file, folder);
                onChange(path);
              } finally {
                setUploading(false);
              }
            }}
          />
        </label>
        {value && <span className="text-sm text-white/50">{value}</span>}
      </div>
      {value && /\.(png|jpe?g|webp|gif|svg)$/i.test(value) && (
        <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-3">
          <img src={value} alt={label} className="max-h-48 w-full rounded-[1rem] object-cover" />
        </div>
      )}
    </div>
  );
}

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_24%)]" />
      <div className="surface-panel relative z-10 w-full max-w-md p-8">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Urban Sport Admin</div>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-white">Login</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">Protected local admin access for content, media, and booking requests.</p>
        <div className="mt-6 grid gap-4">
          <Field label="Admin email" value={email} onChange={setEmail} />
          <label className="grid gap-2">
            <span className="field-label">Password</span>
            <input className="field-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        {error && <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
        <button
          className="btn-premium mt-6 w-full justify-center"
          onClick={async () => {
            setLoading(true);
            setError('');
            const response = await fetch('/api/admin/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            });
            setLoading(false);
            if (!response.ok) {
              setError('Invalid admin credentials');
              return;
            }
            router.push('/admin');
            router.refresh();
          }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Enter admin'}
        </button>
      </div>
    </div>
  );
}

export function HomepageEditor({ initialData }: { initialData: HomepageContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Hero">
        <Field label="Badge" value={data.hero.badge} onChange={(value) => setData({ ...data, hero: { ...data.hero, badge: value } })} />
        <Field label="Title" value={data.hero.title} onChange={(value) => setData({ ...data, hero: { ...data.hero, title: value } })} />
        <Field label="Subtitle" value={data.hero.subtitle} onChange={(value) => setData({ ...data, hero: { ...data.hero, subtitle: value } })} textarea />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Primary CTA label" value={data.hero.primaryCtaLabel} onChange={(value) => setData({ ...data, hero: { ...data.hero, primaryCtaLabel: value } })} />
          <Field label="Primary CTA link" value={data.hero.primaryCtaHref} onChange={(value) => setData({ ...data, hero: { ...data.hero, primaryCtaHref: value } })} />
          <Field label="Secondary CTA label" value={data.hero.secondaryCtaLabel} onChange={(value) => setData({ ...data, hero: { ...data.hero, secondaryCtaLabel: value } })} />
          <Field label="Secondary CTA link" value={data.hero.secondaryCtaHref} onChange={(value) => setData({ ...data, hero: { ...data.hero, secondaryCtaHref: value } })} />
        </div>
      </Section>

      <Section title="Stats">
        {data.stats.map((item, index) => (
          <div key={`stat-${index}`} className="grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[0.4fr_1fr_auto]">
            <Field label="Value" value={item.value} onChange={(value) => setData({ ...data, stats: data.stats.map((current, currentIndex) => (currentIndex === index ? { ...current, value } : current)) })} />
            <Field label="Label" value={item.label} onChange={(value) => setData({ ...data, stats: data.stats.map((current, currentIndex) => (currentIndex === index ? { ...current, label: value } : current)) })} />
            <button className="btn-shell self-end" onClick={() => setData({ ...data, stats: data.stats.filter((_, currentIndex) => currentIndex !== index) })}>
              Remove
            </button>
          </div>
        ))}
        <button className="btn-shell w-fit" onClick={() => setData({ ...data, stats: [...data.stats, { value: '', label: '' }] })}>
          Add stat
        </button>
      </Section>

      <Section title="Featured blocks">
        {data.featuredBlocks.map((item, index) => (
          <div key={`block-${index}`} className="grid gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <Field label="Eyebrow" value={item.eyebrow} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, eyebrow: value } : current)) })} />
            <Field label="Title" value={item.title} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, title: value } : current)) })} />
            <Field label="Meta" value={item.meta} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, meta: value } : current)) })} />
            <Field label="Description" value={item.description} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, description: value } : current)) })} textarea />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CTA label" value={item.ctaLabel} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, ctaLabel: value } : current)) })} />
              <Field label="CTA link" value={item.ctaHref} onChange={(value) => setData({ ...data, featuredBlocks: data.featuredBlocks.map((current, currentIndex) => (currentIndex === index ? { ...current, ctaHref: value } : current)) })} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Section visibility">
        <Toggle label="Show booking section" checked={data.sectionToggles.showBooking} onChange={(checked) => setData({ ...data, sectionToggles: { ...data.sectionToggles, showBooking: checked } })} />
        <Toggle label="Show clubs section" checked={data.sectionToggles.showClubs} onChange={(checked) => setData({ ...data, sectionToggles: { ...data.sectionToggles, showClubs: checked } })} />
        <Toggle label="Show tournaments section" checked={data.sectionToggles.showTournaments} onChange={(checked) => setData({ ...data, sectionToggles: { ...data.sectionToggles, showTournaments: checked } })} />
        <Toggle label="Show rankings section" checked={data.sectionToggles.showRankings} onChange={(checked) => setData({ ...data, sectionToggles: { ...data.sectionToggles, showRankings: checked } })} />
        <Toggle label="Show sponsors section" checked={data.sectionToggles.showSponsors} onChange={(checked) => setData({ ...data, sectionToggles: { ...data.sectionToggles, showSponsors: checked } })} />
      </Section>

      <SaveBar
        state={state}
        onSave={async () => {
          setState('saving');
          try {
            await saveContent('homepage', data);
            setState('saved');
          } catch {
            setState('error');
          }
        }}
      />
    </div>
  );
}

export function ClubsEditor({ initialData }: { initialData: ClubContent[] }) {
  const [clubs, setClubs] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      {clubs.map((club, index) => (
        <Section key={club.id} title={club.name}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={club.name} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, name: value } : current)))} />
            <Field label="Slug" value={club.slug} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, slug: slugify(value) } : current)))} />
            <Field label="Region" value={club.region} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, region: value } : current)))} />
            <Field label="Phone" value={club.phone} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, phone: value } : current)))} />
            <Field label="Address" value={club.address} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, address: value } : current)))} />
            <Field label="Short description" value={club.shortDescription} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, shortDescription: value } : current)))} />
            <Field label="Court count" value={String(club.courtCount)} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, courtCount: Number(value || 0) } : current)))} />
            <Field label="Foot five count" value={String(club.footFiveCount)} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, footFiveCount: Number(value || 0) } : current)))} />
          </div>
          <Field label="Description" value={club.description} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, description: value } : current)))} textarea />
          <AssetField label="Hero image" value={club.heroImage} folder="clubs" onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, heroImage: value } : current)))} />
          <StringListEditor label="Highlights" items={club.highlights} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, highlights: value } : current)))} />
          <StringListEditor label="Gallery images" items={club.galleryImages} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, galleryImages: value } : current)))} addLabel="Add gallery image path" />
          <StringListEditor label="Tags" items={club.tags} onChange={(value) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, tags: value } : current)))} addLabel="Add tag" />
          <Toggle label="Active club" checked={club.isActive} onChange={(checked) => setClubs(clubs.map((current, currentIndex) => (currentIndex === index ? { ...current, isActive: checked } : current)))} />
        </Section>
      ))}

      <SaveBar
        state={state}
        onSave={async () => {
          setState('saving');
          try {
            await saveContent('clubs', clubs);
            setState('saved');
          } catch {
            setState('error');
          }
        }}
      />
    </div>
  );
}

export function TournamentsEditor({ initialData, clubs }: { initialData: TournamentContent[]; clubs: ClubContent[] }) {
  const [items, setItems] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <button
        className="btn-shell w-fit"
        onClick={() =>
          setItems([
            {
              id: `tournament-${Date.now()}`,
              title: 'New Tournament',
              slug: `new-tournament-${Date.now()}`,
              clubSlug: clubs[0]?.slug ?? 'grand-baie',
              category: 'Mixed',
              genderLabel: 'Mixed',
              status: 'upcoming',
              date: '',
              month: '',
              year: new Date().getFullYear(),
              summary: '',
              coverImage: '',
              posterFile: '',
              archiveFile: '',
              tags: [],
              isPublished: false,
              isFeatured: false,
            },
            ...items,
          ])
        }
      >
        Add tournament
      </button>

      {items.map((item, index) => (
        <Section key={item.id} title={item.title}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={item.title} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, title: value, slug: slugify(value) } : current)))} />
            <Field label="Slug" value={item.slug} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, slug: slugify(value) } : current)))} />
            <label className="grid gap-2">
              <span className="field-label">Club</span>
              <select className="field-input" value={item.clubSlug} onChange={(e) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, clubSlug: e.target.value } : current)))}>
                {clubs.map((club) => (
                  <option key={club.slug} value={club.slug}>
                    {club.name}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Category" value={item.category} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, category: value } : current)))} />
            <Field label="Gender label" value={item.genderLabel} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, genderLabel: value } : current)))} />
            <Field label="Date" value={item.date} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, date: value, month: value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'long' }) : current.month, year: value ? new Date(`${value}T00:00:00`).getFullYear() : current.year } : current)))} />
            <Field label="Month" value={item.month} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, month: value } : current)))} />
            <Field label="Year" value={String(item.year)} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, year: Number(value || new Date().getFullYear()) } : current)))} />
            <label className="grid gap-2">
              <span className="field-label">Status</span>
              <select className="field-input" value={item.status} onChange={(e) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, status: e.target.value as TournamentContent['status'] } : current)))}>
                {['open', 'upcoming', 'archive', 'closed'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Field label="Summary" value={item.summary} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, summary: value } : current)))} textarea />
          <AssetField label="Cover image" value={item.coverImage} folder="tournaments" onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, coverImage: value } : current)))} />
          <AssetField label="Poster file" value={item.posterFile} folder="tournaments" onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, posterFile: value } : current)))} />
          <AssetField label="Archive file" value={item.archiveFile} folder="tournaments" onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, archiveFile: value } : current)))} />
          <StringListEditor label="Tags" items={item.tags} onChange={(value) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, tags: value } : current)))} />
          <div className="grid gap-4 md:grid-cols-3">
            <Toggle label="Published" checked={item.isPublished} onChange={(checked) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, isPublished: checked } : current)))} />
            <Toggle label="Featured" checked={item.isFeatured} onChange={(checked) => setItems(items.map((current, currentIndex) => (currentIndex === index ? { ...current, isFeatured: checked } : current)))} />
            <button className="btn-shell" onClick={() => window.confirm('Delete this tournament?') && setItems(items.filter((_, currentIndex) => currentIndex !== index))}>
              Delete tournament
            </button>
          </div>
        </Section>
      ))}

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('tournaments', items);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function GalleryEditor({ initialData }: { initialData: GalleryItem[] }) {
  const [items, setItems] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <button className="btn-shell w-fit" onClick={() => setItems([{ id: `gallery-${Date.now()}`, title: 'New gallery item', category: 'clubs', image: '', description: '', clubSlug: null, tournamentSlug: null, isPublished: false, isFeatured: false }, ...items])}>
        Add gallery item
      </button>
      {items.map((item, index) => (
        <Section key={item.id} title={item.title}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={item.title} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, title: value } : current))} />
            <Field label="Category" value={item.category} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, category: value } : current))} />
            <Field label="Club slug (optional)" value={item.clubSlug ?? ''} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, clubSlug: value || null } : current))} />
            <Field label="Tournament slug (optional)" value={item.tournamentSlug ?? ''} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, tournamentSlug: value || null } : current))} />
          </div>
          <Field label="Description" value={item.description} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current))} textarea />
          <AssetField label="Image" value={item.image} folder="gallery" onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, image: value } : current))} />
          <div className="grid gap-4 md:grid-cols-3">
            <Toggle label="Published" checked={item.isPublished} onChange={(checked) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, isPublished: checked } : current))} />
            <Toggle label="Featured" checked={item.isFeatured} onChange={(checked) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, isFeatured: checked } : current))} />
            <button className="btn-shell" onClick={() => window.confirm('Delete this gallery item?') && setItems(items.filter((_, currentIndex) => currentIndex !== index))}>
              Delete item
            </button>
          </div>
        </Section>
      ))}
      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('gallery', items);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function MembershipsEditor({ initialData }: { initialData: MembershipPlan[] }) {
  const [items, setItems] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      {items.map((plan, index) => (
        <Section key={plan.id} title={plan.name}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={plan.name} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, name: value } : current))} />
            <Field label="Tier" value={plan.tier} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, tier: value } : current))} />
            <Field label="Price" value={plan.price} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, price: value } : current))} />
            <Field label="Period" value={plan.period} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, period: value } : current))} />
            <Field label="CTA label" value={plan.ctaLabel} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, ctaLabel: value } : current))} />
          </div>
          <Field label="Description" value={plan.description} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current))} textarea />
          <StringListEditor label="Features" items={plan.features} onChange={(value) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, features: value } : current))} />
          <div className="grid gap-4 md:grid-cols-2">
            <Toggle label="Highlighted plan" checked={plan.isHighlighted} onChange={(checked) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, isHighlighted: checked } : current))} />
            <Toggle label="Active plan" checked={plan.isActive} onChange={(checked) => setItems(items.map((current, currentIndex) => currentIndex === index ? { ...current, isActive: checked } : current))} />
          </div>
        </Section>
      ))}
      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('memberships', items);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function SponsorsEditor({ initialData }: { initialData: SponsorsContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Sponsor page copy">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <Field label="Feature heading" value={data.featureHeading} onChange={(value) => setData({ ...data, featureHeading: value })} />
        <Field label="Feature copy" value={data.featureCopy} onChange={(value) => setData({ ...data, featureCopy: value })} textarea />
      </Section>

      <Section title="Metrics">
        {data.metrics.map((item, index) => (
          <div key={`metric-${index}`} className="grid gap-3 md:grid-cols-[0.4fr_1fr_auto]">
            <Field label="Value" value={item.value} onChange={(value) => setData({ ...data, metrics: data.metrics.map((current, currentIndex) => currentIndex === index ? { ...current, value } : current) })} />
            <Field label="Label" value={item.label} onChange={(value) => setData({ ...data, metrics: data.metrics.map((current, currentIndex) => currentIndex === index ? { ...current, label: value } : current) })} />
            <button className="btn-shell self-end" onClick={() => setData({ ...data, metrics: data.metrics.filter((_, currentIndex) => currentIndex !== index) })}>
              Remove
            </button>
          </div>
        ))}
      </Section>

      <Section title="Partners">
        {data.partners.map((partner, index) => (
          <div key={partner.id} className="grid gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" value={partner.name} onChange={(value) => setData({ ...data, partners: data.partners.map((current, currentIndex) => currentIndex === index ? { ...current, name: value } : current) })} />
              <Field label="Tier" value={partner.tier} onChange={(value) => setData({ ...data, partners: data.partners.map((current, currentIndex) => currentIndex === index ? { ...current, tier: value } : current) })} />
              <Field label="Website" value={partner.website} onChange={(value) => setData({ ...data, partners: data.partners.map((current, currentIndex) => currentIndex === index ? { ...current, website: value } : current) })} />
              <AssetField label="Logo path" value={partner.logoPath} folder="sponsors" onChange={(value) => setData({ ...data, partners: data.partners.map((current, currentIndex) => currentIndex === index ? { ...current, logoPath: value } : current) })} />
            </div>
            <Field label="Description" value={partner.description} onChange={(value) => setData({ ...data, partners: data.partners.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current) })} textarea />
          </div>
        ))}
      </Section>

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('sponsors', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function SettingsEditor({ initialData }: { initialData: SiteSettings }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Site settings">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Site title" value={data.siteTitle} onChange={(value) => setData({ ...data, siteTitle: value })} />
          <Field label="Site description" value={data.siteDescription} onChange={(value) => setData({ ...data, siteDescription: value })} textarea />
          <Field label="Contact email" value={data.contactEmail} onChange={(value) => setData({ ...data, contactEmail: value })} />
          <Field label="Contact phone" value={data.contactPhone} onChange={(value) => setData({ ...data, contactPhone: value })} />
        </div>
        <AssetField label="Primary logo" value={data.logoPrimary} folder="branding" onChange={(value) => setData({ ...data, logoPrimary: value })} />
        <AssetField label="Compact logo" value={data.logoCompact} folder="branding" onChange={(value) => setData({ ...data, logoCompact: value })} />
      </Section>
      <Section title="Footer">
        <Field label="Footer headline" value={data.footer.headline} onChange={(value) => setData({ ...data, footer: { ...data.footer, headline: value } })} textarea />
        <Field label="Footer tagline" value={data.footer.tagline} onChange={(value) => setData({ ...data, footer: { ...data.footer, tagline: value } })} />
        <Field label="Footer copyright" value={data.footer.copyright} onChange={(value) => setData({ ...data, footer: { ...data.footer, copyright: value } })} />
      </Section>
      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('site-settings', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function EventsEditor({ initialData }: { initialData: EventsContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Events page">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <Field label="Form intro" value={data.formIntro} onChange={(value) => setData({ ...data, formIntro: value })} textarea />
        <StringListEditor label="Benefits" items={data.benefits} onChange={(value) => setData({ ...data, benefits: value })} />
      </Section>
      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('events', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function CoachingEditor({ initialData }: { initialData: CoachingContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Coaching overview">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <Field label="Partner label" value={data.partnerLabel} onChange={(value) => setData({ ...data, partnerLabel: value })} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Contact name" value={data.contactName} onChange={(value) => setData({ ...data, contactName: value })} />
          <Field label="Contact phone" value={data.contactPhone} onChange={(value) => setData({ ...data, contactPhone: value })} />
        </div>
        <AssetField label="Hero image" value={data.heroImage} folder="gallery" onChange={(value) => setData({ ...data, heroImage: value })} />
        <StringListEditor label="Locations" items={data.locations} onChange={(value) => setData({ ...data, locations: value })} addLabel="Add location" />
        <StringListEditor label="What to expect" items={data.whatToExpect} onChange={(value) => setData({ ...data, whatToExpect: value })} />
      </Section>

      <Section title="Level bands">
        {data.levels.map((level, index) => (
          <div key={level.id} className="grid gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={level.title} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, title: value } : current) })} />
              <Field label="Level range" value={level.levelRange} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, levelRange: value } : current) })} />
              <Field label="CTA label" value={level.ctaLabel} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, ctaLabel: value } : current) })} />
              <Field label="CTA link" value={level.ctaHref} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, ctaHref: value } : current) })} />
            </div>
            <Field label="Description" value={level.description} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current) })} textarea />
            <AssetField label="Level image" value={level.image} folder="gallery" onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, image: value } : current) })} />
            <StringListEditor label="Focus points" items={level.focusPoints} onChange={(value) => setData({ ...data, levels: data.levels.map((current, currentIndex) => currentIndex === index ? { ...current, focusPoints: value } : current) })} />
          </div>
        ))}
      </Section>

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('coaching', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function ExperiencesEditor({ initialData }: { initialData: ExperiencesContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Experiences">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <StringListEditor label="Benefits" items={data.benefits} onChange={(value) => setData({ ...data, benefits: value })} />
        <button
          type="button"
          className="btn-shell w-fit"
          onClick={() =>
            setData({
              ...data,
              items: [
                ...data.items,
                {
                  id: `experience-${Date.now()}`,
                  title: 'New experience',
                  shortLabel: 'Format',
                  description: '',
                  location: '',
                  timeLabel: '',
                  priceLabel: '',
                  contactLabel: '',
                  image: '',
                  ctaLabel: 'Open',
                  ctaHref: '/events',
                },
              ],
            })
          }
        >
          Add experience
        </button>
      </Section>

      {data.items.map((item, index) => (
        <Section key={item.id} title={item.title}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={item.title} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, title: value } : current) })} />
            <Field label="Short label" value={item.shortLabel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, shortLabel: value } : current) })} />
            <Field label="Location" value={item.location} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, location: value } : current) })} />
            <Field label="Time label" value={item.timeLabel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, timeLabel: value } : current) })} />
            <Field label="Price label" value={item.priceLabel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, priceLabel: value } : current) })} />
            <Field label="Contact label" value={item.contactLabel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, contactLabel: value } : current) })} />
            <Field label="CTA label" value={item.ctaLabel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, ctaLabel: value } : current) })} />
            <Field label="CTA link" value={item.ctaHref} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, ctaHref: value } : current) })} />
          </div>
          <Field label="Description" value={item.description} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current) })} textarea />
          <AssetField label="Image" value={item.image} folder="marketing" onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, image: value } : current) })} />
          <button
            type="button"
            className="btn-shell w-fit"
            onClick={() => window.confirm('Delete this experience?') && setData({ ...data, items: data.items.filter((_, currentIndex) => currentIndex !== index) })}
          >
            Delete experience
          </button>
        </Section>
      ))}

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('experiences', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function ShopEditor({ initialData }: { initialData: ShopContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="Shop overview">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <Field label="Order intro" value={data.orderIntro} onChange={(value) => setData({ ...data, orderIntro: value })} textarea />
        <Field label="WhatsApp order link" value={data.whatsappOrderLink} onChange={(value) => setData({ ...data, whatsappOrderLink: value })} />
        <button
          type="button"
          className="btn-shell w-fit"
          onClick={() =>
            setData({
              ...data,
              items: [
                ...data.items,
                {
                  id: `shop-${Date.now()}`,
                  name: 'New product',
                  price: '',
                  description: '',
                  image: '',
                  customization: '',
                  orderChannel: '',
                  tags: [],
                  isFeatured: false,
                },
              ],
            })
          }
        >
          Add product
        </button>
      </Section>

      {data.items.map((item, index) => (
        <Section key={item.id} title={item.name}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={item.name} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, name: value } : current) })} />
            <Field label="Price" value={item.price} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, price: value } : current) })} />
            <Field label="Customization" value={item.customization} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, customization: value } : current) })} />
            <Field label="Order channel" value={item.orderChannel} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, orderChannel: value } : current) })} />
          </div>
          <Field label="Description" value={item.description} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current) })} textarea />
          <AssetField label="Product image" value={item.image} folder="marketing" onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, image: value } : current) })} />
          <StringListEditor label="Tags" items={item.tags} onChange={(value) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, tags: value } : current) })} />
          <Toggle label="Featured item" checked={item.isFeatured} onChange={(checked) => setData({ ...data, items: data.items.map((current, currentIndex) => currentIndex === index ? { ...current, isFeatured: checked } : current) })} />
          <button
            type="button"
            className="btn-shell w-fit"
            onClick={() => window.confirm('Delete this product?') && setData({ ...data, items: data.items.filter((_, currentIndex) => currentIndex !== index) })}
          >
            Delete product
          </button>
        </Section>
      ))}

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('shop', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export function LeagueEditor({ initialData }: { initialData: LeagueContent }) {
  const [data, setData] = useState(initialData);
  const [state, setState] = useState<SaveState>('idle');

  return (
    <div className="admin-page grid gap-6">
      <Section title="League section">
        <Field label="Intro" value={data.intro} onChange={(value) => setData({ ...data, intro: value })} textarea />
        <Field label="Description" value={data.description} onChange={(value) => setData({ ...data, description: value })} textarea />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Season label" value={data.seasonLabel} onChange={(value) => setData({ ...data, seasonLabel: value })} />
          <Field label="CTA label" value={data.ctaLabel} onChange={(value) => setData({ ...data, ctaLabel: value })} />
          <Field label="CTA link" value={data.ctaHref} onChange={(value) => setData({ ...data, ctaHref: value })} />
        </div>
        <AssetField label="Section image" value={data.image} folder="tournaments" onChange={(value) => setData({ ...data, image: value })} />
        <StringListEditor label="Highlights" items={data.highlights} onChange={(value) => setData({ ...data, highlights: value })} />
      </Section>

      <SaveBar state={state} onSave={async () => {
        setState('saving');
        try {
          await saveContent('league', data);
          setState('saved');
        } catch {
          setState('error');
        }
      }} />
    </div>
  );
}

export type ClubSlug = 'grand-baie' | 'black-river' | string;
export type TournamentStatus = 'open' | 'upcoming' | 'archive' | 'closed';
export type GalleryCategory = 'clubs' | 'events' | 'campaigns' | string;

export interface HomepageStat {
  value: string;
  label: string;
}

export interface HomepageBlock {
  eyebrow: string;
  title: string;
  meta: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  stats: HomepageStat[];
  featuredBlocks: HomepageBlock[];
  sectionToggles: {
    showBooking: boolean;
    showClubs: boolean;
    showTournaments: boolean;
    showRankings: boolean;
    showSponsors: boolean;
  };
  membershipFaq: Array<{ question: string; answer: string }>;
}

export interface ClubContent {
  id: string;
  name: string;
  slug: string;
  region: string;
  shortDescription: string;
  description: string;
  phone: string;
  address: string;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  courtCount: number;
  footFiveCount: number;
  tags: string[];
  isActive: boolean;
}

export interface TournamentContent {
  id: string;
  title: string;
  slug: string;
  clubSlug: string;
  category: string;
  genderLabel: string;
  status: TournamentStatus;
  date: string;
  month: string;
  year: number;
  summary: string;
  coverImage: string;
  posterFile: string;
  archiveFile: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
  ctaLabel: string;
  isActive: boolean;
}

export interface SponsorTier {
  id: string;
  name: string;
  description: string;
}

export interface SponsorPartner {
  id: string;
  name: string;
  tier: string;
  logoPath: string;
  website: string;
  description: string;
}

export interface SponsorsContent {
  intro: string;
  featureHeading: string;
  featureCopy: string;
  metrics: Array<{ value: string; label: string }>;
  tiers: SponsorTier[];
  partners: SponsorPartner[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  description: string;
  clubSlug: string | null;
  tournamentSlug: string | null;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface EventsContent {
  intro: string;
  formIntro: string;
  benefits: string[];
  eventTypes: Array<{ id: string; title: string; description: string }>;
}

export interface CoachingLevel {
  id: string;
  title: string;
  levelRange: string;
  description: string;
  focusPoints: string[];
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface CoachProfile {
  id: string;
  name: string;
  location: string;
  phone: string;
  image: string;
  tagline: string;
}

export interface CoachingContent {
  intro: string;
  partnerLabel: string;
  contactName: string;
  contactPhone: string;
  locations: string[];
  heroImage: string;
  whatToExpect: string[];
  coaches: CoachProfile[];
  levels: CoachingLevel[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  location: string;
  timeLabel: string;
  priceLabel: string;
  contactLabel: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ExperiencesContent {
  intro: string;
  benefits: string[];
  items: ExperienceItem[];
}

export interface ShopItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  customization: string;
  orderChannel: string;
  tags: string[];
  isFeatured: boolean;
}

export interface ShopContent {
  intro: string;
  orderIntro: string;
  whatsappOrderLink: string;
  items: ShopItem[];
}

export interface LeagueContent {
  intro: string;
  description: string;
  seasonLabel: string;
  image: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  logoPrimary: string;
  logoCompact: string;
  faviconPath: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: Record<string, string>;
  seoDefaults: {
    title: string;
    description: string;
  };
  footer: {
    headline: string;
    tagline: string;
    copyright: string;
  };
  buttonLabels: Record<string, string>;
  theme: Record<string, string>;
}

export interface BookingRequest {
  id: string;
  clubSlug: string;
  date: string;
  preferredSlot: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface EventInquiry {
  id: string;
  inquiryType: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  preferredDate: string;
  expectedGuests: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'quoted';
}

export interface RankingRow {
  id: string;
  name: string;
  club: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
}

export type ContentKey =
  | 'homepage'
  | 'clubs'
  | 'tournaments'
  | 'memberships'
  | 'sponsors'
  | 'gallery'
  | 'events'
  | 'coaching'
  | 'experiences'
  | 'shop'
  | 'league'
  | 'site-settings'
  | 'booking-requests'
  | 'event-inquiries'
  | 'rankings';

import { randomUUID } from 'crypto';
import type {
  BookingRequest,
  ClubContent,
  CoachingContent,
  ContentKey,
  EventInquiry,
  EventsContent,
  ExperiencesContent,
  GalleryItem,
  HomepageContent,
  LeagueContent,
  MembershipPlan,
  RankingRow,
  ShopContent,
  SiteSettings,
  SponsorsContent,
  TournamentContent,
} from './types';
import {
  bookingRequestSchema,
  clubSchema,
  coachingSchema,
  eventInquirySchema,
  eventsSchema,
  experiencesSchema,
  gallerySchema,
  homepageSchema,
  leagueSchema,
  membershipSchema,
  rankingSchema,
  shopSchema,
  siteSettingsSchema,
  sponsorsSchema,
  tournamentSchema,
} from './schemas';
import { readContentFile, writeContentFile } from './storage';

const files = {
  homepage: 'homepage.json',
  clubs: 'clubs.json',
  tournaments: 'tournaments.json',
  memberships: 'memberships.json',
  sponsors: 'sponsors.json',
  gallery: 'gallery.json',
  events: 'events.json',
  coaching: 'coaching.json',
  experiences: 'experiences.json',
  shop: 'shop.json',
  league: 'league.json',
  'site-settings': 'site-settings.json',
  'booking-requests': 'booking-requests.json',
  'event-inquiries': 'event-inquiries.json',
  rankings: 'rankings.json',
} as const;

export async function getHomepageContent() {
  return readContentFile(files.homepage, homepageSchema, homepageSchema.parse({ hero: { badge: '', title: '', subtitle: '', primaryCtaLabel: '', primaryCtaHref: '', secondaryCtaLabel: '', secondaryCtaHref: '' }, stats: [], featuredBlocks: [], sectionToggles: { showBooking: true, showClubs: true, showTournaments: true, showRankings: true, showSponsors: true }, membershipFaq: [] }));
}

export async function updateHomepageContent(value: HomepageContent) {
  return writeContentFile(files.homepage, homepageSchema, value);
}

export async function getClubs() {
  return readContentFile(files.clubs, clubSchema.array(), []);
}

export async function updateClubs(value: ClubContent[]) {
  return writeContentFile(files.clubs, clubSchema.array(), value);
}

export async function getClubBySlug(slug: string) {
  const clubs = await getClubs();
  return clubs.find((club) => club.slug === slug);
}

export async function getTournaments() {
  return readContentFile(files.tournaments, tournamentSchema.array(), []);
}

export async function updateTournaments(value: TournamentContent[]) {
  return writeContentFile(files.tournaments, tournamentSchema.array(), value);
}

export async function getTournamentBySlug(slug: string) {
  const tournaments = await getTournaments();
  return tournaments.find((item) => item.slug === slug);
}

export async function getMemberships() {
  return readContentFile(files.memberships, membershipSchema.array(), []);
}

export async function updateMemberships(value: MembershipPlan[]) {
  return writeContentFile(files.memberships, membershipSchema.array(), value);
}

export async function getSponsors() {
  return readContentFile(files.sponsors, sponsorsSchema, sponsorsSchema.parse({ intro: '', featureHeading: '', featureCopy: '', metrics: [], tiers: [], partners: [] }));
}

export async function updateSponsors(value: SponsorsContent) {
  return writeContentFile(files.sponsors, sponsorsSchema, value);
}

export async function getGallery() {
  return readContentFile(files.gallery, gallerySchema, []);
}

export async function updateGallery(value: GalleryItem[]) {
  return writeContentFile(files.gallery, gallerySchema, value);
}

export async function getEventsContent() {
  return readContentFile(files.events, eventsSchema, eventsSchema.parse({ intro: '', formIntro: '', benefits: [], eventTypes: [] }));
}

export async function updateEventsContent(value: EventsContent) {
  return writeContentFile(files.events, eventsSchema, value);
}

export async function getCoachingContent() {
  return readContentFile(
    files.coaching,
    coachingSchema,
    coachingSchema.parse({
      intro: '',
      partnerLabel: '',
      contactName: '',
      contactPhone: '',
      locations: [],
      heroImage: '',
      whatToExpect: [],
      coaches: [],
      levels: [],
    })
  );
}

export async function updateCoachingContent(value: CoachingContent) {
  return writeContentFile(files.coaching, coachingSchema, value);
}

export async function getExperiencesContent() {
  return readContentFile(files.experiences, experiencesSchema, experiencesSchema.parse({ intro: '', benefits: [], items: [] }));
}

export async function updateExperiencesContent(value: ExperiencesContent) {
  return writeContentFile(files.experiences, experiencesSchema, value);
}

export async function getShopContent() {
  return readContentFile(files.shop, shopSchema, shopSchema.parse({ intro: '', orderIntro: '', whatsappOrderLink: '', items: [] }));
}

export async function updateShopContent(value: ShopContent) {
  return writeContentFile(files.shop, shopSchema, value);
}

export async function getLeagueContent() {
  return readContentFile(
    files.league,
    leagueSchema,
    leagueSchema.parse({
      intro: '',
      description: '',
      seasonLabel: '',
      image: '',
      highlights: [],
      ctaLabel: '',
      ctaHref: '',
    })
  );
}

export async function updateLeagueContent(value: LeagueContent) {
  return writeContentFile(files.league, leagueSchema, value);
}

export async function getSiteSettings() {
  return readContentFile(files['site-settings'], siteSettingsSchema, siteSettingsSchema.parse({
    siteTitle: 'Urban Sport Premium',
    siteDescription: '',
    logoPrimary: '',
    logoCompact: '',
    faviconPath: '/icon.png',
    contactEmail: '',
    contactPhone: '',
    socialLinks: {},
    seoDefaults: { title: 'Urban Sport Premium', description: '' },
    footer: { headline: '', tagline: '', copyright: '' },
    buttonLabels: {},
    theme: {},
  }));
}

export async function updateSiteSettings(value: SiteSettings) {
  return writeContentFile(files['site-settings'], siteSettingsSchema, value);
}

export async function getBookingRequests() {
  return readContentFile(files['booking-requests'], bookingRequestSchema.array(), []);
}

export async function createBookingRequest(payload: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) {
  const requests = await getBookingRequests();
  const next: BookingRequest = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  await writeContentFile(files['booking-requests'], bookingRequestSchema.array(), [next, ...requests]);
  return next;
}

export async function getEventInquiries() {
  return readContentFile(files['event-inquiries'], eventInquirySchema.array(), []);
}

export async function createEventInquiry(payload: Omit<EventInquiry, 'id' | 'createdAt' | 'status'>) {
  const inquiries = await getEventInquiries();
  const next: EventInquiry = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  await writeContentFile(files['event-inquiries'], eventInquirySchema.array(), [next, ...inquiries]);
  return next;
}

export async function getRankings() {
  return readContentFile(files.rankings, rankingSchema.array(), []);
}

export async function updateRankings(value: RankingRow[]) {
  return writeContentFile(files.rankings, rankingSchema.array(), value);
}

export async function getDashboardSummary() {
  const [clubs, tournaments, gallery, sponsors, bookingRequests, eventInquiries] = await Promise.all([
    getClubs(),
    getTournaments(),
    getGallery(),
    getSponsors(),
    getBookingRequests(),
    getEventInquiries(),
  ]);

  return {
    counts: {
      clubs: clubs.length,
      tournaments: tournaments.length,
      gallery: gallery.length,
      sponsors: sponsors.partners.length,
      bookingRequests: bookingRequests.length,
    },
    recentBookingRequests: bookingRequests.slice(0, 5),
    recentEventInquiries: eventInquiries.slice(0, 5),
  };
}

export async function updateContentByKey(key: ContentKey, value: unknown) {
  switch (key) {
    case 'homepage':
      return updateHomepageContent(homepageSchema.parse(value));
    case 'clubs':
      return updateClubs(clubSchema.array().parse(value));
    case 'tournaments':
      return updateTournaments(tournamentSchema.array().parse(value));
    case 'memberships':
      return updateMemberships(membershipSchema.array().parse(value));
    case 'sponsors':
      return updateSponsors(sponsorsSchema.parse(value));
    case 'gallery':
      return updateGallery(gallerySchema.parse(value));
    case 'events':
      return updateEventsContent(eventsSchema.parse(value));
    case 'coaching':
      return updateCoachingContent(coachingSchema.parse(value));
    case 'experiences':
      return updateExperiencesContent(experiencesSchema.parse(value));
    case 'shop':
      return updateShopContent(shopSchema.parse(value));
    case 'league':
      return updateLeagueContent(leagueSchema.parse(value));
    case 'site-settings':
      return updateSiteSettings(siteSettingsSchema.parse(value));
    case 'booking-requests':
      return writeContentFile(files['booking-requests'], bookingRequestSchema.array(), bookingRequestSchema.array().parse(value));
    case 'event-inquiries':
      return writeContentFile(files['event-inquiries'], eventInquirySchema.array(), eventInquirySchema.array().parse(value));
    case 'rankings':
      return updateRankings(rankingSchema.array().parse(value));
    default:
      throw new Error(`Unsupported content key: ${String(key)}`);
  }
}

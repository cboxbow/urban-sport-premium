import {
  getBookingRequests,
  getClubs,
  getCoachingContent,
  getEventInquiries,
  getEventsContent,
  getExperiencesContent,
  getGallery,
  getHomepageContent,
  getLeagueContent,
  getMemberships,
  getRankings,
  getShopContent,
  getSiteSettings,
  getSponsors,
  getTournamentBySlug,
  getTournaments,
  getClubBySlug,
} from '@/lib/content';
import type { ClubContent, GalleryCategory, GalleryItem, TournamentContent } from '@/lib/content/types';

export type { ClubContent, GalleryItem, TournamentContent } from '@/lib/content/types';
export type GalleryFilter = 'all' | GalleryCategory;

export async function getHomepageViewData() {
  const [homepage, clubs, tournaments, rankings, sponsors, settings, coaching, experiences, shop, league] = await Promise.all([
    getHomepageContent(),
    getClubs(),
    getTournaments(),
    getRankings(),
    getSponsors(),
    getSiteSettings(),
    getCoachingContent(),
    getExperiencesContent(),
    getShopContent(),
    getLeagueContent(),
  ]);

  return {
    homepage,
    clubs: clubs.filter((club) => club.isActive),
    featuredTournaments: tournaments.filter((item) => item.isPublished && item.isFeatured),
    rankings,
    sponsorNames: sponsors.partners.map((partner) => partner.name),
    settings,
    coaching,
    experiences,
    shop,
    league,
  };
}

export async function getActiveClubs() {
  const clubs = await getClubs();
  return clubs.filter((club) => club.isActive);
}

export async function getClubDetail(slug: string) {
  const [club, tournaments] = await Promise.all([getClubBySlug(slug), getTournaments()]);
  return {
    club,
    clubTournaments: tournaments.filter((item) => item.clubSlug === slug && item.isPublished),
  };
}

export async function getPublishedTournaments() {
  const tournaments = await getTournaments();
  return tournaments.filter((item) => item.isPublished);
}

export async function getTournamentDetail(slug: string) {
  const tournament = await getTournamentBySlug(slug);
  const clubs = await getClubs();
  return {
    tournament,
    club: clubs.find((item) => item.slug === tournament?.clubSlug) ?? null,
  };
}

export async function getTournamentArchiveGroups() {
  const tournaments = await getPublishedTournaments();
  const groups = new Map<string, string[]>();

  tournaments
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((item) => {
      const clubName = item.clubSlug === 'grand-baie' ? 'Grand Baie' : item.clubSlug === 'black-river' ? 'Black River' : item.clubSlug;
      const label = `${new Date(`${item.date}T00:00:00`).toLocaleDateString('en-MU', { day: '2-digit', month: 'long', year: 'numeric' })} - ${item.title}`;
      groups.set(clubName, [...(groups.get(clubName) ?? []), label]);
    });

  return Array.from(groups.entries()).map(([club, items]) => ({ club, items }));
}

export async function getPublishedGallery(filter: GalleryFilter) {
  const gallery = await getGallery();
  return gallery.filter((item) => item.isPublished && (filter === 'all' || item.category === filter));
}

export async function getMembershipPageData() {
  const [memberships, homepage] = await Promise.all([getMemberships(), getHomepageContent()]);
  return {
    memberships: memberships.filter((item) => item.isActive),
    faq: homepage.membershipFaq,
  };
}

export async function getSponsorsPageData() {
  return getSponsors();
}

export async function getEventsPageData() {
  return getEventsContent();
}

export async function getCoachingPageData() {
  return getCoachingContent();
}

export async function getExperiencesPageData() {
  return getExperiencesContent();
}

export async function getShopPageData() {
  return getShopContent();
}

export async function getLeaguePageData() {
  return getLeagueContent();
}

export async function getFooterData() {
  const [settings, clubs, sponsors] = await Promise.all([getSiteSettings(), getClubs(), getSponsors()]);
  return {
    settings,
    clubs: clubs.filter((club) => club.isActive),
    sponsorNames: sponsors.partners.map((item) => item.name),
  };
}

export async function getAdminPreview() {
  const [bookingRequests, eventInquiries] = await Promise.all([getBookingRequests(), getEventInquiries()]);
  return {
    recentBookings: bookingRequests.slice(0, 5),
    recentInquiries: eventInquiries.slice(0, 5),
  };
}

export function getClubDisplayLine(club: ClubContent) {
  return `${club.courtCount} premium padel courts${club.footFiveCount ? ` and ${club.footFiveCount} foot five` : ''}`;
}

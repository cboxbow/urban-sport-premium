import { z } from 'zod';

export const homepageSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    primaryCtaLabel: z.string(),
    primaryCtaHref: z.string(),
    secondaryCtaLabel: z.string(),
    secondaryCtaHref: z.string(),
  }),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  featuredBlocks: z.array(
    z.object({
      eyebrow: z.string(),
      title: z.string(),
      meta: z.string(),
      description: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    })
  ),
  sectionToggles: z.object({
    showBooking: z.boolean(),
    showClubs: z.boolean(),
    showTournaments: z.boolean(),
    showRankings: z.boolean(),
    showSponsors: z.boolean(),
  }),
  membershipFaq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export const clubSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  region: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  phone: z.string(),
  address: z.string(),
  heroImage: z.string(),
  galleryImages: z.array(z.string()),
  highlights: z.array(z.string()),
  courtCount: z.number(),
  footFiveCount: z.number(),
  tags: z.array(z.string()),
  isActive: z.boolean(),
});

export const tournamentSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  clubSlug: z.string(),
  category: z.string(),
  genderLabel: z.string(),
  status: z.enum(['open', 'upcoming', 'archive', 'closed']),
  date: z.string(),
  month: z.string(),
  year: z.number(),
  summary: z.string(),
  coverImage: z.string(),
  posterFile: z.string(),
  archiveFile: z.string(),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const membershipSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string(),
  price: z.string(),
  period: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  isHighlighted: z.boolean(),
  ctaLabel: z.string(),
  isActive: z.boolean(),
});

export const sponsorsSchema = z.object({
  intro: z.string(),
  featureHeading: z.string(),
  featureCopy: z.string(),
  metrics: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  tiers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    })
  ),
  partners: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      tier: z.string(),
      logoPath: z.string(),
      website: z.string(),
      description: z.string(),
    })
  ),
});

export const gallerySchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    image: z.string(),
    description: z.string(),
    clubSlug: z.string().nullable(),
    tournamentSlug: z.string().nullable(),
    isPublished: z.boolean(),
    isFeatured: z.boolean(),
  })
);

export const eventsSchema = z.object({
  intro: z.string(),
  formIntro: z.string(),
  benefits: z.array(z.string()),
  eventTypes: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
});

export const coachingSchema = z.object({
  intro: z.string(),
  partnerLabel: z.string(),
  contactName: z.string(),
  contactPhone: z.string(),
  locations: z.array(z.string()),
  heroImage: z.string(),
  whatToExpect: z.array(z.string()),
  coaches: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      location: z.string(),
      phone: z.string(),
      image: z.string(),
      tagline: z.string(),
    })
  ),
  levels: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      levelRange: z.string(),
      description: z.string(),
      focusPoints: z.array(z.string()),
      image: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    })
  ),
});

export const experiencesSchema = z.object({
  intro: z.string(),
  benefits: z.array(z.string()),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      shortLabel: z.string(),
      description: z.string(),
      location: z.string(),
      timeLabel: z.string(),
      priceLabel: z.string(),
      contactLabel: z.string(),
      image: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    })
  ),
});

export const shopSchema = z.object({
  intro: z.string(),
  orderIntro: z.string(),
  whatsappOrderLink: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.string(),
      description: z.string(),
      image: z.string(),
      customization: z.string(),
      orderChannel: z.string(),
      tags: z.array(z.string()),
      isFeatured: z.boolean(),
    })
  ),
});

export const leagueSchema = z.object({
  intro: z.string(),
  description: z.string(),
  seasonLabel: z.string(),
  image: z.string(),
  highlights: z.array(z.string()),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string(),
  siteDescription: z.string(),
  logoPrimary: z.string(),
  logoCompact: z.string(),
  faviconPath: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  socialLinks: z.record(z.string()),
  seoDefaults: z.object({
    title: z.string(),
    description: z.string(),
  }),
  footer: z.object({
    headline: z.string(),
    tagline: z.string(),
    copyright: z.string(),
  }),
  buttonLabels: z.record(z.string()),
  theme: z.record(z.string()),
});

export const bookingRequestSchema = z.object({
  id: z.string(),
  clubSlug: z.string(),
  date: z.string(),
  preferredSlot: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  notes: z.string(),
  createdAt: z.string(),
  status: z.enum(['new', 'contacted', 'closed']),
});

export const eventInquirySchema = z.object({
  id: z.string(),
  inquiryType: z.string(),
  fullName: z.string(),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  preferredDate: z.string(),
  expectedGuests: z.string(),
  message: z.string(),
  createdAt: z.string(),
  status: z.enum(['new', 'contacted', 'quoted']),
});

export const rankingSchema = z.object({
  id: z.string(),
  name: z.string(),
  club: z.string(),
  matches: z.number(),
  wins: z.number(),
  losses: z.number(),
  points: z.number(),
});

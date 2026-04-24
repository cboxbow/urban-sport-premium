'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ClubContent } from '@/lib/content/types';

const CLUB_TAGS: Record<string, string[]> = {
  'grand-baie': ['Social', 'Accessible', 'Daily Play', 'Community-driven'],
  'black-river': ['Competition', 'Events', 'Bigger Venue', 'Destination feel'],
};

const CLUB_COPY: Record<string, string> = {
  'grand-baie':
    'Grand Baie is the social heart of Urban Sport. Designed for accessibility and daily play, it brings together beginners and regular players in a strong community-driven environment.',
  'black-river':
    'Black River is the destination venue. Built for larger sessions, events, and competition, it expands the experience into a bigger and more dynamic setting.',
};

function getClubDisplayLine(club: ClubContent) {
  return `${club.courtCount} premium padel courts${club.footFiveCount ? ` and ${club.footFiveCount} foot five` : ''}`;
}

const LOGO_STRIP = [
  '/logos/urban-sport-primary-light.png',
  '/logos/urban-sport-primary-dark.png',
  '/logos/urban-sport-compact-light.png',
  '/logos/urban-sport-compact-dark.png',
];

const heroItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const revealItem = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

type HomeLandingProps = {
  clubs: ClubContent[];
};

export default function HomeLanding({ clubs }: HomeLandingProps) {
  const reduceMotion = useReducedMotion();
  const activeClubs = clubs.slice(0, 2);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const revealWhileInView = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.25 },
      };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      void video.play();
    }
  };

  return (
    <div className="bg-[#0b0b0b] text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hidden md:block">
            <video
              ref={videoRef}
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero-fallback.jpg"
            >
              <source src="/videos/urban-hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 md:hidden">
            <Image
              src="/images/hero-fallback.jpg"
              alt="Urban Sport Mauritius"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="hero-overlay absolute inset-0" />
          <div className="hero-grain absolute inset-0 opacity-[0.06]" />
        </div>

        <div className="page-container relative z-10 grid min-h-screen gap-12 pt-28 pb-16 lg:grid-cols-[minmax(0,760px)_minmax(320px,388px)] lg:items-center lg:gap-16 lg:pt-32">
          <div className="max-w-[760px] lg:self-start lg:pt-20 xl:pt-24">
            <motion.div
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={heroItem}
              custom={0.08}
              className="text-xs uppercase tracking-[0.28em] text-[#c9a24a]"
            >
              Urban Sport Mauritius
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={heroItem}
              custom={0.22}
              className="mt-5 max-w-[760px] font-home-display text-[clamp(48px,6vw,92px)] uppercase leading-[1.01] tracking-[0.025em] text-white"
            >
              The Original Padel Clubs in Mauritius
            </motion.h1>

            <motion.div
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={heroItem}
              custom={0.42}
              className="mt-6 max-w-[540px]"
            >
              <p className="text-[15px] leading-8 text-white/82 sm:text-base">
                Two destinations. One standard. Built for play, community, and a premium club experience.
              </p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'show'}
              variants={heroItem}
              custom={0.58}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/booking" className="btn-premium">
                Book Now
              </Link>
              <Link href="/clubs" className="btn-outline">
                Explore Clubs
              </Link>
              <button
                type="button"
                onClick={toggleSound}
                className="btn-shell"
                aria-pressed={!muted}
                aria-label={muted ? 'Enable hero video sound' : 'Mute hero video sound'}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {muted ? 'Sound Off' : 'Sound On'}
              </button>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:self-end lg:pb-10">
            {activeClubs.map((club, index) => (
              <motion.article
                key={club.id}
                initial={reduceMotion ? false : 'hidden'}
                animate={reduceMotion ? undefined : 'show'}
                variants={heroItem}
                custom={0.72 + index * 0.12}
                className="group premium-media-card border-white/12 bg-black/34 backdrop-blur-xl"
              >
                <div className="grid min-h-[252px] gap-0 md:grid-cols-[0.47fr_0.53fr]">
                  <div className="relative overflow-hidden">
                    <Image
                      src={club.heroImage}
                      alt={club.name}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08),rgba(11,11,11,0.58))]" />
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="text-xs uppercase tracking-[0.24em] text-[#c9a24a]">
                      {club.slug === 'grand-baie' ? 'Grand Baie' : 'Black River'}
                    </div>
                    <h2 className="mt-3 font-home-display text-[29px] uppercase leading-[1.02] tracking-[0.04em] text-white">
                      {club.slug === 'grand-baie' ? 'Social Club' : 'Destination Venue'}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/64">{club.shortDescription}</p>
                    <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-white/45">{getClubDisplayLine(club)}</div>
                    <Link href={`/clubs/${club.slug}`} className="btn-shell mt-5 inline-flex border-[#c9a24a]/18 hover:border-[#c9a24a]/34">
                      Explore Club
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="page-container">
          <motion.div className="max-w-3xl" variants={revealItem} custom={0.06} {...revealWhileInView}>
            <div className="text-xs uppercase tracking-[0.28em] text-[#c9a24a]">The first padel clubs in Mauritius</div>
            <h2 className="mt-4 font-home-display text-4xl uppercase leading-[1.06] tracking-[0.04em] text-white sm:text-5xl">
              Two Clubs. Two Experiences.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {activeClubs.map((club, index) => (
              <motion.article
                key={`club-${club.id}`}
                className="group premium-media-card"
                variants={revealItem}
                custom={0.14 + index * 0.12}
                {...revealWhileInView}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={club.heroImage}
                    alt={club.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08),rgba(11,11,11,0.82))]" />
                </div>
                <div className="p-6 lg:p-7">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#c9a24a]">
                    {club.slug === 'grand-baie' ? 'Grand Baie' : 'Black River'}
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-8 text-white/72">{CLUB_COPY[club.slug]}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {CLUB_TAGS[club.slug]?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#c9a24a]/18 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white/58"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/clubs/${club.slug}`} className="btn-premium mt-7 inline-flex">
                    Explore Club
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="page-container">
          <motion.div
            className="mx-auto max-w-[800px] text-center"
            variants={revealItem}
            custom={0.08}
            {...revealWhileInView}
          >
            <div className="mx-auto h-px w-36 bg-[linear-gradient(90deg,transparent,rgba(201,162,74,0.7),transparent)]" />
            <p className="my-8 font-home-display text-3xl leading-[1.24] text-white sm:text-4xl">
              Urban Sport introduced padel to Mauritius and continues to define its standard today.
            </p>
            <div className="mx-auto h-px w-36 bg-[linear-gradient(90deg,transparent,rgba(201,162,74,0.7),transparent)]" />
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0">
          <Image
            src={activeClubs[0]?.heroImage ?? '/images/hero-fallback.jpg'}
            alt=""
            fill
            aria-hidden
            className="object-cover opacity-[0.09]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.82),rgba(11,11,11,0.94))]" />
        </div>
        <div className="page-container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={revealItem}
            custom={0.08}
            {...revealWhileInView}
          >
            <div className="text-xs uppercase tracking-[0.28em] text-[#c9a24a]">Experience</div>
            <h2 className="mt-4 font-home-display text-4xl uppercase leading-[1.06] tracking-[0.04em] text-white sm:text-5xl">
              More Than Just a Court
            </h2>
            <p className="mt-6 text-[15px] leading-8 text-white/72 sm:text-base">
              Urban Sport offers a complete club experience with coaching, social sessions, and private events across both locations.
            </p>
            <p className="mt-4 text-[15px] leading-8 text-white/56 sm:text-base">
              From first-time players to regular sessions and private events, Urban Sport is designed to support every level of play.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="page-container">
          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-[#c9a24a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-6 py-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.35)] lg:px-10 lg:py-12"
            variants={revealItem}
            custom={0.08}
            {...revealWhileInView}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,74,0.15),transparent_58%)]" />
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="text-xs uppercase tracking-[0.28em] text-[#c9a24a]">Booking</div>
              <h2 className="mt-4 font-home-display text-4xl uppercase leading-[1.06] tracking-[0.04em] text-white sm:text-5xl">
                Book Your Session
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-white/70 sm:text-base">
                Access courts in Grand Baie and Black River through a simple and direct booking process.
              </p>
              <p className="mt-3 text-[15px] leading-8 text-white/56 sm:text-base">
                Courts available daily in Grand Baie and Black River.
              </p>
              <Link href="/booking" className="btn-premium mt-8 inline-flex px-9 py-4 shadow-[0_16px_38px_rgba(201,168,76,0.24)]">
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#101010] py-10">
        <div className="page-container">
          <motion.div
            className="text-center"
            variants={revealItem}
            custom={0.08}
            {...revealWhileInView}
          >
            <p className="font-home-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">
              Urban Sport <span className="text-[#c9a24a]">— The original padel clubs in Mauritius.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {LOGO_STRIP.map((src) => (
                <Link key={src} href="/" className="transition-transform duration-300 hover:-translate-y-0.5">
                  <Image
                    src={src}
                    alt="Urban Sport logo"
                    width={150}
                    height={38}
                    className="h-7 w-auto opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

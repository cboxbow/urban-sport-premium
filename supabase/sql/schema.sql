-- =============================================================================
-- Urban Sport V2 Premium – Supabase PostgreSQL Schema
-- =============================================================================
-- Extensions
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- TABLE 1: profiles
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     text,
  email         text UNIQUE,
  avatar_url    text,
  phone         text,
  status        text NOT NULL DEFAULT 'active',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 2: roles
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.roles (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_key   text UNIQUE NOT NULL,
  label      text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 3: user_roles
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_id    uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role_id)
);

-- =============================================================================
-- TABLE 4: clubs
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.clubs (
  id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name               text NOT NULL,
  slug               text UNIQUE NOT NULL,
  short_description  text,
  description        text,
  location           text,
  address            text,
  phone              text,
  email              text,
  cover_image_url    text,
  gallery_preview    jsonb NOT NULL DEFAULT '[]',
  opening_hours      jsonb NOT NULL DEFAULT '{}',
  is_active          boolean NOT NULL DEFAULT true,
  sort_order         int NOT NULL DEFAULT 0,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 5: courts
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.courts (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id      uuid NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  name         text NOT NULL,
  court_type   text NOT NULL DEFAULT 'padel',
  surface      text,
  indoor       boolean NOT NULL DEFAULT true,
  hourly_price numeric NOT NULL DEFAULT 500,
  is_active    boolean NOT NULL DEFAULT true,
  sort_order   int NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 6: bookings
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  court_id     uuid NOT NULL REFERENCES public.courts(id) ON DELETE RESTRICT,
  booking_date date NOT NULL,
  start_time   time NOT NULL,
  end_time     time NOT NULL,
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','confirmed','cancelled','completed')),
  total_price  numeric NOT NULL DEFAULT 0,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 7: booking_slots
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.booking_slots (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  court_id     uuid NOT NULL REFERENCES public.courts(id) ON DELETE CASCADE,
  slot_date    date NOT NULL,
  start_time   time NOT NULL,
  end_time     time NOT NULL,
  is_available boolean NOT NULL DEFAULT true,
  source       text NOT NULL DEFAULT 'system',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (court_id, slot_date, start_time)
);

-- =============================================================================
-- TABLE 8: tournaments
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tournaments (
  id                    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id               uuid NOT NULL REFERENCES public.clubs(id) ON DELETE RESTRICT,
  name                  text NOT NULL,
  slug                  text UNIQUE NOT NULL,
  description           text,
  cover_image_url       text,
  start_date            date,
  end_date              date,
  registration_deadline timestamptz,
  status                text NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','published','open','closed','ongoing','completed')),
  tournament_type       text,
  prize_pool            numeric NOT NULL DEFAULT 0,
  is_featured           boolean NOT NULL DEFAULT false,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 9: tournament_events
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tournament_events (
  id                    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id         uuid NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  category              text NOT NULL,
  gender_scope          text,
  max_teams             int NOT NULL DEFAULT 16,
  entry_fee             numeric NOT NULL DEFAULT 0,
  format_notes          text,
  draw_size             int NOT NULL DEFAULT 16,
  is_registration_open  boolean NOT NULL DEFAULT false,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 10: registrations
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id         uuid NOT NULL REFERENCES public.tournament_events(id) ON DELETE CASCADE,
  player_1_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  player_2_id      uuid REFERENCES public.profiles(id) ON DELETE RESTRICT,
  team_name        text,
  seed             int,
  status           text NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','approved','waitlist','rejected','withdrawn')),
  paid             boolean NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 11: matches
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.matches (
  id                       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id                 uuid NOT NULL REFERENCES public.tournament_events(id) ON DELETE CASCADE,
  round_label              text,
  side_a_registration_id   uuid REFERENCES public.registrations(id) ON DELETE SET NULL,
  side_b_registration_id   uuid REFERENCES public.registrations(id) ON DELETE SET NULL,
  scheduled_at             timestamptz,
  court_id                 uuid REFERENCES public.courts(id) ON DELETE SET NULL,
  winner_registration_id   uuid REFERENCES public.registrations(id) ON DELETE SET NULL,
  score_summary            text,
  match_status             text NOT NULL DEFAULT 'scheduled'
                             CHECK (match_status IN ('scheduled','live','completed','walkover','cancelled')),
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 12: match_sets
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.match_sets (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id     uuid NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  set_number   int NOT NULL,
  side_a_games int NOT NULL DEFAULT 0,
  side_b_games int NOT NULL DEFAULT 0,
  tiebreak_a   int,
  tiebreak_b   int,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 13: membership_plans
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.membership_plans (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           text NOT NULL,
  slug           text UNIQUE NOT NULL,
  tier           text NOT NULL CHECK (tier IN ('basic','premium','elite')),
  price          numeric NOT NULL,
  billing_period text NOT NULL DEFAULT 'monthly',
  description    text,
  features       jsonb NOT NULL DEFAULT '[]',
  is_active      boolean NOT NULL DEFAULT true,
  sort_order     int NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 14: gallery_items
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         text,
  category      text CHECK (category IN ('winners','club_life','events')),
  image_url     text NOT NULL,
  club_id       uuid REFERENCES public.clubs(id) ON DELETE SET NULL,
  tournament_id uuid REFERENCES public.tournaments(id) ON DELETE SET NULL,
  is_published  boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- TABLE 15: event_inquiries
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.event_inquiries (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_type     text NOT NULL CHECK (inquiry_type IN ('corporate','private','team_building')),
  full_name        text NOT NULL,
  company_name     text,
  email            text NOT NULL,
  phone            text,
  preferred_date   date,
  expected_guests  int,
  message          text,
  status           text NOT NULL DEFAULT 'new'
                     CHECK (status IN ('new','contacted','quoted','closed')),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id       ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id       ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_courts_club_id           ON public.courts(club_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id         ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_court_id        ON public.bookings(court_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date            ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_booking_slots_court_date ON public.booking_slots(court_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_tournaments_club_id      ON public.tournaments(club_id);
CREATE INDEX IF NOT EXISTS idx_tournaments_status       ON public.tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tour_events_tournament   ON public.tournament_events(tournament_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event      ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_player1    ON public.registrations(player_1_id);
CREATE INDEX IF NOT EXISTS idx_matches_event            ON public.matches(event_id);
CREATE INDEX IF NOT EXISTS idx_match_sets_match         ON public.match_sets(match_id);
CREATE INDEX IF NOT EXISTS idx_gallery_items_published  ON public.gallery_items(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category   ON public.gallery_items(category);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================
CREATE OR REPLACE FUNCTION public.has_role(p_role text)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1
    FROM   public.user_roles ur
    JOIN   public.roles       r  ON r.id = ur.role_id
    WHERE  ur.user_id = auth.uid()
    AND    r.role_key = p_role
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1
    FROM   public.user_roles ur
    JOIN   public.roles       r  ON r.id = ur.role_id
    WHERE  ur.user_id = auth.uid()
    AND    r.role_key IN ('super_admin','admin','staff')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =============================================================================
-- FUNCTION 1: update_updated_at (trigger helper)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- FUNCTION 2: check_booking_overlap (trigger)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.check_booking_overlap()
RETURNS trigger AS $$
DECLARE
  overlap_count int;
BEGIN
  SELECT COUNT(*) INTO overlap_count
  FROM   public.bookings
  WHERE  court_id     = NEW.court_id
  AND    booking_date = NEW.booking_date
  AND    status       NOT IN ('cancelled')
  AND    id           <> COALESCE(NEW.id, uuid_generate_v4())
  AND    (
           (NEW.start_time, NEW.end_time)
           OVERLAPS
           (start_time, end_time)
         );

  IF overlap_count > 0 THEN
    RAISE EXCEPTION 'Booking overlap detected: court % is already booked for % between % and %',
      NEW.court_id, NEW.booking_date, NEW.start_time, NEW.end_time
      USING ERRCODE = 'exclusion_violation';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- FUNCTION 3: calculate_booking_total (utility)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.calculate_booking_total(
  p_court_id uuid,
  p_start    time,
  p_end      time
)
RETURNS numeric AS $$
DECLARE
  v_price    numeric;
  v_hours    numeric;
BEGIN
  SELECT hourly_price INTO v_price
  FROM   public.courts
  WHERE  id = p_court_id;

  IF v_price IS NULL THEN
    RAISE EXCEPTION 'Court not found: %', p_court_id;
  END IF;

  v_hours := EXTRACT(EPOCH FROM (p_end - p_start)) / 3600.0;

  IF v_hours <= 0 THEN
    RAISE EXCEPTION 'end_time must be after start_time';
  END IF;

  RETURN ROUND(v_price * v_hours, 2);
END;
$$ LANGUAGE plpgsql STABLE;

-- =============================================================================
-- FUNCTION 4: get_player_ranking_stats
-- =============================================================================
CREATE OR REPLACE FUNCTION public.get_player_ranking_stats(p_player_id uuid)
RETURNS TABLE(
  matches_played  int,
  matches_won     int,
  matches_lost    int,
  win_rate        numeric,
  ranking_points  int
) AS $$
BEGIN
  RETURN QUERY
  WITH player_regs AS (
    SELECT r.id AS reg_id
    FROM   public.registrations r
    WHERE  (r.player_1_id = p_player_id OR r.player_2_id = p_player_id)
    AND    r.status = 'approved'
  ),
  player_matches AS (
    SELECT
      m.id,
      CASE WHEN m.winner_registration_id IN (SELECT reg_id FROM player_regs) THEN 1 ELSE 0 END AS won,
      CASE WHEN m.match_status = 'completed'
                AND m.winner_registration_id NOT IN (SELECT reg_id FROM player_regs)
                AND (m.side_a_registration_id IN (SELECT reg_id FROM player_regs)
                     OR m.side_b_registration_id IN (SELECT reg_id FROM player_regs))
           THEN 1 ELSE 0 END AS lost
    FROM public.matches m
    WHERE m.match_status = 'completed'
    AND   (m.side_a_registration_id IN (SELECT reg_id FROM player_regs)
           OR m.side_b_registration_id IN (SELECT reg_id FROM player_regs))
  )
  SELECT
    COUNT(*)::int                                                        AS matches_played,
    SUM(won)::int                                                        AS matches_won,
    SUM(lost)::int                                                       AS matches_lost,
    CASE WHEN COUNT(*) = 0 THEN 0
         ELSE ROUND((SUM(won)::numeric / COUNT(*)::numeric) * 100, 1)
    END                                                                   AS win_rate,
    (SUM(won) * 10 + (SELECT COUNT(*) FROM player_regs))::int           AS ranking_points
  FROM player_matches;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- =============================================================================
-- FUNCTION 5: get_available_slots
-- =============================================================================
CREATE OR REPLACE FUNCTION public.get_available_slots(
  p_club_id uuid,
  p_date    date
)
RETURNS TABLE(
  slot_id     uuid,
  court_id    uuid,
  court_name  text,
  slot_date   date,
  start_time  time,
  end_time    time,
  is_available boolean,
  hourly_price numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    bs.id            AS slot_id,
    bs.court_id      AS court_id,
    c.name           AS court_name,
    bs.slot_date     AS slot_date,
    bs.start_time    AS start_time,
    bs.end_time      AS end_time,
    bs.is_available  AS is_available,
    c.hourly_price   AS hourly_price
  FROM   public.booking_slots bs
  JOIN   public.courts         c  ON c.id = bs.court_id
  WHERE  c.club_id       = p_club_id
  AND    bs.slot_date    = p_date
  AND    bs.is_available = true
  AND    c.is_active     = true
  AND    NOT EXISTS (
    SELECT 1
    FROM   public.bookings b
    WHERE  b.court_id     = bs.court_id
    AND    b.booking_date = bs.slot_date
    AND    b.status       IN ('pending','confirmed')
    AND    (b.start_time, b.end_time) OVERLAPS (bs.start_time, bs.end_time)
  )
  ORDER BY c.sort_order, bs.start_time;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- =============================================================================
-- FUNCTION 6: approve_registration
-- =============================================================================
CREATE OR REPLACE FUNCTION public.approve_registration(p_registration_id uuid)
RETURNS void AS $$
DECLARE
  v_event_id  uuid;
  v_max_teams int;
  v_approved  int;
BEGIN
  SELECT event_id INTO v_event_id
  FROM   public.registrations
  WHERE  id = p_registration_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration not found: %', p_registration_id;
  END IF;

  SELECT max_teams INTO v_max_teams
  FROM   public.tournament_events
  WHERE  id = v_event_id;

  SELECT COUNT(*) INTO v_approved
  FROM   public.registrations
  WHERE  event_id = v_event_id
  AND    status   = 'approved';

  IF v_approved >= v_max_teams THEN
    RAISE EXCEPTION 'Event is full: max_teams=% already reached for event %',
      v_max_teams, v_event_id;
  END IF;

  UPDATE public.registrations
  SET    status     = 'approved',
         updated_at = NOW()
  WHERE  id = p_registration_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- TRIGGER FUNCTION: auto-set total_price on booking insert
-- =============================================================================
CREATE OR REPLACE FUNCTION public.set_booking_total_price()
RETURNS trigger AS $$
BEGIN
  NEW.total_price := public.calculate_booking_total(NEW.court_id, NEW.start_time, NEW.end_time);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TRIGGER FUNCTION: on_auth_user_created → insert profile
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- TRIGGER 1: tr_updated_at — attached to all mutable tables
-- =============================================================================
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'profiles','clubs','courts','bookings','booking_slots',
    'tournaments','tournament_events','registrations','matches',
    'membership_plans','gallery_items','event_inquiries'
  ] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS tr_updated_at ON public.%I;
       CREATE TRIGGER tr_updated_at
         BEFORE UPDATE ON public.%I
         FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- =============================================================================
-- TRIGGER 2: tr_booking_overlap — BEFORE INSERT OR UPDATE on bookings
-- =============================================================================
DROP TRIGGER IF EXISTS tr_booking_overlap ON public.bookings;
CREATE TRIGGER tr_booking_overlap
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.check_booking_overlap();

-- =============================================================================
-- TRIGGER 3: tr_booking_price — BEFORE INSERT on bookings
-- =============================================================================
DROP TRIGGER IF EXISTS tr_booking_price ON public.bookings;
CREATE TRIGGER tr_booking_price
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_total_price();

-- =============================================================================
-- TRIGGER 4: on_auth_user_created
-- =============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- VIEW 1: v_public_rankings
-- =============================================================================
CREATE OR REPLACE VIEW public.v_public_rankings AS
WITH player_regs AS (
  SELECT
    r.id         AS reg_id,
    r.player_1_id AS player_id
  FROM public.registrations r
  WHERE r.status = 'approved'
  UNION ALL
  SELECT
    r.id          AS reg_id,
    r.player_2_id AS player_id
  FROM public.registrations r
  WHERE r.status = 'approved'
  AND   r.player_2_id IS NOT NULL
),
match_stats AS (
  SELECT
    pr.player_id,
    COUNT(DISTINCT m.id)                                                AS matches_played,
    COUNT(DISTINCT m.id) FILTER (WHERE m.winner_registration_id = pr.reg_id) AS matches_won,
    COUNT(DISTINCT m.id) FILTER (
      WHERE m.match_status = 'completed'
      AND   m.winner_registration_id <> pr.reg_id
    )                                                                   AS matches_lost
  FROM   player_regs        pr
  JOIN   public.matches m
    ON   (m.side_a_registration_id = pr.reg_id OR m.side_b_registration_id = pr.reg_id)
    AND  m.match_status = 'completed'
  GROUP  BY pr.player_id
),
reg_counts AS (
  SELECT player_id, COUNT(*) AS total_regs
  FROM   player_regs
  GROUP  BY player_id
)
SELECT
  p.id                                                                AS player_id,
  p.full_name                                                         AS player_name,
  p.avatar_url,
  COALESCE(ms.matches_played, 0)::int                                AS matches_played,
  COALESCE(ms.matches_won,    0)::int                                AS matches_won,
  COALESCE(ms.matches_lost,   0)::int                                AS matches_lost,
  CASE WHEN COALESCE(ms.matches_played, 0) = 0 THEN 0
       ELSE ROUND((ms.matches_won::numeric / ms.matches_played) * 100, 1)
  END                                                                 AS win_rate,
  (COALESCE(ms.matches_won, 0) * 10 + COALESCE(rc.total_regs, 0))::int AS ranking_points
FROM        public.profiles p
LEFT JOIN   match_stats      ms  ON ms.player_id = p.id
LEFT JOIN   reg_counts       rc  ON rc.player_id = p.id
WHERE  p.status = 'active'
ORDER  BY ranking_points DESC;

-- =============================================================================
-- VIEW 2: v_tournament_cards
-- =============================================================================
CREATE OR REPLACE VIEW public.v_tournament_cards AS
SELECT
  t.id                AS tournament_id,
  t.slug,
  t.name,
  cl.name             AS club_name,
  cl.slug             AS club_slug,
  t.cover_image_url,
  t.start_date,
  t.end_date,
  t.status,
  t.tournament_type,
  COUNT(te.id)::int   AS events_count,
  t.prize_pool,
  t.is_featured
FROM      public.tournaments       t
JOIN      public.clubs             cl ON cl.id = t.club_id
LEFT JOIN public.tournament_events te ON te.tournament_id = t.id
GROUP BY
  t.id, t.slug, t.name, cl.name, cl.slug,
  t.cover_image_url, t.start_date, t.end_date,
  t.status, t.tournament_type, t.prize_pool, t.is_featured;

-- =============================================================================
-- VIEW 3: v_club_booking_summary
-- =============================================================================
CREATE OR REPLACE VIEW public.v_club_booking_summary AS
SELECT
  cl.id                                    AS club_id,
  cl.name                                  AS club_name,
  cl.slug,
  COUNT(DISTINCT c.id) FILTER (WHERE c.is_active = true)::int AS active_courts_count,
  MIN(c.hourly_price)                      AS min_hourly_price
FROM      public.clubs  cl
LEFT JOIN public.courts c ON c.club_id = cl.id
GROUP BY  cl.id, cl.name, cl.slug;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_slots     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournaments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_sets        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_inquiries   ENABLE ROW LEVEL SECURITY;

-- ── profiles ──────────────────────────────────────────────────────────────────
CREATE POLICY "profiles_select_own"   ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_staff());

CREATE POLICY "profiles_update_own"   ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_all"    ON public.profiles
  FOR ALL USING (public.is_staff());

-- ── roles ─────────────────────────────────────────────────────────────────────
CREATE POLICY "roles_admin_all" ON public.roles
  FOR ALL USING (public.is_staff());

CREATE POLICY "roles_public_read" ON public.roles
  FOR SELECT USING (true);

-- ── user_roles ────────────────────────────────────────────────────────────────
CREATE POLICY "user_roles_admin_all" ON public.user_roles
  FOR ALL USING (public.is_staff());

CREATE POLICY "user_roles_own_read" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

-- ── clubs ─────────────────────────────────────────────────────────────────────
CREATE POLICY "clubs_public_read" ON public.clubs
  FOR SELECT USING (is_active = true);

CREATE POLICY "clubs_admin_all" ON public.clubs
  FOR ALL USING (public.is_staff());

-- ── courts ────────────────────────────────────────────────────────────────────
CREATE POLICY "courts_public_read" ON public.courts
  FOR SELECT USING (is_active = true);

CREATE POLICY "courts_admin_all" ON public.courts
  FOR ALL USING (public.is_staff());

-- ── bookings ──────────────────────────────────────────────────────────────────
CREATE POLICY "bookings_own_read" ON public.bookings
  FOR SELECT USING (user_id = auth.uid() OR public.is_staff());

CREATE POLICY "bookings_auth_insert" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "bookings_own_update" ON public.bookings
  FOR UPDATE USING (user_id = auth.uid() OR public.is_staff());

CREATE POLICY "bookings_admin_delete" ON public.bookings
  FOR DELETE USING (public.is_staff());

-- ── booking_slots ─────────────────────────────────────────────────────────────
CREATE POLICY "slots_public_read" ON public.booking_slots
  FOR SELECT USING (true);

CREATE POLICY "slots_auth_write" ON public.booking_slots
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "slots_admin_all" ON public.booking_slots
  FOR ALL USING (public.is_staff());

-- ── tournaments ───────────────────────────────────────────────────────────────
CREATE POLICY "tournaments_public_read" ON public.tournaments
  FOR SELECT USING (status NOT IN ('draft'));

CREATE POLICY "tournaments_admin_all" ON public.tournaments
  FOR ALL USING (public.is_staff());

-- ── tournament_events ─────────────────────────────────────────────────────────
CREATE POLICY "tour_events_public_read" ON public.tournament_events
  FOR SELECT USING (true);

CREATE POLICY "tour_events_admin_all" ON public.tournament_events
  FOR ALL USING (public.is_staff());

-- ── registrations ─────────────────────────────────────────────────────────────
CREATE POLICY "regs_own_read" ON public.registrations
  FOR SELECT USING (player_1_id = auth.uid() OR player_2_id = auth.uid() OR public.is_staff());

CREATE POLICY "regs_auth_insert" ON public.registrations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND player_1_id = auth.uid());

CREATE POLICY "regs_admin_all" ON public.registrations
  FOR ALL USING (public.is_staff());

-- ── matches ───────────────────────────────────────────────────────────────────
CREATE POLICY "matches_public_read" ON public.matches
  FOR SELECT USING (true);

CREATE POLICY "matches_admin_write" ON public.matches
  FOR ALL USING (public.is_staff());

-- ── match_sets ────────────────────────────────────────────────────────────────
CREATE POLICY "match_sets_public_read" ON public.match_sets
  FOR SELECT USING (true);

CREATE POLICY "match_sets_admin_write" ON public.match_sets
  FOR ALL USING (public.is_staff());

-- ── membership_plans ──────────────────────────────────────────────────────────
CREATE POLICY "plans_public_read" ON public.membership_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "plans_admin_all" ON public.membership_plans
  FOR ALL USING (public.is_staff());

-- ── gallery_items ─────────────────────────────────────────────────────────────
CREATE POLICY "gallery_public_read" ON public.gallery_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "gallery_admin_all" ON public.gallery_items
  FOR ALL USING (public.is_staff());

-- ── event_inquiries ───────────────────────────────────────────────────────────
CREATE POLICY "inquiries_anyone_insert" ON public.event_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "inquiries_admin_all" ON public.event_inquiries
  FOR ALL USING (public.is_staff());

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- ── Roles (5) ─────────────────────────────────────────────────────────────────
INSERT INTO public.roles (role_key, label) VALUES
  ('super_admin', 'Super Administrator'),
  ('admin',       'Administrator'),
  ('staff',       'Staff Member'),
  ('member',      'Club Member'),
  ('viewer',      'Viewer')
ON CONFLICT (role_key) DO NOTHING;

-- ── Clubs (2) ─────────────────────────────────────────────────────────────────
INSERT INTO public.clubs (
  id, name, slug, short_description, description,
  location, address, phone, email,
  cover_image_url, gallery_preview, opening_hours, is_active, sort_order
) VALUES
(
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Urban Sport Grand Baie',
  'grand-baie',
  'Premier padel destination in the North',
  'Urban Sport Grand Baie is the ultimate padel experience in the north of Mauritius. Featuring 3 championship-grade courts, professional coaching, and a vibrant social atmosphere.',
  'Grand Baie, Rivière du Rempart',
  'Royal Road, Grand Baie, Mauritius',
  '268 2942',
  'grandbaie@urbansport.mu',
  '/clubs/grand-baie/grand-baie-aerial.jpeg',
  '["/clubs/grand-baie/grand-baie-aerial.jpeg","/gallery/grand-baie-calendar.jpeg","/marketing/ghost-padel-grand-baie.png"]',
  '{"monday":{"open":"07:00","close":"22:00"},"tuesday":{"open":"07:00","close":"22:00"},"wednesday":{"open":"07:00","close":"22:00"},"thursday":{"open":"07:00","close":"22:00"},"friday":{"open":"07:00","close":"23:00"},"saturday":{"open":"08:00","close":"23:00"},"sunday":{"open":"08:00","close":"21:00"}}',
  true,
  1
),
(
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Urban Sport Black River',
  'black-river',
  'West coast padel excellence',
  'Urban Sport Black River brings world-class padel to the beautiful west coast of Mauritius. Three state-of-the-art courts overlooking the mountains with full amenities.',
  'Black River, Rivière Noire',
  'Coastal Road, Black River, Mauritius',
  '484 5336',
  'blackriver@urbansport.mu',
  '/clubs/black-river/black-river-aerial-master.png',
  '["/clubs/black-river/black-river-aerial-master.png","/gallery/black-river-poster-board.jpeg","/gallery/season-calendar.jpeg"]',
  '{"monday":{"open":"07:00","close":"22:00"},"tuesday":{"open":"07:00","close":"22:00"},"wednesday":{"open":"07:00","close":"22:00"},"thursday":{"open":"07:00","close":"22:00"},"friday":{"open":"07:00","close":"23:00"},"saturday":{"open":"08:00","close":"23:00"},"sunday":{"open":"08:00","close":"21:00"}}',
  true,
  2
)
ON CONFLICT (slug) DO NOTHING;

-- ── Courts – Grand Baie (3) ────────────────────────────────────────────────────
INSERT INTO public.courts (
  id, club_id, name, court_type, surface, indoor, hourly_price, is_active, sort_order
) VALUES
(
  'b1b2c3d4-0001-0001-0001-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Court 1 – Diamond', 'padel', 'panoramic_glass', true,  500, true, 1
),
(
  'b1b2c3d4-0001-0001-0001-000000000002',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Court 2 – Sapphire', 'padel', 'artificial_grass', true, 600, true, 2
),
(
  'b1b2c3d4-0001-0001-0001-000000000003',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Court 3 – Ruby',    'padel', 'artificial_grass', false, 700, true, 3
)
ON CONFLICT DO NOTHING;

-- ── Courts – Black River (3) ──────────────────────────────────────────────────
INSERT INTO public.courts (
  id, club_id, name, court_type, surface, indoor, hourly_price, is_active, sort_order
) VALUES
(
  'b1b2c3d4-0002-0002-0002-000000000001',
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Court A – Emerald',  'padel', 'panoramic_glass', true,  500, true, 1
),
(
  'b1b2c3d4-0002-0002-0002-000000000002',
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Court B – Topaz',    'padel', 'artificial_grass', true, 600, true, 2
),
(
  'b1b2c3d4-0002-0002-0002-000000000003',
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Court C – Obsidian', 'padel', 'artificial_grass', false, 700, true, 3
),
(
  'b1b2c3d4-0002-0002-0002-000000000004',
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Court D – Horizon',  'padel', 'panoramic_glass', true, 700, true, 4
)
ON CONFLICT DO NOTHING;

-- ── Membership Plans (3) ──────────────────────────────────────────────────────
INSERT INTO public.membership_plans (
  id, name, slug, tier, price, billing_period, description, features, is_active, sort_order
) VALUES
(
  'c1b2c3d4-0001-0001-0001-000000000001',
  'Basic',
  'basic',
  'basic',
  1500,
  'monthly',
  'Perfect for casual players looking to enjoy padel without commitment.',
  '[
    "Access to all courts during off-peak hours",
    "10% discount on court bookings",
    "1 free guest pass per month",
    "Access to club lounge",
    "Monthly newsletter & event updates"
  ]'::jsonb,
  true, 1
),
(
  'c1b2c3d4-0002-0002-0002-000000000002',
  'Premium',
  'premium',
  'premium',
  3500,
  'monthly',
  'For the dedicated padel player who wants priority access and exclusive perks.',
  '[
    "Priority booking – 7 days in advance",
    "20% discount on all court bookings",
    "3 free guest passes per month",
    "1 free group coaching session per month",
    "Access to both club locations",
    "Exclusive member tournaments",
    "Locker & equipment storage",
    "Monthly newsletter & event updates"
  ]'::jsonb,
  true, 2
),
(
  'c1b2c3d4-0003-0003-0003-000000000003',
  'Elite',
  'elite',
  'elite',
  7500,
  'monthly',
  'The ultimate Urban Sport experience with unlimited access and premium services.',
  '[
    "Unlimited court access – any time, any court",
    "30% discount on all court bookings",
    "Unlimited guest passes",
    "4 private coaching sessions per month",
    "Priority access to all tournaments",
    "Dedicated concierge booking service",
    "Exclusive Elite lounge access",
    "Complimentary racket restringing (1/month)",
    "Early access to new club features",
    "VIP event invitations"
  ]'::jsonb,
  true, 3
)
ON CONFLICT (slug) DO NOTHING;

-- ── Tournaments (2) ───────────────────────────────────────────────────────────
INSERT INTO public.tournaments (
  id, club_id, name, slug, description, cover_image_url,
  start_date, end_date, registration_deadline,
  status, tournament_type, prize_pool, is_featured
) VALUES
(
  'd1b2c3d4-0001-0001-0001-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Grand Baie Mixed 2026',
  'grand-baie-mixed-2026',
  'Calendar-backed mixed tournament stop derived from the 2026 Urban Sport source materials.',
  '/tournaments/season-calendar-board.jpeg',
  '2026-05-30',
  '2026-05-30',
  '2026-05-25 23:59:59+04',
  'open',
  'mixed',
  0,
  true
),
(
  'd1b2c3d4-0002-0002-0002-000000000002',
  'a1b2c3d4-0002-0002-0002-000000000002',
  'Black River M250 2026',
  'black-river-m250-2026',
  'Archive-backed Black River circuit stop based on the January 2026 poster set and season board.',
  '/clubs/black-river/black-river-aerial.jpeg',
  '2026-01-24',
  '2026-01-24',
  '2026-01-20 23:59:59+04',
  'published',
  'archive',
  0,
  false
)
ON CONFLICT (slug) DO NOTHING;

-- ── Tournament Events ─────────────────────────────────────────────────────────
INSERT INTO public.tournament_events (
  tournament_id, category, gender_scope, max_teams, entry_fee,
  format_notes, draw_size, is_registration_open
) VALUES
(
  'd1b2c3d4-0001-0001-0001-000000000001',
  'Open Men', 'male', 16, 1500,
  'Best of 3 sets, super tiebreak at 1-1', 16, true
),
(
  'd1b2c3d4-0001-0001-0001-000000000001',
  'Open Women', 'female', 8, 1500,
  'Best of 3 sets, super tiebreak at 1-1', 8, true
),
(
  'd1b2c3d4-0001-0001-0001-000000000001',
  'Mixed Open', 'mixed', 8, 2000,
  'Best of 3 sets, super tiebreak at 1-1', 8, true
),
(
  'd1b2c3d4-0002-0002-0002-000000000002',
  'Mixed Doubles', 'mixed', 12, 1000,
  'Round robin groups then knockout', 12, false
)
ON CONFLICT DO NOTHING;

-- ── Gallery Items (5) ─────────────────────────────────────────────────────────
INSERT INTO public.gallery_items (
  title, category, image_url, club_id, tournament_id, is_published, display_order
) VALUES
(
  'Open 2025 Champions',
  'winners',
  '/images/gallery/champions-2025.jpg',
  'a1b2c3d4-0001-0001-0001-000000000001',
  NULL,
  true, 1
),
(
  'Grand Baie Club Life',
  'club_life',
  '/images/gallery/gb-club-life.jpg',
  'a1b2c3d4-0001-0001-0001-000000000001',
  NULL,
  true, 2
),
(
  'Black River Training Day',
  'club_life',
  '/images/gallery/br-training.jpg',
  'a1b2c3d4-0002-0002-0002-000000000002',
  NULL,
  true, 3
),
(
  'Beach Cup 2025 Finals',
  'events',
  '/images/gallery/beach-cup-finals.jpg',
  'a1b2c3d4-0002-0002-0002-000000000002',
  NULL,
  true, 4
),
(
  'Corporate Day – TechCorp',
  'events',
  '/images/gallery/corporate-day.jpg',
  'a1b2c3d4-0001-0001-0001-000000000001',
  NULL,
  true, 5
)
ON CONFLICT DO NOTHING;

-- ── Event Inquiries (3 samples) ────────────────────────────────────────────────
INSERT INTO public.event_inquiries (
  inquiry_type, full_name, company_name, email, phone,
  preferred_date, expected_guests, message, status
) VALUES
(
  'corporate',
  'Sarah Thompson',
  'TechCorp Mauritius',
  'sarah.thompson@techcorp.mu',
  '+230 5700 1001',
  '2026-05-20',
  30,
  'We are looking to organise a corporate padel day for our team as part of our Q2 team-building programme. We would need 3 courts for the full day.',
  'contacted'
),
(
  'team_building',
  'Marc Lefebvre',
  'Island Finance Group',
  'marc.lefebvre@ifg.mu',
  '+230 5700 1002',
  '2026-06-10',
  20,
  'Team building event for 20 colleagues, half day preferred. BBQ catering if available.',
  'new'
),
(
  'private',
  'Priya Naidoo',
  NULL,
  'priya.naidoo@gmail.com',
  '+230 5700 1003',
  '2026-05-30',
  12,
  'Birthday padel tournament for 12 friends. Looking for 2 courts for 3 hours with a small prize ceremony.',
  'new'
)
ON CONFLICT DO NOTHING;

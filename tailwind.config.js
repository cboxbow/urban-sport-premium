/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      colors: {
        // ── Brand ──────────────────────────────────────────────
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#fdf8ed',
          100: '#f9eecc',
          200: '#f3da8a',
          300: '#E8C96A',
          400: '#C9A84C',
          500: '#A8882E',
          600: '#8a6e22',
          700: '#6e571b',
          800: '#534213',
          900: '#3a2e0d',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          50:  '#181818',
          100: '#141414',
          200: '#111111',
          300: '#0E0E0E',
          400: '#0A0A0A',
          500: '#080808',
          card:   '#161616',
          muted:  '#1E1E1E',
          border: '#262626',
        },
        // ── Shadcn semantic tokens ─────────────────────────────
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      fontFamily: {
        display: ['var(--font-bebas)', 'Bebas Neue', 'sans-serif'],
        sans:    ['var(--font-inter)',  'Inter', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.8' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-up':        'fade-up 0.5s ease-out forwards',
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'slide-right':    'slide-right 0.4s ease-out forwards',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        shimmer:          'shimmer 2s linear infinite',
        marquee:          'marquee 30s linear infinite',
        'scale-in':       'scale-in 0.3s ease-out forwards',
      },

      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #E8C96A 45%, #A8882E 100%)',
        'gold-soft':        'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)',
        'surface-gradient': 'linear-gradient(180deg, #111111 0%, #0A0A0A 100%)',
        'hero-overlay':     'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,1) 100%)',
        'card-shine':       'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
      },

      boxShadow: {
        'gold-sm':    '0 0 12px rgba(201,168,76,0.2)',
        'gold-md':    '0 0 24px rgba(201,168,76,0.3)',
        'gold-lg':    '0 0 48px rgba(201,168,76,0.4)',
        'gold-glow':  '0 0 0 1px rgba(201,168,76,0.3), 0 4px 20px rgba(201,168,76,0.15)',
        'card':       '0 1px 3px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.2)',
        'glass':      '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-gold': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.2), inset 0 1px 0 rgba(201,168,76,0.08)',
        'inner-gold': 'inset 0 0 0 1px rgba(201,168,76,0.2)',
        'premium':    '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

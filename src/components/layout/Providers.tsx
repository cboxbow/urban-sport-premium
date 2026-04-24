'use client';

import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ bottom: 32, right: 24 }}
        toastOptions={{
          duration: 4000,
          style: {
            background:   '#161616',
            color:        'rgba(255,255,255,0.88)',
            border:       '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding:      '14px 18px',
            fontSize:     '14px',
            fontFamily:   'var(--font-inter), Inter, system-ui, sans-serif',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            maxWidth:     '380px',
          },
          success: {
            iconTheme: {
              primary:    '#C9A84C',
              secondary:  '#0A0A0A',
            },
            style: {
              background: '#161616',
              border:     '1px solid rgba(201,168,76,0.25)',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)',
            },
          },
          error: {
            iconTheme: {
              primary:    '#f87171',
              secondary:  '#0A0A0A',
            },
            style: {
              background: '#161616',
              border:     '1px solid rgba(248,113,113,0.25)',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(248,113,113,0.12)',
            },
          },
          loading: {
            iconTheme: {
              primary:    'rgba(201,168,76,0.7)',
              secondary:  'rgba(201,168,76,0.15)',
            },
          },
        }}
      />
    </>
  );
}

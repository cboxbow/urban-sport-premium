import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { getSiteSettings } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://urbansport.mu'),
    title: {
      default: settings.seoDefaults.title,
      template: `%s | ${settings.seoDefaults.title}`,
    },
    description: settings.seoDefaults.description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://urbansport.mu',
      siteName: settings.siteTitle,
      title: settings.seoDefaults.title,
      description: settings.seoDefaults.description,
      images: [
        {
          url: '/clubs/black-river/black-river-aerial-master.png',
          width: 1200,
          height: 1200,
          alt: settings.siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seoDefaults.title,
      description: settings.seoDefaults.description,
      images: ['/clubs/black-river/black-river-aerial-master.png'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

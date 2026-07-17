import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';
import './globals.css';

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] });
const body = Manrope({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Kyagulanyi Ministries | Hope in Action', template: '%s | Kyagulanyi Ministries' },
  description: 'A Christ-centered ministry transforming lives and communities through faith, compassion, education, and sustainable development.',
  openGraph: { title: 'Kyagulanyi Ministries', description: 'Faith that moves. Love that serves. Hope that lasts.', type: 'website', locale: 'en_UG' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Browser extensions may add attributes to body before hydration (for example cz-shortcut-listen). */}
      <body suppressHydrationWarning className={`${display.variable} ${body.variable}`} style={{ fontFamily: 'var(--font-body)' }}>
        <Providers><Header />{children}<Footer /></Providers>
      </body>
    </html>
  );
}

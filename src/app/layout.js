import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { site, socials } from '@/config/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const title = `${site.name} — ${site.role}`;
const description =
  'Portfolio of Suwan Sankaja — Data Engineer and Computer Science & Engineering graduate from the University of Moratuwa, building data pipelines, AI/ML systems and full-stack products.';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#05050b',
};

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    'Suwan Sankaja',
    'Data Engineer',
    'AI/ML',
    'Machine Learning',
    'Data Engineering',
    'Full-Stack Developer',
    'University of Moratuwa',
    'Sri Lanka',
    'Portfolio',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  icons: { icon: site.logo, apple: site.logo },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    type: 'profile',
    locale: 'en_US',
    images: [{ url: site.portrait, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@SuwanSankaja',
    images: [site.portrait],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: site.portrait,
  jobTitle: 'Data Engineer',
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Moratuwa' },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{'.reveal,.fade-in,[class*="char"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

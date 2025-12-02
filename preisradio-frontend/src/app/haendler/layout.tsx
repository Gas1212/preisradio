import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Händler | Preisradio',
  description: 'Alle Partner-Händler und Shops',
  alternates: {
    canonical: `${baseUrl}/haendler`,
    languages: {
      'de-DE': `${baseUrl}/haendler`,
      'x-default': `${baseUrl}/haendler`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

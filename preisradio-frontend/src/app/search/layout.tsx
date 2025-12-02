import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Produktsuche | Preisradio',
  description: 'Suchen Sie Produkte und vergleichen Sie Preise',
  alternates: {
    canonical: `${baseUrl}/search`,
    languages: {
      'de-DE': `${baseUrl}/search`,
      'x-default': `${baseUrl}/search`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

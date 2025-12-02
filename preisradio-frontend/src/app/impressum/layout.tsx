import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Impressum | Preisradio',
  description: 'Impressum und rechtliche Informationen',
  alternates: {
    canonical: `${baseUrl}/impressum`,
    languages: {
      'de-DE': `${baseUrl}/impressum`,
      'x-default': `${baseUrl}/impressum`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Datenschutz | Preisradio',
  description: 'Datenschutzerklärung',
  alternates: {
    canonical: `${baseUrl}/datenschutz`,
    languages: {
      'de-DE': `${baseUrl}/datenschutz`,
      'x-default': `${baseUrl}/datenschutz`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

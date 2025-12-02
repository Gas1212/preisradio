import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Kontakt | Preisradio',
  description: 'Kontaktieren Sie uns',
  alternates: {
    canonical: `${baseUrl}/kontakt`,
    languages: {
      'de-DE': `${baseUrl}/kontakt`,
      'x-default': `${baseUrl}/kontakt`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

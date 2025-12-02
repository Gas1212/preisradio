import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Alle Kategorien | Preisradio',
  description: 'Durchsuchen Sie unsere Produktkategorien und finden Sie die besten Angebote',
  alternates: {
    canonical: `${baseUrl}/kategorien`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

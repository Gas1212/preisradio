import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Alle Kategorien: Finde die günstigsten Preise online',
  description: 'Durchsuchen Sie unsere Produktkategorien und finden Sie die besten Angebote im Preisvergleich',
  alternates: {
    canonical: `${baseUrl}/kategorien`,
    languages: {
      'de-DE': `${baseUrl}/kategorien`,
      'x-default': `${baseUrl}/kategorien`,
    },
  },
  openGraph: {
    title: 'Alle Kategorien | Preisradio',
    description: 'Durchsuchen Sie unsere Produktkategorien und finden Sie die besten Angebote im Preisvergleich',
    url: `${baseUrl}/kategorien`,
    type: 'website',
    images: [{
      url: `${baseUrl}/favicon.ico`,
      width: 512,
      height: 512,
      alt: 'Preisradio Kategorien',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Alle Kategorien | Preisradio',
    description: 'Durchsuchen Sie unsere Produktkategorien und finden Sie die besten Angebote',
    images: [`${baseUrl}/favicon.ico`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const collectionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Produktkategorien',
    description: 'Alle Produktkategorien im Preisradio Preisvergleich',
    url: `${baseUrl}/kategorien`,
    inLanguage: 'de',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionsSchema),
        }}
      />
      {children}
    </>
  );
}

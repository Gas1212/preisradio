import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Händler | Preisradio',
  description: 'Alle Partner-Händler und Shops - Saturn und MediaMarkt Preisvergleich',
  alternates: {
    canonical: `${baseUrl}/haendler`,
    languages: {
      'de-DE': `${baseUrl}/haendler`,
      'x-default': `${baseUrl}/haendler`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const collectionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Partner-Händler und Shops',
    description: 'Alle Partner-Händler und Shops im Preisradio Preisvergleich',
    url: `${baseUrl}/haendler`,
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

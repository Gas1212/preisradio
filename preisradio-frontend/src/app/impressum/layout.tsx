import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Impressum | Preisradio',
  description: 'Impressum und rechtliche Informationen von Preisradio',
  alternates: {
    canonical: `${baseUrl}/impressum`,
    languages: {
      'de-DE': `${baseUrl}/impressum`,
      'x-default': `${baseUrl}/impressum`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Preisradio',
    url: baseUrl,
    description: 'Online-Preisvergleich für Elektronikprodukte in Deutschland',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {children}
    </>
  );
}

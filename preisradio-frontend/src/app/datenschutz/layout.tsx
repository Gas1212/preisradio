import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Datenschutz | Preisradio',
  description: 'Datenschutzerklärung und Datenschutzrichtlinien von Preisradio',
  alternates: {
    canonical: `${baseUrl}/datenschutz`,
    languages: {
      'de-DE': `${baseUrl}/datenschutz`,
      'x-default': `${baseUrl}/datenschutz`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Datenschutzerklärung - Preisradio',
    description: 'Datenschutzerklärung und Datenschutzrichtlinien von Preisradio',
    url: `${baseUrl}/datenschutz`,
    inLanguage: 'de',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      {children}
    </>
  );
}

import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  title: 'Kontakt | Preisradio',
  description: 'Kontaktieren Sie Preisradio - Ihre Fragen zum Preisvergleich beantragen wir gerne.',
  alternates: {
    canonical: `${baseUrl}/kontakt`,
    languages: {
      'de-DE': `${baseUrl}/kontakt`,
      'x-default': `${baseUrl}/kontakt`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    name: 'Preisradio Kundenservice',
    url: `${baseUrl}/kontakt`,
    availableLanguage: ['de'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      {children}
    </>
  );
}

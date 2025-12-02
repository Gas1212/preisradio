import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export const metadata: Metadata = {
  alternates: {
    languages: {
      'de': `${baseUrl}/marken`,
      'x-default': `${baseUrl}/marken`,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

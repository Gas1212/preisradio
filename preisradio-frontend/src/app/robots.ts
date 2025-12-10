import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://preisradio.de';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
          '/favicon.ico',
          '/*.css$',
          '/*.js$',
        ],
        disallow: [
          '/api/',
          '/_next/data/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
          '/favicon.ico',
          '/*.css$',
          '/*.js$',
        ],
        disallow: [
          '/api/',
          '/_next/data/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
          '/favicon.ico',
          '/*.css$',
          '/*.js$',
        ],
        disallow: [
          '/api/',
          '/_next/data/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

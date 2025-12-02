import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://preisradio.de';

  const staticPages = [
    { url: baseUrl, priority: 1.0, changefreq: 'daily' },
    { url: `${baseUrl}/kategorien`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/search`, priority: 0.8, changefreq: 'always' },
    { url: `${baseUrl}/marken`, priority: 0.7, changefreq: 'weekly' },
    { url: `${baseUrl}/haendler`, priority: 0.7, changefreq: 'weekly' },
    { url: `${baseUrl}/kontakt`, priority: 0.5, changefreq: 'monthly' },
    { url: `${baseUrl}/impressum`, priority: 0.3, changefreq: 'monthly' },
    { url: `${baseUrl}/datenschutz`, priority: 0.3, changefreq: 'monthly' },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const now = new Date().toISOString().split('T')[0];

  for (const page of staticPages) {
    xml += '  <url>\n';
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}

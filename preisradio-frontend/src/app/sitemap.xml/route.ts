import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.preisradio.de';
const API_URL = `${API_BASE_URL}/api`;

export async function GET() {
  const baseUrl = 'https://preisradio.de';
  const PRODUCTS_PER_SITEMAP = 40000; // Max 50k, but use 40k for safety

  try {
    // Fetch total product count from API
    const response = await fetch(`${API_URL}/products/sitemap/?limit=1`, {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const totalProducts = data.count || 0;

    // Calculate number of sitemaps needed
    const numSitemaps = Math.ceil(totalProducts / PRODUCTS_PER_SITEMAP);

    // Build sitemap index XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages sitemap
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/sitemap-static.xml</loc>\n`;
    xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
    xml += '  </sitemap>\n';

    // Add product sitemaps
    for (let i = 1; i <= numSitemaps; i++) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${baseUrl}/sitemap-products-${i}.xml</loc>\n`;
      xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      xml += '  </sitemap>\n';
    }

    xml += '</sitemapindex>\n';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Sitemap index generation error:', error);

    // Fallback: return minimal index
    const baseUrl = 'https://preisradio.de';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/sitemap-static.xml</loc>\n`;
    xml += '  </sitemap>\n';
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/sitemap-products-1.xml</loc>\n`;
    xml += '  </sitemap>\n';
    xml += '</sitemapindex>\n';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

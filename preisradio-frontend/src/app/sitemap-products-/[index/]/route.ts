import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.preisradio.de';
const API_URL = `${API_BASE_URL}/api`;
const PRODUCTS_PER_SITEMAP = 40000;

export async function GET(
  request: Request,
  { params }: { params: { index: string } }
) {
  const baseUrl = 'https://preisradio.de';
  const pageIndex = parseInt(params.index, 10);

  if (isNaN(pageIndex) || pageIndex < 1) {
    return new NextResponse('Invalid sitemap index', { status: 400 });
  }

  try {
    // Fetch products for this sitemap chunk
    const limit = PRODUCTS_PER_SITEMAP;
    const offset = (pageIndex - 1) * PRODUCTS_PER_SITEMAP;

    const response = await fetch(
      `${API_URL}/products/sitemap/?limit=${limit + offset}`,
      {
        next: { revalidate: 86400 },
        headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
        signal: AbortSignal.timeout(60000),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const products = data.results || [];

    // Get products for this page
    const pageProducts = products.slice(offset, offset + limit);

    if (pageProducts.length === 0) {
      return new NextResponse('No products found', { status: 404 });
    }

    // Build sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const product of pageProducts) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/product/${product.id}</loc>\n`;
      xml += `    <lastmod>${product.lastModified || new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>\n';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error(`Error generating sitemap-products-${pageIndex}:`, error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

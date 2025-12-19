import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'https://api.preisradio.de/api';

// Helper function to fetch all products from all retailers
async function fetchAllProducts() {
  const [saturnResponse, mediamarktResponse, ottoResponse] = await Promise.all([
    fetch(`${API_URL}/products/?page_size=10000&retailer=saturn`, {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
    }),
    fetch(`${API_URL}/products/?page_size=10000&retailer=mediamarkt`, {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
    }),
    fetch(`${API_URL}/products/?page_size=10000&retailer=otto`, {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
    }),
  ]);

  const allProducts: any[] = [];

  if (saturnResponse.ok) {
    const data = await saturnResponse.json();
    allProducts.push(...(data.results || []));
  }
  if (mediamarktResponse.ok) {
    const data = await mediamarktResponse.json();
    allProducts.push(...(data.results || []));
  }
  if (ottoResponse.ok) {
    const data = await ottoResponse.json();
    allProducts.push(...(data.results || []));
  }

  return allProducts;
}

function generateSitemapXML(urls: { url: string; lastModified: Date; changeFrequency: string; priority: number }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = 'https://preisradio.de';

  let urls: { url: string; lastModified: Date; changeFrequency: string; priority: number }[] = [];

  try {
    // Static pages sitemap
    if (id === 'static') {
      urls = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/kategorien`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/marken`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/haendler`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/impressum`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/datenschutz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
      ];
    }

    // Products sitemap
    else if (id === 'list-products') {
      const allProducts = await fetchAllProducts();
      urls = allProducts.map((product: any) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.scraped_at ? new Date(product.scraped_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
      console.log(`✓ Generated products sitemap with ${urls.length} URLs`);
    }

    // Brands sitemap
    else if (id === 'brands') {
      const allProducts = await fetchAllProducts();
      const uniqueBrands = new Map<string, any>();

      allProducts.forEach((product: any) => {
        if (product.brand) {
          const slug = product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          if (!uniqueBrands.has(slug)) {
            uniqueBrands.set(slug, {
              slug,
              name: product.brand,
              lastModified: product.scraped_at || new Date(),
            });
          }
        }
      });

      urls = Array.from(uniqueBrands.values()).map((brand) => ({
        url: `${baseUrl}/marken/${encodeURIComponent(brand.slug)}`,
        lastModified: new Date(brand.lastModified),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
      console.log(`✓ Generated brands sitemap with ${urls.length} URLs`);
    }

    // Categories sitemap
    else if (id === 'categories') {
      const allProducts = await fetchAllProducts();
      const uniqueCategories = new Map<string, any>();

      allProducts.forEach((product: any) => {
        if (product.category) {
          const slug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          if (!uniqueCategories.has(slug)) {
            uniqueCategories.set(slug, {
              slug,
              name: product.category,
              lastModified: product.scraped_at || new Date(),
            });
          }
        }
      });

      urls = Array.from(uniqueCategories.values()).map((category) => ({
        url: `${baseUrl}/kategorien/${encodeURIComponent(category.slug)}`,
        lastModified: new Date(category.lastModified),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
      console.log(`✓ Generated categories sitemap with ${urls.length} URLs`);
    }

    const xml = generateSitemapXML(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error(`Error generating sitemap ${id}:`, error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

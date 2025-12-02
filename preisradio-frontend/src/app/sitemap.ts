import { MetadataRoute } from 'next';

// Use absolute URL for API calls during sitemap generation
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'https://api.preisradio.de/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://preisradio.de';

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/kategorien`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/haendler`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Charger les produits via endpoint sitemap optimisé
  // Note: Sitemap products are loaded dynamically at build time and runtime
  // If API is unreachable during build, static pages are returned as fallback
  try {
    const response = await fetch(
      `${API_URL}/products/sitemap/?limit=50000`,
      {
        next: { revalidate: 86400 }, // Cache 24h
        headers: {
          'User-Agent': 'Preisradio-Sitemap-Generator/1.0',
        },
        signal: AbortSignal.timeout(60000), // 60s timeout for large response
      }
    );

    if (!response.ok) {
      console.warn(`Sitemap API returned status ${response.status}`);
      return staticPages;
    }

    const data = await response.json();
    const products = data.results || [];

    if (products.length > 0) {
      const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.lastModified ? new Date(product.lastModified) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      console.log(`Sitemap: Generated ${productPages.length} product URLs`);
      return [...staticPages, ...productPages];
    }

    console.warn('Sitemap: No products returned from API');
    return staticPages;
  } catch (error) {
    console.warn('Error fetching products for sitemap, using static pages:', error);
    // Fallback to static pages only if API fails
    return staticPages;
  }
}

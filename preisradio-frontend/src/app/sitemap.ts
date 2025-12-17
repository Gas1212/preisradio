import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'https://api.preisradio.de/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://preisradio.de';

  // Static pages (no search page - it's for internal use only)
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
      url: `${baseUrl}/marken`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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

  try {
    // Fetch products for sitemap
    const productsResponse = await fetch(
      `${API_URL}/products/sitemap/?limit=30000`,
      {
        next: { revalidate: 86400 },
        headers: { 'User-Agent': 'Preisradio-SitemapGenerator/1.0' },
      }
    );

    let productPages: MetadataRoute.Sitemap = [];
    let brandPages: MetadataRoute.Sitemap = [];
    let categoryPages: MetadataRoute.Sitemap = [];

    if (productsResponse.ok) {
      const data = await productsResponse.json();
      const products = data.results || [];

      if (products.length > 0) {
        // Limit to max 30000 product URLs
        const limitedProducts = products.slice(0, 30000);

        // Generate product pages
        productPages = limitedProducts.map((product: any) => ({
          url: `${baseUrl}/product/${product.id}`,
          lastModified: product.lastModified ? new Date(product.lastModified) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));

        // Extract unique brands and create brand pages
        const uniqueBrands = new Map<string, any>();
        products.forEach((product: any) => {
          if (product.brand) {
            const slug = product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (!uniqueBrands.has(slug)) {
              uniqueBrands.set(slug, {
                slug,
                name: product.brand,
                lastModified: product.lastModified || new Date(),
              });
            }
          }
        });

        brandPages = Array.from(uniqueBrands.values()).map((brand) => ({
          url: `${baseUrl}/marken/${encodeURIComponent(brand.slug)}`,
          lastModified: new Date(brand.lastModified),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));

        // Extract unique categories and create category pages
        const uniqueCategories = new Map<string, any>();
        products.forEach((product: any) => {
          if (product.category) {
            const slug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (!uniqueCategories.has(slug)) {
              uniqueCategories.set(slug, {
                slug,
                name: product.category,
                lastModified: product.lastModified || new Date(),
              });
            }
          }
        });

        categoryPages = Array.from(uniqueCategories.values()).map((category) => ({
          url: `${baseUrl}/kategorien/${encodeURIComponent(category.slug)}`,
          lastModified: new Date(category.lastModified),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        }));
      }
    }

    return [...staticPages, ...brandPages, ...categoryPages, ...productPages];
  } catch (error) {
    console.warn('Error fetching products for sitemap:', error);
  }

  return staticPages;
}

'use client';

import { Product } from '@/lib/types';
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';

interface ProductJsonLdProps {
  product: Product;
  baseUrl: string;
}

export default function ProductJsonLd({ product, baseUrl }: ProductJsonLdProps) {
  const productSchema = generateProductSchema(product, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(product, baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

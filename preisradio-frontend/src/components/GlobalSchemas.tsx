'use client';

import {
  generateOrganizationSchema,
  generateFAQSchema,
} from '@/lib/schema';

interface GlobalSchemasProps {
  baseUrl: string;
}

export default function GlobalSchemas({ baseUrl }: GlobalSchemasProps) {
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const faqSchema = generateFAQSchema(baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

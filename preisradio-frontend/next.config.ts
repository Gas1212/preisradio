import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/sitemap/:slug.xml',
        headers: [
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=43200'
          }
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: http:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.clarity.ms https://a.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com https://api.preisradio.de https://*.google.com https://*.google-analytics.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google",
              "frame-src 'self' https://*.google.com https://*.google-analytics.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;

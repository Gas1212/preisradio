'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
import api from '@/lib/api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preisradio.de';

export default function KategorienPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 50;

  useEffect(() => {
    loadCategories();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    // Add JSON-LD for categories
    let script = document.querySelector('#categories-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'categories-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Produktkategorien',
      description: 'Alle Produktkategorien von Saturn, MediaMarkt und Otto',
      url: `${baseUrl}/kategorien`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Kategorien',
            item: `${baseUrl}/kategorien`
          }
        ]
      }
    };

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const scriptEl = document.querySelector('#categories-jsonld');
      if (scriptEl) {
        scriptEl.remove();
      }
    };
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await api.getCategories({
        search: searchQuery,
        page: currentPage,
        page_size: itemsPerPage,
      });

      setCategories(response.results);
      setTotalPages(response.total_pages);
      setTotalCount(response.count);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  function getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Laptops': '💻',
      'Gaming': '🎮',
      'Handys': '📱',
      'Kopfhörer': '🎧',
      'Fernseher': '📺',
      'Tablets': '📱',
      'Smartwatches': '⌚',
      'Kameras': '📷',
      'Waschmaschinen': '🧺',
      'Kühlschränke': '❄️',
    };

    for (const [key, icon] of Object.entries(icons)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }

    return '📦';
  }

  function getCategoryDescription(category: string): string {
    return 'Entdecken Sie unsere Produkte in dieser Kategorie';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Alle Kategorien
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Durchsuchen Sie unsere {totalCount} Produktkategorien
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Kategorien durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const icon = getCategoryIcon(category.name);

                return (
                  <Link
                    key={category.name}
                    href={`/kategorien/${slug}`}
                    className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-zinc-900"
                  >
                    <div className="absolute right-4 top-4 text-6xl opacity-10">{icon}</div>
                    <div className="relative">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-3xl shadow-lg">
                        {icon}
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <div className="mb-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {category.count} Produkte
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                  ← Zurück
                </button>
                <span className="px-4">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                  Weiter →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
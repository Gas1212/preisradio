'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Retailer, Product } from '@/lib/types';
import api from '@/lib/api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function HaendlerPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [retailersResponse, productsResponse] = await Promise.all([
        api.getRetailers(),
        api.getProducts({}),
      ]);

      setRetailers(retailersResponse.results);
      setProducts(productsResponse.results);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculer les stats pour chaque détaillant
  const retailersWithStats = retailers.map((retailer) => {
    // Filtrer les produits de ce retailer
    const retailerProducts = products.filter((product) =>
      product.retailer === retailer.id
    );

    const productsCount = retailerProducts.length;

    // Calculer le prix moyen
    const averagePrice =
      retailerProducts.length > 0
        ? retailerProducts.reduce((acc, product) => acc + product.price, 0) / retailerProducts.length
        : 0;

    // Dans le nouveau modèle, tous les produits sont "en stock" car ils viennent directement du site
    const inStockCount = productsCount;

    return {
      ...retailer,
      productsCount,
      pricesCount: productsCount,  // Dans le nouveau modèle, 1 produit = 1 prix
      averagePrice,
      inStockCount,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Unsere Händler-Partner
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Wir vergleichen Preise der führenden Online-Händler in Deutschland
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Händler werden geladen...
              </p>
            </div>
          </div>
        ) : retailers.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-12 text-center dark:bg-zinc-900">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Keine Händler gefunden
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fügen Sie Händler zur Datenbank hinzu
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Händler-Partner
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {retailers.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <svg
                      className="h-8 w-8 text-blue-600 dark:text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Produkte verfügbar
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {products.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900">
                    <svg
                      className="h-8 w-8 text-purple-600 dark:text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Produkte insgesamt
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {products.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <svg
                      className="h-8 w-8 text-green-600 dark:text-green-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Retailers Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {retailersWithStats
                .sort((a, b) => b.productsCount - a.productsCount)
                .map((retailer) => (
                  <div
                    key={retailer.id}
                    className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-zinc-900"
                  >
                    {/* Logo/Name */}
                    <div className="mb-6">
                      <div className="flex h-20 items-center justify-center rounded-lg bg-gray-50 p-4 dark:bg-zinc-800">
                        {retailer.logo ? (
                          <img
                            src={retailer.logo}
                            alt={retailer.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            {retailer.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      {retailer.name}
                    </h3>

                    {/* Stats */}
                    <div className="mb-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Produkte
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {retailer.productsCount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Auf Lager
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {retailer.inStockCount}
                        </span>
                      </div>

                      {retailer.averagePrice > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Ø Preis
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {retailer.averagePrice.toFixed(2)} €
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={retailer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        Website besuchen
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>

                    {/* Badge for top retailer */}
                    {retailer.productsCount ===
                      Math.max(...retailersWithStats.map((r) => r.productsCount)) && (
                      <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        Top Händler
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Trust Section */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
              <h2 className="mb-4 text-3xl font-bold">
                Vertrauen Sie auf Qualität
              </h2>
              <p className="mx-auto max-w-2xl text-lg opacity-90">
                Wir arbeiten nur mit vertrauenswürdigen und etablierten Händlern zusammen.
                Alle Partner werden sorgfältig ausgewählt, um Ihnen das beste
                Einkaufserlebnis zu garantieren.
              </p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

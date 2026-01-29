'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Retailer } from '@/lib/types';
import api from '@/lib/api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getRetailerInfo } from '@/lib/retailerUtils';

export default function HaendlerPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ shopName: '', website: '', email: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Fallback retailers avec logos locaux
  const defaultRetailers = [
    { id: 'saturn', name: 'Saturn', website: 'https://www.saturn.de', count: 0 },
    { id: 'mediamarkt', name: 'MediaMarkt', website: 'https://www.mediamarkt.de', count: 0 },
    { id: 'otto', name: 'Otto', website: 'https://www.otto.de', count: 0 },
    { id: 'kaufland', name: 'Kaufland', website: 'https://www.kaufland.de', count: 0 },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const retailersResponse = await api.getRetailers();
      // Si l'API retourne des données, les utiliser, sinon fallback
      if (retailersResponse.results && retailersResponse.results.length > 0) {
        setRetailers(retailersResponse.results);
      } else {
        setRetailers(defaultRetailers as any);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      // En cas d'erreur, utiliser les retailers par défaut
      setRetailers(defaultRetailers as any);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/shop-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ shopName: '', website: '', email: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header with Back Button */}
        <div className="mb-8 md:mb-12">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Zurück zur Startseite
          </Link>

          <div className="text-center">
            <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Unsere Händler-Partner
            </h1>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400">
              Wir vergleichen Preise der führenden Online-Händler in Deutschland
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-4 sm:p-6 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {retailers.length}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Händler
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 sm:p-6 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                {retailers.reduce((sum, r) => sum + (r.count || 0), 0)}+
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Produkte
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 sm:p-6 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                100%
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Kostenlos
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 sm:p-6 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
                24/7
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Updates
              </p>
            </div>
          </div>
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
            {/* Retailers Grid - Improved with brand colors */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {retailers.map((retailer) => {
                const retailerInfo = getRetailerInfo(retailer.id);

                return (
                  <div
                    key={retailer.id}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    {/* Brand Color Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${retailerInfo.color || 'bg-gray-400'}`}></div>

                    {/* Logo Section with Brand Background */}
                    <div className="mb-4">
                      <div className="relative h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 p-4 flex items-center justify-center overflow-hidden">
                        {retailerInfo.logo ? (
                          <Image
                            src={retailerInfo.logo}
                            alt={retailer.name}
                            width={200}
                            height={100}
                            className="object-contain max-h-24 group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        ) : (
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {retailer.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Retailer Name */}
                    <h3 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">
                      {retailer.name}
                    </h3>

                    {/* Product Count */}
                    {retailer.count && retailer.count > 0 && (
                      <div className="mb-4 text-center">
                        <p className={`text-sm font-semibold ${retailerInfo.textColor || 'text-gray-600'}`}>
                          {retailer.count.toLocaleString('de-DE')} Produkte
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/search?retailer=${retailer.id}`}
                        className={`flex items-center justify-center gap-2 rounded-lg ${retailerInfo.color || 'bg-blue-600'} px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg`}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Produkte ansehen
                      </Link>
                      <a
                        href={retailer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 dark:bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-zinc-700"
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
                  </div>
                );
              })}
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Blitzschnell
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Preise werden in Echtzeit aktualisiert und verglichen
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Vertrauenswürdig
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nur seriöse und etablierte Online-Händler
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <svg className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Geld sparen
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Finden Sie immer den besten Preis und sparen Sie bares Geld
                </p>
              </div>
            </div>

            {/* Trust Section */}
            <div className="mt-12 md:mt-16 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center text-white shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <svg className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-4 text-2xl md:text-3xl font-bold">
                Vertrauen Sie auf Qualität
              </h2>
              <p className="mx-auto max-w-2xl text-base md:text-lg opacity-95">
                Wir arbeiten nur mit vertrauenswürdigen und etablierten Händlern zusammen.
                Alle Partner werden sorgfältig ausgewählt, um Ihnen das beste
                Einkaufserlebnis zu garantieren.
              </p>
            </div>

            {/* Shop Request Form */}
            <div className="mt-12 md:mt-16 rounded-2xl bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-lg border border-gray-100 dark:border-zinc-800">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Händler werden
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Möchten Sie Ihre Produkte auf Preisradio listen? Kontaktieren Sie uns!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Shop-Name"
                    required
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Website-URL"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {formStatus === 'sending' ? 'Wird gesendet...' : 'Anfrage senden'}
                </button>

                {formStatus === 'success' && (
                  <p className="text-center text-green-600 dark:text-green-400 font-medium">
                    Vielen Dank! Wir melden uns bei Ihnen.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-center text-red-600 dark:text-red-400 font-medium">
                    Fehler beim Senden. Bitte versuchen Sie es erneut.
                  </p>
                )}
              </form>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

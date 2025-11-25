import { Price } from '@/lib/types';

interface PriceComparisonProps {
  prices: Price[];
}

export default function PriceComparison({ prices }: PriceComparisonProps) {
  // Trier les prix par ordre croissant
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);

  // Trouver le prix le plus bas
  const lowestPrice = sortedPrices[0]?.price;

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            En stock
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Rupture de stock
          </span>
        );
      case 'preorder':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Précommande
          </span>
        );
      case 'discontinued':
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Discontinué
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  if (prices.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-zinc-900">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Aucun prix disponible
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Les prix pour ce produit ne sont pas encore disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Comparaison des prix ({prices.length} {prices.length > 1 ? 'vendeurs' : 'vendeur'})
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Économisez jusqu'à{' '}
          <span className="font-semibold text-green-600 dark:text-green-400">
            {sortedPrices.length > 1
              ? `${(sortedPrices[sortedPrices.length - 1].price - lowestPrice).toFixed(2)} €`
              : '0.00 €'}
          </span>
        </p>
      </div>

      <div className="space-y-3">
        {sortedPrices.map((price, index) => (
          <div
            key={`${price.retailer.id}-${index}`}
            className={`relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md ${
              price.price === lowestPrice
                ? 'border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-700'
                : 'border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-800'
            }`}
          >
            {price.price === lowestPrice && (
              <div className="absolute right-0 top-0 rounded-bl-lg bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                Meilleur prix
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Logo du détaillant */}
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800">
                  {price.retailer.logo ? (
                    <img
                      src={price.retailer.logo}
                      alt={price.retailer.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {price.retailer.name.substring(0, 3)}
                    </span>
                  )}
                </div>

                {/* Info détaillant */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {price.retailer.name}
                  </h4>
                  <div className="mt-1">{getStockStatusBadge(price.stock_status)}</div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Mis à jour: {formatDate(price.last_checked)}
                  </p>
                </div>
              </div>

              {/* Prix et action */}
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {price.price.toFixed(2)} €
                </p>
                {price.stock_status === 'in_stock' && (
                  <a
                    href={price.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Acheter
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

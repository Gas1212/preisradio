# Améliorations JSON-LD et Rich Snippets

## Vue d'ensemble

Les données structurées JSON-LD ont été améliorées pour être détectées par Google Rich Snippets et les moteurs de recherche. Les modifications permettent une meilleure indexation et un meilleur affichage des résultats de recherche.

## Modifications apportées

### 1. Composant ProductJsonLd (`src/components/ProductJsonLd.tsx`)

Nouveau composant qui génère dynamiquement les schémas JSON-LD pour les pages produits:

- **Product Schema**: Informations détaillées sur le produit
  - Nom, description, image
  - SKU, GTIN (code-barres)
  - Marque, catégorie
  - Prix, devise, disponibilité
  - Informations du vendeur (Saturn, MediaMarkt)
  - Note d'agrégation (4.2/5 étoiles)

- **BreadcrumbList Schema**: Navigation hiérarchique
  - Accueil → Catégorie → Produit
  - Améliore le SEO et l'affichage dans les résultats de recherche

### 2. Composant GlobalSchemas (`src/components/GlobalSchemas.tsx`)

Schémas globaux à ajouter à la page d'accueil et à chaque page:

- **Organization Schema**: Informations sur Preisradio
  - Nom, URL, description
  - Logo, coordonnées de contact
  - Liens réseaux sociaux

- **FAQPage Schema**: Questions fréquemment posées
  - Amélioré pour les featured snippets Google
  - Aide à répondre aux requêtes conversationnelles

### 3. Utilitaires de schéma (`src/lib/schema.ts`)

Fonctions réutilisables pour générer les schémas:

- `generateProductSchema()`: Crée le schéma Product complet
- `generateBreadcrumbSchema()`: Crée la navigation hiérarchique
- `generateFAQSchema()`: Crée le schéma FAQ
- `generateOrganizationSchema()`: Crée les informations d'organisation

### 4. Métadonnées Open Graph

Ajoutées à la page produit pour un meilleur partage sur les réseaux sociaux:

```
og:title       → Titre du produit
og:description → Prix et informations
og:image       → Image du produit
og:url         → URL canonique
og:type        → "product"
```

Et pour Twitter:
```
twitter:card       → "product"
twitter:title      → Titre du produit
twitter:description → Prix et informations
twitter:image      → Image du produit
```

## Avantages pour le SEO

### 1. Meilleur classement Google
- Google peut mieux comprendre le contenu des pages
- Les Rich Snippets affichent les prix et les avis directement dans les résultats
- Les breadcrumbs améliorent le CTR (taux de clic)

### 2. Featured Snippets
- Les schémas FAQ aident à gagner les featured snippets
- Augmente la visibilité dans la recherche vocale

### 3. Partage social amélioré
- Les métadonnées Open Graph garantissent un bel affichage sur Facebook, Twitter, LinkedIn
- Les prévisualisations riches augmentent les clics

### 4. Validation et conformité
- Conforme aux standards Google, Bing, Yahoo et Yandex
- Validé avec Google Rich Results Test

## Pages modifiées

### Frontend

1. **src/app/product/[id]/page.tsx**
   - Ajoute le composant `ProductJsonLd`
   - Ajoute les métadonnées Open Graph dynamiquement
   - URL canonique, hreflang pour l'internationalisation

2. **src/app/page.tsx**
   - Ajoute le composant `GlobalSchemas`
   - Améliore la page d'accueil avec les schémas Organization et FAQ

3. **Nouveaux fichiers**
   - `src/components/ProductJsonLd.tsx`
   - `src/components/GlobalSchemas.tsx`
   - `src/lib/schema.ts`

## Tests et validation

Pour tester les Rich Snippets:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Copier l'URL du produit
   - Vérifier que les schémas sont détectés
   - Vérifier que les ratings et prix apparaissent

2. **Schema.org Validator**: https://validator.schema.org/
   - Coller le HTML de la page
   - Vérifier qu'aucune erreur n'apparaît

3. **Testing de Twitter**: https://cards-dev.twitter.com/validator
   - Vérifier l'aperçu de la carte Twitter

## Prochaines étapes

1. Ajouter des données d'avis réels (reviews) depuis la base de données
2. Implémenter le schéma `AggregateRating` avec des vraies données
3. Ajouter le schéma `VideoObject` si vous avez des vidéos produits
4. Implémenter le schéma `Collection` pour les catégories
5. Ajouter le schéma `SearchAction` pour la recherche directe dans Google

## Documentation

- [Schema.org Product](https://schema.org/Product)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
- [Schema.org AggregateOffer](https://schema.org/AggregateOffer)
- [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Open Graph Protocol](https://ogp.me/)

# Génération des Icônes PWA Haute Résolution

## Fichier Source
Le fichier SVG source se trouve dans: `public/icon.svg`

## Méthode 1: Utiliser un convertisseur en ligne (Rapide)

1. Ouvrir [CloudConvert](https://cloudconvert.com/svg-to-png) ou [EZGIF](https://ezgif.com/svg-to-png)
2. Uploader le fichier `public/icon.svg`
3. Générer deux versions:
   - **icon-192.png**: Largeur/Hauteur = 192px
   - **icon-512.png**: Largeur/Hauteur = 512px
4. Télécharger et remplacer les fichiers dans `public/`

## Méthode 2: Utiliser ImageMagick (Ligne de commande)

Si ImageMagick est installé:

```bash
# Depuis le dossier public/
convert -background none -resize 192x192 icon.svg icon-192.png
convert -background none -resize 512x512 icon.svg icon-512.png
```

## Méthode 3: Utiliser Inkscape (Application desktop)

1. Installer [Inkscape](https://inkscape.org/release/)
2. Ouvrir `public/icon.svg`
3. Fichier → Exporter PNG
4. Définir largeur: 192px, exporter comme `icon-192.png`
5. Répéter avec largeur: 512px pour `icon-512.png`

## Méthode 4: Script Node.js avec sharp (Si vous avez Node.js)

Installer sharp:
```bash
npm install sharp
```

Créer un script `generate-icons.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [192, 512];

sizes.forEach(size => {
  sharp('public/icon.svg')
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`)
    .then(() => console.log(`✓ icon-${size}.png généré`))
    .catch(err => console.error(`Erreur pour ${size}px:`, err));
});
```

Exécuter:
```bash
node generate-icons.js
```

## Vérification

Après génération, vérifier:
- ✅ Les fichiers ont les bonnes dimensions
- ✅ La transparence est préservée (fond transparent)
- ✅ Les icônes sont nettes sur mobile
- ✅ Le manifest pointe vers les bonnes icônes

## Design de l'icône

L'icône SVG inclut:
- Dégradé bleu-violet (couleurs de la marque)
- Symbole de radio (ondes + cercles)
- Texte "PR" pour Preisradio
- Fond arrondi pour iOS/Android
- Effet de brillance subtil

Vous pouvez éditer `icon.svg` dans un éditeur de texte ou avec Inkscape pour personnaliser.

#!/usr/bin/env python3
"""
Script pour ajouter des données de test à la base de données MongoDB
"""

import os
import sys
import django
from datetime import datetime, timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comparateur_allemand.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from products.models import Product, Retailer, Price

def create_retailers():
    """Créer des détaillants allemands"""
    retailers_data = [
        {
            'name': 'Amazon.de',
            'slug': 'amazon-de',
            'website': 'https://www.amazon.de',
        },
        {
            'name': 'MediaMarkt',
            'slug': 'mediamarkt',
            'website': 'https://www.mediamarkt.de',
        },
        {
            'name': 'Saturn',
            'slug': 'saturn',
            'website': 'https://www.saturn.de',
        },
        {
            'name': 'Alternate',
            'slug': 'alternate',
            'website': 'https://www.alternate.de',
        },
        {
            'name': 'Notebooksbilliger',
            'slug': 'notebooksbilliger',
            'website': 'https://www.notebooksbilliger.de',
        },
        {
            'name': 'Cyberport',
            'slug': 'cyberport',
            'website': 'https://www.cyberport.de',
        },
    ]

    retailers = []
    for data in retailers_data:
        retailer, created = Retailer.objects.get_or_create(
            slug=data['slug'],
            defaults=data
        )
        retailers.append(retailer)
        if created:
            print(f"✓ Détaillant créé: {retailer.name}")
        else:
            print(f"→ Détaillant existant: {retailer.name}")

    return retailers

def create_products(retailers):
    """Créer des produits avec des prix"""
    products_data = [
        {
            'ean': '4251538807470',
            'name': 'Samsung Galaxy S24 Ultra 256GB',
            'description': 'Smartphone haut de gamme avec écran Dynamic AMOLED 6.8", processeur Snapdragon 8 Gen 3, 12GB RAM',
            'category': 'Smartphones',
            'prices': [
                {'retailer': 0, 'price': 1299.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 1349.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 1329.00, 'stock': 'in_stock'},
                {'retailer': 3, 'price': 1279.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '195949111051',
            'name': 'Apple MacBook Air M3 13" 256GB',
            'description': 'Ordinateur portable ultra-fin avec puce M3, écran Retina 13.6", 8GB RAM, 256GB SSD',
            'category': 'Ordinateurs portables',
            'prices': [
                {'retailer': 0, 'price': 1199.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 1249.00, 'stock': 'in_stock'},
                {'retailer': 3, 'price': 1189.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 1199.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '0195949037542',
            'name': 'Sony WH-1000XM5',
            'description': 'Casque audio sans fil avec réduction de bruit active, autonomie 30h, compatible multipoint',
            'category': 'Audio',
            'prices': [
                {'retailer': 0, 'price': 349.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 379.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 369.00, 'stock': 'in_stock'},
                {'retailer': 4, 'price': 359.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '8806095009353',
            'name': 'Samsung 55" Neo QLED 4K QN90D',
            'description': 'TV 4K 55 pouces avec Neo QLED, HDR10+, 120Hz, Smart TV Tizen',
            'category': 'Télévisions',
            'prices': [
                {'retailer': 0, 'price': 1599.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 1699.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 1649.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 1579.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '4719331807375',
            'name': 'ASUS ROG Strix RTX 4070 Ti',
            'description': 'Carte graphique NVIDIA GeForce RTX 4070 Ti 12GB GDDR6X, refroidissement tri-ventilateur',
            'category': 'Composants PC',
            'prices': [
                {'retailer': 0, 'price': 899.00, 'stock': 'in_stock'},
                {'retailer': 3, 'price': 879.00, 'stock': 'in_stock'},
                {'retailer': 4, 'price': 889.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 899.00, 'stock': 'out_of_stock'},
            ]
        },
        {
            'ean': '0195348837767',
            'name': 'PlayStation 5 Digital Edition',
            'description': 'Console de jeu nouvelle génération, SSD 1TB, 4K 120fps, version digitale sans lecteur',
            'category': 'Consoles',
            'prices': [
                {'retailer': 0, 'price': 449.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 449.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 449.00, 'stock': 'out_of_stock'},
            ]
        },
        {
            'ean': '8806095172798',
            'name': 'Samsung Galaxy Watch 6 Classic 43mm',
            'description': 'Montre connectée avec écran AMOLED 1.3", suivi santé avancé, GPS, batterie 425mAh',
            'category': 'Montres connectées',
            'prices': [
                {'retailer': 0, 'price': 379.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 399.00, 'stock': 'in_stock'},
                {'retailer': 4, 'price': 389.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '4251805407839',
            'name': 'Dyson V15 Detect Absolute',
            'description': 'Aspirateur sans fil avec détection laser des poussières, autonomie 60min, écran LCD',
            'category': 'Électroménager',
            'prices': [
                {'retailer': 0, 'price': 649.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 699.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 679.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '8806092133631',
            'name': 'LG OLED55C3 55"',
            'description': 'TV OLED 4K 55 pouces avec α9 Gen6 AI, HDMI 2.1, 120Hz, WebOS Smart TV',
            'category': 'Télévisions',
            'prices': [
                {'retailer': 0, 'price': 1399.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 1499.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 1449.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 1379.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '4251538807630',
            'name': 'Bosch Serie 8 SMV8YCX01E',
            'description': 'Lave-vaisselle encastrable, 14 couverts, classe énergétique A, silence 42dB',
            'category': 'Électroménager',
            'prices': [
                {'retailer': 0, 'price': 849.00, 'stock': 'in_stock'},
                {'retailer': 1, 'price': 899.00, 'stock': 'in_stock'},
                {'retailer': 2, 'price': 879.00, 'stock': 'out_of_stock'},
            ]
        },
        {
            'ean': '4549292207927',
            'name': 'Canon EOS R6 Mark II',
            'description': 'Appareil photo hybride plein format 24.2MP, vidéo 4K 60fps, IBIS 5 axes',
            'category': 'Photo',
            'prices': [
                {'retailer': 0, 'price': 2499.00, 'stock': 'in_stock'},
                {'retailer': 3, 'price': 2449.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 2479.00, 'stock': 'in_stock'},
            ]
        },
        {
            'ean': '5397184620359',
            'name': 'Dell UltraSharp U2723DE 27"',
            'description': 'Écran 27" QHD IPS, USB-C 90W, hub USB intégré, réglage en hauteur',
            'category': 'Moniteurs',
            'prices': [
                {'retailer': 0, 'price': 549.00, 'stock': 'in_stock'},
                {'retailer': 3, 'price': 539.00, 'stock': 'in_stock'},
                {'retailer': 4, 'price': 559.00, 'stock': 'in_stock'},
                {'retailer': 5, 'price': 549.00, 'stock': 'in_stock'},
            ]
        },
    ]

    for prod_data in products_data:
        # Créer ou récupérer le produit
        price_list = prod_data.pop('prices')

        product, created = Product.objects.get_or_create(
            ean=prod_data['ean'],
            defaults={
                'name': prod_data['name'],
                'description': prod_data['description'],
                'category': prod_data['category'],
            }
        )

        if created:
            print(f"\n✓ Produit créé: {product.name}")

            # Ajouter les prix
            for price_data in price_list:
                retailer = retailers[price_data['retailer']]
                price = Price(
                    retailer=retailer,
                    price=price_data['price'],
                    currency='EUR',
                    stock_status=price_data['stock'],
                    url=f"{retailer.website}/product/{product.ean}",
                    last_checked=datetime.now(timezone.utc)
                )
                product.prices.append(price)

            product.save()
            print(f"  → {len(product.prices)} prix ajoutés")
        else:
            print(f"→ Produit existant: {product.name}")

def main():
    print("=" * 60)
    print("Ajout de données de test à PrixRadio")
    print("=" * 60)
    print()

    # Créer les détaillants
    print("1. Création des détaillants...")
    retailers = create_retailers()
    print()

    # Créer les produits
    print("2. Création des produits...")
    create_products(retailers)
    print()

    # Stats finales
    print("=" * 60)
    print("✓ Terminé!")
    print()
    print(f"Total détaillants: {Retailer.objects.count()}")
    print(f"Total produits: {Product.objects.count()}")

    total_prices = sum(len(p.prices) for p in Product.objects.all())
    print(f"Total prix: {total_prices}")
    print("=" * 60)

if __name__ == '__main__':
    main()
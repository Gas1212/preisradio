#!/usr/bin/env python
"""Check MongoDB collections using Django/MongoEngine setup"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comparateur_allemand.settings')
django.setup()

from products.models import SaturnProduct, MediaMarktProduct
from mongoengine.connection import get_db

print("🔍 Checking MongoDB collections...\n")

# Check Saturn
print("=" * 60)
print("SATURN DATABASE")
print("=" * 60)
try:
    saturn_db = get_db(alias='default')
    print(f"Database name: {saturn_db.name}")
    collections = saturn_db.list_collection_names()
    print(f"Collections: {collections}")

    for coll_name in collections:
        count = saturn_db[coll_name].count_documents({})
        print(f"  - '{coll_name}': {count:,} documents")

        # Sample document
        if count > 0:
            sample = saturn_db[coll_name].find_one()
            if sample:
                fields = list(sample.keys())
                print(f"    Fields: {fields[:15]}")
except Exception as e:
    print(f"✗ Error: {e}")

# Check MediaMarkt
print("\n" + "=" * 60)
print("MEDIAMARKT DATABASE")
print("=" * 60)
try:
    mm_db = get_db(alias='mediamarkt')
    print(f"Database name: {mm_db.name}")
    collections = mm_db.list_collection_names()
    print(f"Collections: {collections}")

    for coll_name in collections:
        count = mm_db[coll_name].count_documents({})
        print(f"  - '{coll_name}': {count:,} documents")

        # Sample document
        if count > 0:
            sample = mm_db[coll_name].find_one()
            if sample:
                fields = list(sample.keys())
                print(f"    Fields: {fields[:15]}")
except Exception as e:
    print(f"✗ Error: {e}")

# Check model queries
print("\n" + "=" * 60)
print("MODEL QUERIES")
print("=" * 60)
print(f"SaturnProduct.objects.count(): {SaturnProduct.objects.count()}")
print(f"MediaMarktProduct.objects.count(): {MediaMarktProduct.objects.count()}")

# Try to get one document from each
print("\nTrying to fetch first document from each:")
try:
    saturn_first = SaturnProduct.objects.first()
    print(f"Saturn first: {saturn_first}")
except Exception as e:
    print(f"Saturn error: {e}")

try:
    mm_first = MediaMarktProduct.objects.first()
    print(f"MediaMarkt first: {mm_first}")
except Exception as e:
    print(f"MediaMarkt error: {e}")
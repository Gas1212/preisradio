#!/usr/bin/env python
"""Check actual collection names in MongoDB databases"""
import os
import sys
from pymongo import MongoClient

# MongoDB URIs from env
SATURN_URI = "mongodb+srv://stronglimitless76_db_user:XkH6zK9tcANup38i@cluster0.pzd9gka.mongodb.net/"
MEDIAMARKT_URI = "mongodb+srv://stronglimitless76_db_user:oLZm2SKrgK5ZskXv@mediamarkt.iwjamu6.mongodb.net/"

print("🔍 Checking MongoDB collections...\n")

# Check Saturn database
print("=" * 60)
print("SATURN DATABASE")
print("=" * 60)
try:
    saturn_client = MongoClient(SATURN_URI + "Saturn?retryWrites=true&w=majority", serverSelectionTimeoutMS=10000)
    saturn_db = saturn_client['Saturn']
    collections = saturn_db.list_collection_names()
    print(f"✓ Connected to Saturn database")
    print(f"Collections found: {collections}")

    for coll_name in collections:
        count = saturn_db[coll_name].count_documents({})
        print(f"  - '{coll_name}': {count:,} documents")

        # Get a sample document
        if count > 0:
            sample = saturn_db[coll_name].find_one()
            if sample:
                print(f"    Sample fields: {list(sample.keys())[:10]}")

    saturn_client.close()
except Exception as e:
    print(f"✗ Saturn error: {e}")

print("\n" + "=" * 60)
print("MEDIAMARKT DATABASE")
print("=" * 60)
try:
    mm_client = MongoClient(MEDIAMARKT_URI + "Mediamarkt?retryWrites=true&w=majority", serverSelectionTimeoutMS=10000)
    mm_db = mm_client['Mediamarkt']
    collections = mm_db.list_collection_names()
    print(f"✓ Connected to MediaMarkt database")
    print(f"Collections found: {collections}")

    for coll_name in collections:
        count = mm_db[coll_name].count_documents({})
        print(f"  - '{coll_name}': {count:,} documents")

        # Get a sample document
        if count > 0:
            sample = mm_db[coll_name].find_one()
            if sample:
                print(f"    Sample fields: {list(sample.keys())[:10]}")

    mm_client.close()
except Exception as e:
    print(f"✗ MediaMarkt error: {e}")

print("\n" + "=" * 60)
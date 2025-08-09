"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";

type Product = any;

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="opacity-80">Loading products…</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((p: any) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

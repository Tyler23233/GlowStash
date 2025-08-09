"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "products"));
      const list: Product[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Product, "id">),
      }));
      setItems(list);
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

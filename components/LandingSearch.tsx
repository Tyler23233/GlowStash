"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import Link from "next/link";
import type { Product as FirestoreProduct } from "@/types/product";

// Normalized shape used by the UI
type SearchProduct = {
  id: string;
  name: string;
  brand: string;
  type?: string;
  price?: number;
  image?: string;
  retailer?: "Sephora" | "Ulta" | "Amazon";
  url?: string;
  tags?: string[];
};

export default function LandingSearch() {
  const [allProducts, setAllProducts] = useState<SearchProduct[]>([]);
  const [qStr, setQStr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "products"), limit(400)));
        const items: SearchProduct[] = snap.docs.map((d) =>
          normalizeDoc(d.id, d.data() as Omit<FirestoreProduct, "id">)
        );
        setAllProducts(items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(allProducts, {
      includeScore: false,
      threshold: 0.35,
      keys: [
        { name: "name", weight: 0.5 },
        { name: "brand", weight: 0.4 },
        { name: "type", weight: 0.25 },
        { name: "tags", weight: 0.25 },
        { name: "retailer", weight: 0.15 },
      ],
    });
  }, [allProducts]);

  const results = useMemo(() => {
    if (qStr.trim().length < 2) return [];
    return fuse.search(qStr).slice(0, 12).map((r) => r.item);
  }, [qStr, fuse]);

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
        <label htmlFor="site-search" className="sr-only">Search products</label>
        <input
          id="site-search"
          placeholder="Type a brand, product, or type…"
          value={qStr}
          onChange={(e) => setQStr(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-0 placeholder-white/40"
        />
        <p className="mt-2 text-xs text-white/50">
          Try: “vitamin C”, “cleanser”, “Charlotte Tilbury”, “brow pencil”
        </p>
      </div>

      {qStr.trim().length >= 2 && (
        <div className="mt-6">
          {loading ? (
            <p className="text-white/70">Loading products…</p>
          ) : results.length === 0 ? (
            <p className="text-white/70">No matches. Try a different term.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <ProductCardMini key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function normalizeDoc(id: string, d: FirestoreProduct): SearchProduct {
  // choose best outbound URL in order: Sephora -> Ulta -> Amazon
  const url =
    d.product_url_sephora || d.product_url_ulta || d.product_url_amazon || undefined;

  let retailer: SearchProduct["retailer"] | undefined;
  if (d.product_url_sephora) retailer = "Sephora";
  else if (d.product_url_ulta) retailer = "Ulta";
  else if (d.product_url_amazon) retailer = "Amazon";

  // normalize tags to array
  const tags: string[] | undefined =
    Array.isArray(d.tags)
      ? d.tags
      : typeof d.tags === "string"
      ? d.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : undefined;

  // normalize price to number
  const price =
    typeof d.price === "string" ? parseFloat(d.price) : d.price;

  return {
    id,
    name: d.name ?? "Unnamed product",
    brand: d.brand ?? "",
    type: d.category ?? undefined,
    price: Number.isFinite(price as number) ? (price as number) : undefined,
    image: d.image_url ?? undefined,
    retailer,
    url,
    tags,
  };
}

function ProductCardMini({ product }: { product: SearchProduct }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:border-pink-300/50">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-black/30">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-wide text-white/60">{product.brand}</p>
        <h4 className="mt-1 line-clamp-2 text-sm font-medium">{product.name}</h4>
        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span>{product.retailer ?? ""}</span>
          {typeof product.price === "number" ? <span>${product.price.toFixed(2)}</span> : <span />}
        </div>
        {product.url && (
          <Link
            href={product.url}
            className="mt-2 inline-block text-sm text-pink-300 hover:underline"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}

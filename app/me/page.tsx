"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

type UserItem = {
  productId: string;
  state: "own" | "want";
  addedAt?: Timestamp;
};
type Product = {
  id: string;
  brand: string;
  name: string;
  price?: number | string;
  image_url?: string;
  product_url_sephora?: string;
  product_url_ulta?: string;
  product_url_amazon?: string;
};

export default function MyStuffPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<(Product & { _state: "own" | "want" })[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const owned = useMemo(() => items.filter((x) => x._state === "own"), [items]);
  const wished = useMemo(
    () => items.filter((x) => x._state === "want"),
    [items]
  );

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const itemsRef = collection(db, `userProducts/${user.uid}/items`);
        const snap = await getDocs(query(itemsRef, orderBy("addedAt", "desc")));
        const saves: UserItem[] = snap.docs.map((d) => ({
          productId: d.id,
          ...(d.data() as any),
        }));

        const products = await Promise.all(
          saves.map(async (it) => {
            const pSnap = await getDoc(doc(db, "products", it.productId));
            if (!pSnap.exists()) return null;
            return {
              id: pSnap.id,
              ...(pSnap.data() as any),
              _state: it.state,
            } as Product & { _state: "own" | "want" };
          })
        );

        setItems(products.filter(Boolean) as any[]);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Failed to load your items.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // --- actions ---
  const toggleState = async (productId: string, current: "own" | "want") => {
    if (!user) return;
    const next: "own" | "want" = current === "own" ? "want" : "own";
    await setDoc(doc(db, `userProducts/${user.uid}/items`, productId), {
      state: next,
    }, { merge: true });
    setItems((arr) =>
      arr.map((p) => (p.id === productId ? { ...p, _state: next } : p))
    );
  };

  const removeItem = async (productId: string) => {
    if (!user) return;
    await deleteDoc(doc(db, `userProducts/${user.uid}/items`, productId));
    setItems((arr) => arr.filter((p) => p.id !== productId));
  };

  // --- UI helpers ---
  const Price = ({ value }: { value?: number | string }) => {
    const n =
      typeof value === "number"
        ? value
        : typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.]/g, ""))
        : NaN;
    if (!Number.isFinite(n)) return null;
    return <span>${n.toFixed(2)}</span>;
  };

  const Card = ({ p }: { p: Product & { _state: "own" | "want" } }) => (
    <div className="card space-y-2">
      <img
        src={p.image_url || "https://placehold.co/400x400/png"}
        alt={p.name}
        className="w-full rounded-xl object-cover h-48"
      />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm opacity-80">{p.brand}</div>
          <div className="font-semibold">{p.name}</div>
        </div>
        <div className="text-right">
          <Price value={p.price} />
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <span className="text-xs opacity-70 self-center">
          Status: <strong>{p._state === "own" ? "Owned" : "Wishlist"}</strong>
        </span>
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => toggleState(p.id, p._state)}
            title="Toggle Own/Wish"
          >
            Toggle
          </button>
          <button
            className="btn btn-primary"
            onClick={() => removeItem(p.id)}
            title="Remove"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">My Stuff</h1>
        <p className="opacity-80">You’re not signed in.</p>
        <Link href="/products" className="btn btn-primary">
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">My Stuff</h1>
      {loading && <p className="opacity-80">Loading your items…</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && items.length === 0 && (
        <div className="space-y-2">
          <p className="opacity-80">You haven’t saved anything yet.</p>
          <Link href="/products" className="btn btn-primary">
            Find products
          </Link>
        </div>
      )}

      {owned.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Owned</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {owned.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {wished.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wished.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

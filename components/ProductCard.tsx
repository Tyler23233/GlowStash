"use client";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

type Product = {
  id: string;
  brand: string;
  name: string;
  price?: number | string;    // <— allow string or number
  image_url?: string;
  product_url_sephora?: string;
  product_url_ulta?: string;
  product_url_amazon?: string;
};

export default function ProductCard({ p }: { p: Product }) {
  const { user } = useAuth();

  const priceNum =
    typeof p.price === "number"
      ? p.price
      : typeof p.price === "string"
      ? parseFloat(p.price.replace(/[^0-9.]/g, "")) // strip $ etc
      : NaN;

  const saveState = async (state: "own" | "want") => {
    if (!user) {
      alert("Create a free account to save.");
      return;
    }
    const ref = doc(collection(db, `userProducts/${user.uid}/items`), p.id);
    await setDoc(
      ref,
      { state, addedAt: serverTimestamp(), productId: p.id },
      { merge: true }
    );
    alert(`Saved as ${state}`);
  };

  return (
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
        {Number.isFinite(priceNum) && (
          <div className="text-right">${priceNum.toFixed(2)}</div>
        )}
      </div>

      <div className="flex gap-2">
        {p.product_url_sephora && (
          <a className="btn" href={p.product_url_sephora} target="_blank">
            Sephora
          </a>
        )}
        {p.product_url_ulta && (
          <a className="btn" href={p.product_url_ulta} target="_blank">
            Ulta
          </a>
        )}
        {p.product_url_amazon && (
          <a className="btn" href={p.product_url_amazon} target="_blank">
            Amazon
          </a>
        )}
      </div>

      <div className="flex gap-2">
        <button className="btn" onClick={() => saveState("own")}>
          I own this
        </button>
        <button className="btn btn-primary" onClick={() => saveState("want")}>
          I want this
        </button>
      </div>
    </div>
  );
}

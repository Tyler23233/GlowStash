"use client";

import { FormEvent, useState } from "react";
import { db } from "@/lib/firebase"; // make sure this exports initialized Firestore
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        createdAt: serverTimestamp(),
        source: "landing",
      });
      setStatus("ok");
      setEmail("");
    } catch (e) {
      setStatus("err");
    }
  }

  return (
    <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Get beauty price‑drop alerts
      </h2>
      <p className="mt-2 text-white/70">
        Be first to know when your favorites go on sale.
      </p>

      <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-xl gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none ring-0 placeholder-white/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl border border-pink-300/50 bg-pink-500/20 px-5 py-3 font-medium transition hover:bg-pink-500/30 disabled:opacity-60"
        >
          {status === "loading" ? "Adding..." : "Subscribe"}
        </button>
      </form>

      {status === "ok" && (
        <p className="mt-3 text-sm text-emerald-300/90">
          You’re in! Check your inbox for a confirmation.
        </p>
      )}
      {status === "err" && (
        <p className="mt-3 text-sm text-rose-300/90">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}

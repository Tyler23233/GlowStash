"use client";

import { useEffect, useState } from "react";

export default function AffiliateDisclosure() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aff_disclosure_closed");
    if (stored === "1") setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="w-full bg-white/5 text-xs text-white/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
        <p className="leading-tight">
          This site uses affiliate links. We may earn a commission when you buy through our links.{" "}
          <a href="/disclosure" className="underline hover:no-underline">Learn more</a>.{" "}
          <span className="opacity-80">As an Amazon Associate we earn from qualifying purchases.</span>
        </p>
        <button
          onClick={() => { localStorage.setItem("aff_disclosure_closed", "1"); setHidden(true); }}
          className="shrink-0 rounded-md border border-white/15 px-2 py-1 hover:bg-white/5"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

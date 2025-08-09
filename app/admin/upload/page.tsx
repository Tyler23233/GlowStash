"use client";
import { useState, ChangeEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function UploadPage() {
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  // Robust CSV parser (handles quoted commas)
  const parseCSV = (text: string) => {
    const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
    if (!lines.length) return [];
    const headers = lines[0].split(",").map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const cells = line.match(/("([^"]|"")*"|[^,])+/g) || [];
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        const raw = (cells[i] ?? "").trim();
        row[h] = raw.replace(/^"(.*)"$/, "$1").replace(/""/g, '"');
      });
      return row;
    });
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) {
      setError("No file selected. Please choose a CSV file.");
      return;
    }
    // allow selecting same file twice
    e.target.value = "";
    try {
      await importCSV(f);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Upload failed.");
    }
  };

  const importCSV = async (file: File) => {
    setUploading(true);
    setProgress(null);
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (!rows.length) throw new Error("CSV appears empty or missing rows.");

      const col = collection(db, "products");
      setProgress({ done: 0, total: rows.length });

      let done = 0;
      for (const r of rows) {
        // generate a safe doc id
        const id =
          (r.slug || r.name || Math.random().toString(36).slice(2))
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        await setDoc(doc(col, id), r, { merge: true });

        done += 1;
        setProgress({ done, total: rows.length });
        // Yield to the UI every 25 writes so the progress updates visibly
        if (done % 25 === 0) await new Promise((res) => setTimeout(res, 0));
      }

      setLog((l) => [...l, `Imported ${rows.length} products.`]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Upload Products CSV</h1>

      <input type="file" accept=".csv,text/csv" onChange={handleFileInput} />

      {uploading && (
        <p className="text-yellow-400">
          Uploading… {progress ? `${progress.done}/${progress.total}` : ""}
        </p>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <ul className="text-sm opacity-80 list-disc pl-5">
        {log.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <p className="text-sm opacity-70">
        Tip: use <code>data/glowstash-sample-products.csv</code> from the project.
      </p>
    </section>
  );
}

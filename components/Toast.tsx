"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type Toast = { id: number; message: string; type: "success" | "error" };

const ToastCtx = createContext<(msg: string, type?: Toast["type"]) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const toast = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 3000);
  };

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-sm bg-[#1f2331] border ${
              t.type === "error" ? "border-red-400 text-red-400" : "border-green-400 text-green-400"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);

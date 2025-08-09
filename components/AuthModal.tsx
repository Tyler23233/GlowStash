"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthModal({ onClose }:{ onClose:()=>void }) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault(); setError(null); setLoading(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(cred.user);
        await setDoc(doc(db, "users", cred.user.uid), { email, createdAt: serverTimestamp() });
        alert("Check your email for a verification link.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err:any) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="card w-[420px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">{mode === "signup" ? "Create account" : "Log in"}</h2>
          <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-xl bg-[#0e1017] border border-[#262a3a]" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="w-full px-3 py-2 rounded-xl bg-[#0e1017] border border-[#262a3a]" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="btn btn-primary w-full">{loading? "Please wait..." : (mode==="signup" ? "Sign up" : "Log in")}</button>
        </form>
        <div className="mt-3 text-sm text-center">
          {mode==="signup" ? (
            <span>Already have an account? <button className="underline" onClick={()=>setMode("login")}>Log in</button></span>
          ) : (
            <span>New here? <button className="underline" onClick={()=>setMode("signup")}>Create an account</button></span>
          )}
        </div>
      </div>
    </div>
  );
}

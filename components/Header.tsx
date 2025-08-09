"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";

export default function Header() {
  const { user, signOutUser } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[#1f2230]">
      <div className="container flex items-center justify-between py-3 gap-3">
        <Link href="/" className="flex items-center gap-2 no-underline hover:no-underline">
          <Image src="/glowstash-logo.svg" alt="GlowStash" width={160} height={40}/>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/products">Products</Link>
          <Link href="/me">My Stuff</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm opacity-80">{user.email}</span>
              <button onClick={signOutUser} className="btn">Sign out</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={()=>setOpen(true)}>Sign up</button>
          )}
        </nav>
      </div>
      {open && <AuthModal onClose={()=>setOpen(false)} />}
    </header>
  );
}

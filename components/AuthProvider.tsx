"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Ctx = { user: User | null; signOutUser: () => Promise<void> };
const AuthCtx = createContext<Ctx>({ user: null, signOutUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  const signOutUser = async () => { await signOut(auth); };
  return <AuthCtx.Provider value={{ user, signOutUser }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);

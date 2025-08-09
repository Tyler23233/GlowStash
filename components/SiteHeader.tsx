import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight">
          GlowStash
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/products" className="opacity-80 hover:opacity-100">Products</Link>
          <Link href="/brands" className="opacity-80 hover:opacity-100">Brands</Link>
          <a href="#how-it-works" className="opacity-80 hover:opacity-100">How it works</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/me" className="btn text-sm">My Stuff</Link>
          <Link href="/signup" className="btn btn-primary text-sm">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

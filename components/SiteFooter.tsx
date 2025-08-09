import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-semibold">GlowStash</div>
          <p className="mt-2 text-sm text-white/70">
            Discover & track your favorite beauty products across top retailers.
          </p>
        </div>

        <div>
          <div className="font-semibold">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products" className="opacity-80 hover:opacity-100">Products</Link></li>
            <li><Link href="/brands" className="opacity-80 hover:opacity-100">Brands</Link></li>
            <li><a href="#how-it-works" className="opacity-80 hover:opacity-100">How it works</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="opacity-80 hover:opacity-100">About</Link></li>
            <li><Link href="/contact" className="opacity-80 hover:opacity-100">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/disclosure" className="opacity-80 hover:opacity-100">Affiliate Disclosure</Link></li>
            <li><Link href="/privacy" className="opacity-80 hover:opacity-100">Privacy Policy</Link></li>
            <li><Link href="/terms" className="opacity-80 hover:opacity-100">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} GlowStash. All rights reserved.
      </div>
    </footer>
  );
}

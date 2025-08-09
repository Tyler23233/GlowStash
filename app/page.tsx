// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import HowItWorks from "@/components/HowItWorks";
import LandingSearch from "@/components/LandingSearch";
import EmailCapture from "@/components/EmailCapture";

export default function HomePage() {
  return (
    <main className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-[#1f2230]">
        <div className="absolute inset-0">
          <Image
            src="/glowstash-hero.svg"
            alt="GlowStash hero"
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover opacity-70"
          />
        </div>
        <div className="relative p-10 md:p-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow-clean">
            <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Discover &amp; Track
            </span>{" "}
            your favorite beauty products
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/85">
            GlowStash makes it easy to save what you own, build your wishlist, and jump to trusted retailers.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/products"
              className="btn btn-primary transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,121,188,0.25)]"
            >
              Browse Products
            </Link>
            <Link
              href="/me"
              className="btn btn-primary transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,121,188,0.25)]"
            >
              My Stuff
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Track your stash"
            desc="Mark products you own and the ones you want — all synced to your account."
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <FeatureCard
            title="One-click retailer links"
            desc="Jump to Sephora, Ulta, or Amazon straight from each product page."
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17l9-9M7 7h9v9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <FeatureCard
            title="Fast & free to start"
            desc="Create an account in seconds. Your data is private and portable."
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* LANDING SEARCH */}
      <LandingSearch />

      {/* EMAIL CAPTURE */}
      <EmailCapture />
    </main>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card p-6 flex gap-4 items-start">
      <div className="p-3 rounded-xl bg-[#151826] text-white/90">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="opacity-80 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}

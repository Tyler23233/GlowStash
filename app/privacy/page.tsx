// app/privacy/page.tsx
export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>

      <p>
        GlowStash helps you discover and track beauty products. This Privacy Policy
        explains what we collect, how we use it, and your choices.
      </p>

      <section>
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
          <li>
            <strong>Email (optional):</strong> If you subscribe to price‑drop
            alerts or create an account, we store your email in Firebase
            Firestore.
          </li>
          <li>
            <strong>Product activity:</strong> Items you save to wishlist/owned,
            and basic interaction data (e.g., searches) to improve the product.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, device/browser info,
            pages visited (via analytics such as Vercel Analytics or Google
            Analytics, if enabled).
          </li>
          <li>
            <strong>Cookies:</strong> Necessary cookies for site functionality
            and optional analytics cookies for usage insights.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How We Use Information</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
          <li>Send price‑drop alerts and product updates you request.</li>
          <li>Operate and improve the site, including search relevance.</li>
          <li>
            Measure performance (e.g., page views) and detect/prevent abuse.
          </li>
          <li>
            Comply with affiliate network rules and display required disclosures.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sharing</h2>
        <p className="mt-2 text-white/80">
          We don’t sell your personal information. We use service providers to
          run the site (e.g., Firebase/Google Cloud, analytics). When you click
          outbound retailer links, those sites may receive referrer data and set
          their own cookies under their privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Data Retention</h2>
        <p className="mt-2 text-white/80">
          We keep your subscriber and wishlist data while your account is active
          or until you ask us to delete it. Aggregated analytics may be retained
          for longer.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Your Choices</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
          <li>
            Unsubscribe from emails using the link in any message or contact us.
          </li>
          <li>Request access, correction, or deletion of your data.</li>
          <li>
            Manage cookies via your browser settings and any consent banner
            provided on the site.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Security</h2>
        <p className="mt-2 text-white/80">
          We use reasonable safeguards (e.g., Firebase security rules, HTTPS),
          but no system is 100% secure. Please use a strong, unique password if
          you create an account.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-white/80">
          Questions or requests? Email{" "}
          <a className="underline" href="mailto:support@glowstash.com">
            support@glowstash.com
          </a>
          . (Replace with your preferred contact.)
        </p>
      </section>

      <p className="text-sm text-white/60">Updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}

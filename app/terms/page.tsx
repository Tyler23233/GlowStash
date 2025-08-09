// app/terms/page.tsx
export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Terms of Use</h1>

      <p>
        Welcome to GlowStash. By using our website, you agree to these Terms.
        If you do not agree, please do not use the site.
      </p>

      <section>
        <h2 className="text-xl font-semibold">Use of the Site</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
          <li>
            You may use GlowStash to research products, save items, and follow
            links to retailers. Don’t misuse the site, attempt to break security,
            or scrape content without permission.
          </li>
          <li>
            Product data (images, prices, availability) can change. We provide
            information on a best‑effort basis without warranties.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Affiliate Disclosure</h2>
        <p className="mt-2 text-white/80">
          Some links on GlowStash are affiliate links. We may earn a commission
          if you make a purchase through those links at no additional cost to you.
          <strong> As an Amazon Associate we earn from qualifying purchases.</strong>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Accounts</h2>
        <p className="mt-2 text-white/80">
          If you create an account, you’re responsible for safeguarding it and
          for all activity under it. We may suspend or terminate accounts for
          violations of these Terms or misuse of the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Intellectual Property</h2>
        <p className="mt-2 text-white/80">
          GlowStash and its content are protected by applicable IP laws. Third‑party
          product names, logos, and trademarks belong to their respective owners.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Limitation of Liability</h2>
        <p className="mt-2 text-white/80">
          To the maximum extent permitted by law, GlowStash will not be liable
          for indirect, incidental, or consequential damages arising from your
          use of the site or reliance on its content.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Changes</h2>
        <p className="mt-2 text-white/80">
          We may update these Terms from time to time. Continued use of the site
          after changes means you accept the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-white/80">
          Questions about these Terms? Email{" "}
          <a className="underline" href="mailto:support@glowstash.com">
            support@glowstash.com
          </a>
          .
        </p>
      </section>

      <p className="text-sm text-white/60">Updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}

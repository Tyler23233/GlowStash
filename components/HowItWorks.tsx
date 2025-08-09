import { Search, Heart, Bell } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Find products",
      desc: "Search by brand, product, or type across trusted retailers.",
      Icon: Search,
    },
    {
      title: "Save to your stash",
      desc: "Add items you own or want so everything lives in one place.",
      Icon: Heart,
    },
    {
      title: "Get price alerts",
      desc: "We’ll notify you when prices drop or items go on sale.",
      Icon: Bell,
    },
  ];

  return (
    <section className="mt-14">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
        How it works
      </h2>
      <p className="mt-3 text-center text-white/70">
        Three simple steps to track, compare, and save.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map(({ title, desc, Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:translate-y-[-2px] hover:border-pink-300/50"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

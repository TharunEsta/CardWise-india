import { notFound } from "next/navigation";
import Link from "next/link";

import { EbookActions } from "@/components/shared/ebook-actions";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/data";
import { ebookApplySteps, ebookSections, ebookSupportEmail } from "@/lib/ebook";

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const isEbook = guide.category === "ebook";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <article className="glass-panel relative overflow-hidden rounded-[36px] p-6 sm:p-8 md:p-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(80,170,255,.18),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,215,120,.1),transparent_32%)]" />
        <Badge variant="accent">{isEbook ? "Free eBook" : "Guide"}</Badge>
        <h1 className="relative mt-6 max-w-4xl font-display text-4xl text-white sm:text-5xl md:text-6xl">{guide.title}</h1>
        <p className="relative mt-5 max-w-3xl text-base text-white/62 sm:text-lg">{guide.excerpt}</p>
        {isEbook ? (
          <div className="relative mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(14,24,42,.96),rgba(22,37,67,.84))] p-5 shadow-[0_24px_80px_rgba(0,0,0,.22)] sm:p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-100/75">Free Lead Magnet</div>
              <h2 className="mt-3 max-w-xl font-display text-2xl text-white sm:text-3xl md:text-4xl">Instant download or email delivery after login</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
                This ebook is free. Users log in to download it instantly and/or receive it by email. No payments or subscriptions are required.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["12", "high-signal sections"],
                  ["Free", "no payment wall"],
                  ["Fast", "download or email"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="font-display text-2xl text-[#ffe38a]">{value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-5 sm:p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">What's inside</div>
              <div className="mt-4 grid gap-3 text-sm text-white/72">
                {ebookSections.map((section) => (
                  <div key={section.heading} className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3">
                    {section.heading}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {isEbook ? (
          <div className="mt-10 space-y-5 border-t border-white/10 pt-10">
            {ebookSections.map((section, index) => (
              <section
                key={section.heading}
                className="grid gap-5 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-5 shadow-[0_18px_60px_rgba(0,0,0,.16)] sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
              >
                <div className={`space-y-3 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="inline-flex rounded-full border border-cyan-200/15 bg-cyan-200/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/75">
                    {section.kicker}
                  </div>
                  <h2 className="font-display text-2xl text-white sm:text-3xl md:text-[2.1rem]">{section.heading}</h2>
                  <p className="text-sm leading-7 text-white/68 sm:text-base">{section.body}</p>
                </div>
                <aside className={`relative min-h-[220px] overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/70 p-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute inset-0" style={{ backgroundImage: section.panelGradient }} />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(180deg,rgba(0,0,0,.58),transparent_92%)]" />
                  <div className="relative">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">Reference visual</div>
                    <h3 className="mt-3 max-w-[220px] font-display text-2xl leading-tight text-white">{section.visualTitle}</h3>
                    <p className="mt-3 max-w-[260px] text-sm leading-7 text-white/65">{section.visualText}</p>
                  </div>
                </aside>
              </section>
            ))}
          </div>
        ) : null}
        {isEbook ? (
          <div className="mt-10 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-5 sm:p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-100/75">How To Apply</div>
            <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">Apply for a credit card step by step</h2>
            <div className="mt-5 grid gap-4">
              {ebookApplySteps.map((step) => (
                <section key={step.title} className="grid gap-4 rounded-[26px] border border-white/10 bg-white/5 p-4 sm:p-5 lg:grid-cols-[240px_1fr]">
                  <aside className="relative min-h-[150px] overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/70 p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,233,253,.18),transparent_30%),linear-gradient(145deg,rgba(10,20,36,.96),rgba(22,34,58,.82))]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(180deg,rgba(0,0,0,.58),transparent_92%)]" />
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Reference step</div>
                      <h3 className="mt-3 max-w-[160px] font-display text-2xl leading-tight text-white">{step.visual}</h3>
                    </div>
                  </aside>
                  <div>
                    <h3 className="font-display text-xl text-white sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/66 sm:text-base">{step.text}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        ) : null}
        {!isEbook ? null : (
          <div className="mt-10 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,227,138,.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-5 sm:p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-100/75">Support</div>
            <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">Need more about this? Contact support.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66 sm:text-base">
              If you want help choosing the right credit card for your spending pattern, contact{" "}
              <Link href={`mailto:${ebookSupportEmail}`} className="text-cyan-200 underline-offset-4 hover:underline">
                {ebookSupportEmail}
              </Link>
              .
            </p>
          </div>
        )}
        {!isEbook ? (
          <div className="mt-10 grid gap-4 text-sm text-white/72">
            {ebookSections.map((section) => (
              <p key={section.heading}>{section.heading}</p>
            ))}
          </div>
        ) : null}
        <div className="mt-10">
          <EbookActions sourcePage={`/guides/${guide.slug}`} title={guide.title} />
        </div>
      </article>
    </div>
  );
}

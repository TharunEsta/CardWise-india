import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

import { CardDetailActions } from "@/components/shared/card-detail-actions";
import { CreditCardSurface } from "@/components/shared/credit-card-surface";
import { ReviewActions } from "@/components/shared/review-actions";
import { ReviewList } from "@/components/shared/review-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { CardListing } from "@/components/shared/card-listing";
import { TiltCard } from "@/components/shared/tilt-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cards, getCardBySlug, getRelatedCards } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export default async function CardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const related = getRelatedCards(card);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <Badge variant="accent">{card.bankName}</Badge>
          <div>
            <h1 className="font-display text-4xl text-white sm:text-5xl md:text-6xl">{card.name}</h1>
            <p className="mt-4 max-w-2xl text-base text-white/62 sm:text-lg">{card.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Know More</Button>
            <Button variant="secondary">Save Card</Button>
            <Button variant="secondary" asChild>
              <Link href="/compare">Compare</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Joining fee", formatCurrency(card.joiningFee)],
              ["Annual fee", formatCurrency(card.annualFee)],
              ["Reward rate", card.rewardRate],
              ["Lounge access", card.loungeAccess]
            ].map(([label, value]) => (
              <div key={label} className="glass-panel rounded-[24px] p-4">
                <div className="text-sm text-white/40">{label}</div>
                <div className="mt-2 text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TiltCard className="[perspective:1500px]">
            <div style={{ transformStyle: "preserve-3d" }} className="will-change-transform">
              <CreditCardSurface
                card={card}
                className="shadow-[0_40px_120px_rgba(18,26,43,.72)]"
                style={{ transform: "translateZ(30px) rotateX(2deg)" }}
              />
            </div>
          </TiltCard>
          <div className="glass-panel rounded-[28px] p-5">
            <div className="text-sm uppercase tracking-[0.24em] text-white/35">Sticky CTA Dock</div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div>Forex markup: {card.forexMarkup}</div>
              <div>Fuel waiver: {card.fuelWaiver}</div>
              <div>Welcome benefit: {card.welcomeBenefit}</div>
            </div>
            <div className="mt-5 grid gap-3">
              <CardDetailActions cardName={card.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_.8fr]">
        <div className="space-y-10">
          <div>
            <SectionHeading
              eyebrow="Benefits"
              title="Full benefits stack"
              description="An Apple-style benefit reveal with clear signal on rewards, travel, shopping, dining, and milestone value."
              className="items-start text-left"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {card.benefits.map((benefit) => (
                <div key={benefit.title} className="glass-panel rounded-[28px] p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">{benefit.category}</div>
                  <div className="mt-3 font-display text-xl text-white sm:text-2xl">{benefit.title}</div>
                  <p className="mt-3 text-sm text-white/60">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Fees & Charges</h2>
              <div className="mt-5 space-y-4">
                {card.fees.map((fee) => (
                  <div key={fee.feeType} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white">{fee.feeType}</div>
                    <div className="mt-1 text-sm text-white/45">{fee.amount}</div>
                    <div className="mt-2 text-sm text-white/60">{fee.notes}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Eligibility</h2>
              <div className="mt-5 space-y-3 text-sm text-white/68">
                <div>Age: {card.eligibility.ageRequirement}</div>
                <div>Income: {card.eligibility.incomeRequirement}</div>
                <div>Credit score: {card.eligibility.creditScoreRecommendation}</div>
                <div>Employment: {card.eligibility.employmentType}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Pros</h2>
              <div className="mt-5 space-y-3">
                {card.pros.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Cons</h2>
              <div className="mt-5 space-y-3">
                {card.cons.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-white/72">
                    <XCircle className="mt-0.5 h-4 w-4 text-rose-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Who should get this card</h2>
              <div className="mt-5 space-y-3 text-sm text-white/72">
                {card.whoShouldGet.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[28px] p-6">
              <h2 className="font-display text-3xl text-white">Who should avoid this card</h2>
              <div className="mt-5 space-y-3 text-sm text-white/72">
                {card.whoShouldAvoid.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[28px] p-6">
            <h2 className="font-display text-3xl text-white">Documents required</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {card.documents.map((document) => (
                <div key={document} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  <ShieldCheck className="h-4 w-4 text-cyan-200" />
                  {document}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-white">FAQ</h2>
            <Accordion type="single" collapsible className="mt-6 space-y-4">
              {card.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <SectionHeading
              eyebrow="Comments"
              title="Community comments"
              description="Logged-in users can leave quick comments for the next visitor."
              className="items-start text-left"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <div className="glass-panel rounded-[28px] p-6">
                <ReviewActions cardId={card.id} cardName={card.name} />
              </div>
              <ReviewList cardId={card.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Related Cards"
          title="Similar cards, shown like premium commerce"
          description="Relevant alternatives based on issuer and benefits, surfaced in a polished carousel-style grid."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <CardListing key={item.id} card={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

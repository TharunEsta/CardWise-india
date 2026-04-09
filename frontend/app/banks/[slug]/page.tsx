import { notFound } from "next/navigation";

import { CardListing } from "@/components/shared/card-listing";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { banks, getBankBySlug, getCardsByBankSlug } from "@/lib/data";

export function generateStaticParams() {
  return banks.map((bank) => ({ slug: bank.slug }));
}

export default async function BankPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bank = getBankBySlug(slug);
  if (!bank) notFound();

  const bankCards = getCardsByBankSlug(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="glass-panel rounded-[36px] p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <div className="space-y-5">
            <Badge variant="accent">Bank Profile</Badge>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-[24px] border border-white/10 bg-white/10 font-display text-2xl text-white">
                {bank.logo}
              </div>
              <div>
                <h1 className="font-display text-4xl text-white sm:text-5xl">{bank.name}</h1>
                <div className="text-sm text-white/45">{bankCards.length} cards listed</div>
              </div>
            </div>
            <p className="max-w-3xl text-sm text-white/62 sm:text-base">{bank.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Cashback", "Travel", "Lounge", "Rewards", "Premium", "Beginners"].map((filter) => (
              <Button key={filter} variant="secondary" className="justify-start">
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16">
        <SectionHeading
          eyebrow="Card Lineup"
          title={`All ${bank.name} credit cards`}
          description="Browse the complete issuer lineup, then open individual card pages for benefits, fees, eligibility, pros and cons, and FAQs."
        />
        {bankCards.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bankCards.map((card) => (
              <CardListing key={card.id} card={card} rotating />
            ))}
          </div>
        ) : (
          <div className="glass-panel mt-12 rounded-[28px] p-6 text-center sm:p-8">
            <div className="font-display text-2xl text-white sm:text-3xl">No publicly indexed retail credit cards yet</div>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 sm:text-base">
              This bank is part of the CardWise India issuer universe, but a clear current retail credit card lineup was not surfaced from official indexed pages during verification. We can add it as soon as you want a manual issuer-by-issuer content pass.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

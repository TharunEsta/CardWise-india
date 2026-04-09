import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { BankTile } from "@/components/shared/bank-tile";
import { HeroScene } from "@/components/shared/hero-scene";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { banks } from "@/lib/data";

export default function BanksPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-white/8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[.95fr_1.05fr]">
          <div className="space-y-8">
            <Badge variant="accent">ALL BANKS</Badge>
            <div className="space-y-5">
              <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl">
                Premium issuer discovery across India
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/banks">Explore Banks</MagneticButton>
              <Button asChild variant="secondary" size="lg">
                <Link href="/compare">Compare Cards</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#banks-grid">
                  <ArrowDown className="h-4 w-4" />
                  Jump to banks
                </a>
              </Button>
            </div>
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: "Banks", value: `${banks.length}` },
                { label: "Discovery", value: "3D hero" },
                { label: "Flow", value: "Quick jump" }
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-[24px] p-4">
                  <div className="font-display text-2xl text-white">{stat.value}</div>
                  <div className="text-sm text-white/45">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroScene />
        </div>
      </section>

      <section id="banks-grid" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="All Banks"
          title="Open any bank and explore its credit card lineup"
          description="The issuer wall is now the main entry point to CardWise India."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {banks.map((bank) => (
            <BankTile key={bank.id} bank={bank} />
          ))}
        </div>
      </section>
    </div>
  );
}

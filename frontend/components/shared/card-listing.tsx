"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CreditCardSurface } from "@/components/shared/credit-card-surface";
import { TiltCard } from "@/components/shared/tilt-card";
import { CreditCard } from "@/lib/types";

export function CardListing({
  card,
  rotating = false
}: {
  card: CreditCard;
  rotating?: boolean;
}) {
  return (
    <TiltCard className="h-full [perspective:1400px]">
      <Link
        href={`/card/${card.slug}`}
        className="block h-full rounded-[30px] border border-white/10 bg-white/5 p-3 shadow-[0_24px_80px_rgba(7,12,22,.45)] backdrop-blur-sm"
      >
        {rotating ? (
          <CreditCardSurface
            card={card}
            compact
            className="shadow-[0_40px_120px_rgba(18,26,43,.72)]"
            style={{ transform: "translateZ(20px) rotateX(2deg)" }}
          />
        ) : (
          <CreditCardSurface card={card} compact />
        )}
        <div className="mt-4 flex flex-col gap-3 px-2 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm leading-tight text-white">{card.name}</div>
            <div className="mt-1 text-xs leading-5 text-white/45">{card.rewardRate}</div>
          </div>
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white sm:w-auto">
            View
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

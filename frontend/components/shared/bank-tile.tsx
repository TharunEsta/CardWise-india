import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TiltCard } from "@/components/shared/tilt-card";
import { Bank } from "@/lib/types";

export function BankTile({ bank }: { bank: Bank }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/banks/${bank.slug}`}
        className="glass-panel premium-border relative flex h-full min-h-36 flex-col justify-between overflow-hidden rounded-[28px] p-4 transition duration-300 hover:-translate-y-1 sm:min-h-40 sm:p-5"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${bank.accent} opacity-70`} />
        <div className="relative flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/20 font-display text-lg text-white">
            {bank.logo}
          </div>
          <ArrowUpRight className="h-4 w-4 text-white/50" />
        </div>
        <div className="relative space-y-2">
          <div className="text-sm text-white/55">Explore all cards</div>
          <div className="font-display text-lg leading-tight text-white sm:text-xl">{bank.name}</div>
        </div>
      </Link>
    </TiltCard>
  );
}

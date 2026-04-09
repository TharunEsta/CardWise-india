import type React from "react";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CreditCard } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

export function CreditCardSurface({
  card,
  compact = false,
  className,
  style
}: {
  card: CreditCard;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "premium-border relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1629] p-5 shadow-premium",
        compact ? "min-h-[220px]" : "min-h-[260px] sm:min-h-[280px]",
        className
      )}
      style={{
        backgroundImage: `${card.image}, radial-gradient(circle at top left, rgba(255,255,255,.16), transparent 35%)`,
        ...style
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.22),transparent_20%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <Badge>{card.bankName}</Badge>
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white">
            <Star className="h-3 w-3 fill-current text-amber-300" />
            {card.rating}
          </div>
        </div>
        <div className="space-y-2">
          <div className={cn("font-display leading-tight text-white", compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl")}>{card.name}</div>
          <div className="text-sm leading-6 text-white/65">{card.bestFor}</div>
        </div>
        <div className="grid gap-3 text-sm text-white/75 sm:grid-cols-2">
          <div>
            <div className="text-white/35">Annual fee</div>
            <div>{formatCurrency(card.annualFee)}</div>
          </div>
          <div>
            <div className="text-white/35">Lounge</div>
            <div>{card.loungeAccess}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

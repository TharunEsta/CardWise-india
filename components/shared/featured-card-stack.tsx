"use client";

import { motion } from "framer-motion";

import { CreditCardSurface } from "@/components/shared/credit-card-surface";
import { featuredCards } from "@/lib/data";

export function FeaturedCardStack() {
  return (
    <div className="relative grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
        {featuredCards.slice(0, 3).map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40, rotate: -4 + index * 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="absolute left-0 top-0 w-full max-w-full sm:max-w-xl"
            style={{
              transform: `translate(${index * 14}px, ${index * 18}px) rotate(${index % 2 === 0 ? -3 : 3}deg)`,
              transformOrigin: "top left"
            }}
          >
            <CreditCardSurface card={card} />
          </motion.div>
        ))}
      </div>
      <div className="space-y-4">
        {featuredCards.slice(3).map((card) => (
          <div key={card.id} className="glass-panel rounded-[28px] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display text-lg leading-tight text-white sm:text-xl">{card.name}</div>
                <div className="mt-1 text-sm text-white/55">{card.bestFor}</div>
              </div>
              <div className="text-left text-sm text-white/65 sm:text-right">
                <div>Annual fee</div>
                <div className="text-white">{card.annualFee}</div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-xs text-white/55 sm:grid-cols-3">
              <div>
                <div>Cashback</div>
                <div className="mt-1 text-white">{card.highlightStats.cashback}</div>
              </div>
              <div>
                <div>Lounge</div>
                <div className="mt-1 text-white">{card.loungeAccess}</div>
              </div>
              <div>
                <div>Best for</div>
                <div className="mt-1 text-white">{card.bestFor}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

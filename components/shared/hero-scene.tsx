"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSceneCanvas = dynamic(
  () => import("@/components/shared/hero-scene-canvas").then((module) => module.HeroSceneCanvas),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,196,255,.16),transparent_48%)]" />
  }
);

export function HeroScene() {
  const chips = useMemo(() => ["Cashback Offers", "Travel", "Shopping", "Low Forex", "Lounge Access"], []);

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(98,205,255,.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] sm:h-[420px] sm:rounded-[34px] lg:h-[540px] lg:rounded-[40px]">
      <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(108,196,255,.24),transparent_45%)] blur-3xl" />
      <div className="absolute inset-x-4 bottom-4 top-4 rounded-[24px] border border-white/8 bg-white/[0.03] backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:top-6 sm:rounded-[28px] lg:inset-x-10 lg:bottom-10 lg:top-10 lg:rounded-[32px]" />
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[18%] top-[16%] h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[18%] top-[18%] h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 z-10">
        <HeroSceneCanvas />
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-[24px] border border-white/10 bg-slate-950/18 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-white/45">3D Card Flow</div>
            <div className="mt-2 font-display text-xl text-white sm:text-2xl">Move fast from hero to bank grid</div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/65 sm:flex">
            <ArrowDownRight className="h-4 w-4" />
            Pointer reactive
          </div>
        </div>
      </div>
      {chips.map((chip, index) => (
        <motion.div
          key={chip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.08 }}
          className="glass-panel absolute z-20 hidden rounded-full px-3 py-2 text-[11px] text-white/80 sm:block lg:px-4 lg:text-xs"
          style={{
            left: `${index % 2 === 0 ? 8 + index * 12 : 56 + index * 5}%`,
            top: `${index % 2 === 0 ? 12 + index * 13 : 20 + index * 10}%`
          }}
        >
          {chip}
        </motion.div>
      ))}
    </div>
  );
}

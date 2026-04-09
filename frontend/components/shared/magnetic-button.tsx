"use client";

import type React from "react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export function MagneticButton({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18 });
  const springY = useSpring(y, { stiffness: 160, damping: 18 });
  const rotate = useTransform(springX, [-30, 30], [-3, 3]);

  return (
    <motion.div style={{ x: springX, y: springY, rotateZ: rotate }}>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center rounded-full border border-white/12 bg-white px-6 text-sm font-semibold text-slate-950 shadow-[0_20px_80px_rgba(255,255,255,.16)] transition sm:w-auto",
          className
        )}
        onMouseMove={(event) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
          y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

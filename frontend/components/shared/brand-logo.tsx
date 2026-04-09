type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className = "", compact = false }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,224,130,.96),rgba(76,214,255,.92))] shadow-[0_14px_34px_rgba(0,0,0,.24)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.45),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(9,16,31,.28),transparent_48%)]" />
        <div className="relative font-display text-sm font-semibold tracking-[0.24em] text-slate-950">CW</div>
      </div>
      {compact ? null : (
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.32em] text-white/45">CardWise India</div>
          <div className="truncate font-display text-base text-white sm:text-lg">Premium Card Intelligence</div>
        </div>
      )}
    </div>
  );
}

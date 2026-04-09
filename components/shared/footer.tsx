import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-[1.2fr_repeat(2,.7fr)]">
        <div className="space-y-4">
          <div className="font-display text-2xl text-white">CardWise India</div>
          <p className="max-w-sm text-sm text-white/60">
            A free premium discovery and comparison platform for Indian credit cards, built for better decisions and stronger product intelligence.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/65">
          <div className="text-white">Explore</div>
          <Link href="/banks">Banks</Link>
          <Link href="/compare">Compare</Link>
        </div>
        <div className="space-y-3 text-sm text-white/65">
          <div className="text-white">Resources</div>
          <Link href="/guides/best-credit-cards-in-india-2026-complete-comparison-guide">eBook</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

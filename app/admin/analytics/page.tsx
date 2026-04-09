import { adminAnalyticsCards, adminAnalyticsJourneys } from "@/lib/admin";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <h1 className="font-display text-4xl text-white">Analytics</h1>
        <div className="mt-3 text-sm text-white/55">
          Review top banks, top cards, most searched terms, most clicked CTAs, and ebook performance in one place.
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adminAnalyticsCards.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/40">{label}</div>
              <div className="mt-2 text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <h2 className="font-display text-3xl text-white">User journey reference</h2>
        <div className="mt-5 space-y-3 text-sm text-white/68">
          {adminAnalyticsJourneys.map((journey) => (
            <div key={journey} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {journey}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

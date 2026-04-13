import { getAdminData } from "@/lib/admin-data";

export default async function AdminAnalyticsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <h1 className="font-display text-4xl text-white">Analytics</h1>
        <div className="mt-3 text-sm text-white/55">
          Review top banks, top cards, most searched terms, most clicked CTAs, and ebook performance in one place.
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(data?.analyticsCards ?? []).map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/40">{label}</div>
              <div className="mt-2 text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <h2 className="font-display text-3xl text-white">Recent event stream</h2>
        <div className="mt-5 space-y-3 text-sm text-white/68">
          {(data?.recentEvents ?? []).map((event) => (
            <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-white">{event.actor} -> {event.eventName}</div>
              <div className="mt-1 text-white/50">{event.createdAt}</div>
              <div className="mt-2 text-white/60">{JSON.stringify(event.metadata)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

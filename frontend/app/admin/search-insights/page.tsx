import { getAdminData } from "@/lib/admin-data";

export default async function AdminSearchInsightsPage() {
  const data = await getAdminData();

  return (
    <div className="glass-panel rounded-[28px] p-6">
      <h1 className="font-display text-4xl text-white">Search insights</h1>
      <div className="mt-3 text-sm text-white/55">See which queries users search most so content and card coverage can be updated fast.</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(data?.topSearchTerms ?? []).map(([term, count]) => (
          <div key={term} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white">{term}</div>
            <div className="mt-2 text-sm text-white/45">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

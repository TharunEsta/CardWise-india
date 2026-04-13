import { getAdminData } from "@/lib/admin-data";

export default async function AdminLeadsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <h1 className="font-display text-4xl text-white">Leads and callback requests</h1>
        <div className="mt-3 text-sm text-white/55">Track callback intent, guide leads, and shortlist follow-up from across the site.</div>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <div className="grid gap-3">
          {(data?.leadRows ?? []).map((lead) => (
            <div key={lead.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 xl:grid-cols-[1.3fr_160px_160px_140px_180px] xl:items-center">
              <div>
                <div className="font-medium text-white">{lead.name}</div>
                <div className="mt-1 text-white/50">{lead.source} · {lead.cardName}</div>
              </div>
              <div>{lead.intent}</div>
              <div>{lead.status}</div>
              <div>{lead.createdAt}</div>
              <div className="text-white/55">Open | Assign | Mark resolved</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

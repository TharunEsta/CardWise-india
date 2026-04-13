import { getAdminData } from "@/lib/admin-data";

export default async function AdminOverviewPage() {
  const data = await getAdminData();
  const overviewStats = data?.overviewStats ?? [];
  const recentActivity = data?.recentActivity ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-5xl text-white">Admin dashboard</h1>
        <p className="mt-3 text-white/60">
          A working control layer for content operations, moderation, lead handling, ebook availability, and product insights.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewStats.map(([label, value]) => (
          <div key={label} className="glass-panel rounded-[28px] p-6">
            <div className="text-sm text-white/40">{label}</div>
            <div className="mt-3 font-display text-3xl text-white">{value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <h2 className="font-display text-3xl text-white">Recent activity feed</h2>
          <div className="mt-5 space-y-4 text-sm text-white/65">
            {recentActivity.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-6">
          <h2 className="font-display text-3xl text-white">Quick actions</h2>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Add a new bank profile</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Publish or revise a credit card</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Review callback queue and lead notes</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Swap ebook availability or file edition</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getAdminData } from "@/lib/admin-data";

export default async function AdminUsersPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <h1 className="font-display text-4xl text-white">Users and activity</h1>
        <div className="mt-3 text-sm text-white/55">See who logged in, what they saved, how often they returned, and what actions they took inside the app.</div>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <div className="grid gap-4">
          {(data?.userRows ?? []).map((user) => (
            <div key={user.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="mt-1 text-white/50">{user.email}</div>
                </div>
                <div className="text-white/45">{user.joinedAt}</div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-5">
                <div>Saved cards: {user.savedCount}</div>
                <div>Comments: {user.commentCount}</div>
                <div>Leads: {user.leadCount}</div>
                <div>Downloads: {user.downloadCount}</div>
                <div>Events: {user.eventCount}</div>
              </div>
              <div className="mt-3 text-white/55">Latest saved card: {user.latestSavedCard ?? "Nothing saved yet"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

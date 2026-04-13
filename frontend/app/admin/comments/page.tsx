import { getAdminData } from "@/lib/admin-data";

export default async function AdminCommentsPage() {
  const data = await getAdminData();

  return (
    <div className="glass-panel rounded-[28px] p-6">
      <h1 className="font-display text-4xl text-white">Comment moderation</h1>
      <div className="mt-3 text-sm text-white/55">Handle public questions, approve helpful discussion, and remove low-signal threads.</div>
      <div className="mt-6 space-y-3 text-sm text-white/68">
        {(data?.commentRows ?? []).map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-medium text-white">{comment.author} on {comment.page}</div>
            <div className="mt-2 text-white/65">{comment.body}</div>
            <div className="mt-3 flex flex-wrap gap-4 text-white/50">
              <span>{comment.createdAt}</span>
              <span>{comment.status}</span>
              <span>Approve | Respond | Remove</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

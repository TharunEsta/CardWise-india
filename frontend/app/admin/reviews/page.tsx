import { adminReviewQueue } from "@/lib/admin";

export default function AdminReviewsPage() {
  return (
    <div className="glass-panel rounded-[28px] p-6">
      <h1 className="font-display text-4xl text-white">Review moderation</h1>
      <div className="mt-3 text-sm text-white/55">Approve, hide, or flag user reviews before they affect card trust signals.</div>
      <div className="mt-6 space-y-3 text-sm text-white/68">
        {adminReviewQueue.map((review) => (
          <div key={review.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-medium text-white">{review.user} rated {review.rating}/5 on {review.cardName}</div>
            <div className="mt-2 text-white/65">{review.review}</div>
            <div className="mt-3 flex flex-wrap gap-4 text-white/50">
              <span>{review.createdAt}</span>
              <span>{review.status}</span>
              <span>Approve | Hide | Flag</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

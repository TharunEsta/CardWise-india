export default function AdminReviewsPage() {
  return (
    <div className="glass-panel rounded-[28px] p-6">
      <h1 className="font-display text-4xl text-white">Review moderation</h1>
      <div className="mt-3 text-sm text-white/55">Star ratings and long-form reviews are not yet collected in the live UI. Comments, saves, searches, leads, downloads, and activity history are now stored in Supabase.</div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/68">
        When you want full review moderation here, the next step is adding a rating + review form that writes into `public.card_reviews`.
      </div>
    </div>
  );
}

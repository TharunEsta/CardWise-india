"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";

type FeedbackEntry = {
  id: string;
  user: string;
  kind: "comment";
  message: string;
  createdAt: string;
};

export function ReviewList({ cardSlug }: { cardSlug: string }) {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);

  useEffect(() => {
    async function loadComments() {
      const response = await fetch(`/api/comments?cardSlug=${encodeURIComponent(cardSlug)}`);
      const data = await response.json().catch(() => null);
      setEntries(data?.comments ?? []);
    }

    void loadComments();

    const onRefresh = (event: Event) => {
      const detail = (event as CustomEvent<{ cardSlug?: string }>).detail;
      if (!detail?.cardSlug || detail.cardSlug === cardSlug) {
        void loadComments();
      }
    };

    window.addEventListener("cardwise-comments-updated", onRefresh);
    return () => window.removeEventListener("cardwise-comments-updated", onRefresh);
  }, [cardSlug]);

  if (!entries.length) {
    return (
      <div className="glass-panel rounded-[28px] p-6">
        <div className="font-display text-2xl text-white">No comments yet</div>
        <p className="mt-3 text-sm text-white/60">Be the first logged-in visitor to leave a comment for this card.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="glass-panel rounded-[28px] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-white">{entry.user}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-white/45">
                  {entry.kind}
                </span>
              </div>
              <div className="mt-1 text-xs text-white/45">{new Date(entry.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyan-100/70">
              <MessageSquareText className="h-4 w-4" />
              Comment
            </div>
          </div>
          <p className="mt-3 text-sm text-white/65">{entry.message}</p>
        </div>
      ))}
    </div>
  );
}

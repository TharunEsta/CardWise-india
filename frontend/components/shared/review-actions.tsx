"use client";

import { FormEvent, useState } from "react";
import { MessageSquarePlus } from "lucide-react";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthUser } from "@/lib/use-auth-user";

export function ReviewActions({ cardSlug, cardName }: { cardSlug: string; cardName: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuthUser();
  const activeEmail = user?.email ?? null;
  const canSubmit = message.trim().length >= 8 && Boolean(activeEmail);

  const resetForm = () => {
    setOpen(false);
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !activeEmail) return;

    setSubmitting(true);
    setStatus(null);

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardSlug,
        cardName,
        message
      })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setStatus(data?.message ?? "Unable to save your comment right now.");
      setSubmitting(false);
      return;
    }

    window.dispatchEvent(new CustomEvent("cardwise-comments-updated", { detail: { cardSlug } }));
    resetForm();
    setStatus("Comment published.");
    setSubmitting(false);
  };

  return (
    <>
      <h3 className="font-display text-2xl text-white">Add a comment</h3>
      <p className="mt-3 text-sm text-white/60">
        {activeEmail
          ? `Signed in as ${activeEmail}. You can post a comment for ${cardName} now.`
          : `Login to add a comment for ${cardName}.`}
      </p>
      <div className="mt-6 grid gap-3">
        {activeEmail ? (
          <Button onClick={() => setOpen(true)}>
            <MessageSquarePlus className="h-4 w-4" />
            Add Comment
          </Button>
        ) : (
          <AuthModal />
        )}
        {activeEmail ? null : (
          <div className="text-sm text-white/50">Comments are available after login only.</div>
        )}
        {status ? <div className="text-sm text-emerald-200/85">{status}</div> : null}
      </div>
      <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? resetForm() : setOpen(true))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a comment</DialogTitle>
            <DialogDescription>Share something useful for the next visitor.</DialogDescription>
          </DialogHeader>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="message">
                Your comment
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share a quick tip or note"
                className="min-h-32 w-full rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300/50 focus:bg-white/8"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={!canSubmit || submitting}>
                {submitting ? "Publishing..." : "Publish"}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { MessageSquarePlus } from "lucide-react";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getDemoUser, type DemoUser } from "@/lib/demo-auth";
import { readFeedback, writeFeedback, type FeedbackEntry } from "@/lib/review-store";
import { createClient } from "@/lib/supabase-client";

export function ReviewActions({ cardId, cardName }: { cardId: string; cardName: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      const onChange = () => setDemoUser(getDemoUser());
      onChange();
      window.addEventListener("cardwise-demo-auth-changed", onChange);
      return () => window.removeEventListener("cardwise-demo-auth-changed", onChange);
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activeEmail = user?.email ?? demoUser?.email ?? null;
  const canSubmit = message.trim().length >= 8 && Boolean(activeEmail);

  const resetForm = () => {
    setOpen(false);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !activeEmail) return;

    const nextEntry: FeedbackEntry = {
      id: `${cardId}-${Date.now()}`,
      user: activeEmail,
      kind: "comment",
      message: message.trim(),
      createdAt: new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })
    };

    const nextEntries = [nextEntry, ...readFeedback(cardId)];
    writeFeedback(cardId, nextEntries);
    resetForm();
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
              <Button type="submit" disabled={!canSubmit}>
                Publish
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

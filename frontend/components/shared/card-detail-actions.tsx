"use client";

import { useState } from "react";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/use-auth-user";

export function CardDetailActions({ cardName }: { cardName: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useAuthUser();
  const activeEmail = user?.email ?? null;

  if (!activeEmail) {
    return (
      <div className="space-y-3">
        <AuthModal />
        <div className="text-sm text-white/55">Login to request a callback and save {cardName}.</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={() => {
          setMessage(`Callback requested for ${cardName}. Our team can follow up using ${activeEmail}.`);
        }}
      >
        Get Callback
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setMessage(`${cardName} saved to your shortlist.`);
        }}
      >
        Save Card
      </Button>
      {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
    </div>
  );
}

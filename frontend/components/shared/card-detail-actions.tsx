"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useAuthUser } from "@/lib/use-auth-user";

export function CardDetailActions({ cardSlug, cardName, bankName }: { cardSlug: string; cardName: string; bankName: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isRequestingCallback, setIsRequestingCallback] = useState(false);
  const { user } = useAuthUser();
  const activeEmail = user?.email ?? null;
  const pathname = usePathname();

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
        disabled={isRequestingCallback}
        onClick={async () => {
          setIsRequestingCallback(true);
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              intentType: "callback_request",
              sourcePage: pathname,
              cardSlug,
              cardName,
              bankName
            })
          });

          const data = await response.json().catch(() => null);
          if (response.ok) {
            trackEvent("callback_requested", { card_slug: cardSlug, card_name: cardName, bank_name: bankName, source_page: pathname });
            setMessage(`Callback requested for ${cardName}. Our team can follow up using ${activeEmail}.`);
          } else {
            setMessage(data?.message ?? "Unable to request a callback right now.");
          }
          setIsRequestingCallback(false);
        }}
      >
        {isRequestingCallback ? "Submitting..." : "Get Callback"}
      </Button>
      <Button
        variant="secondary"
        disabled={isSaving}
        onClick={async () => {
          setIsSaving(true);
          const response = await fetch("/api/saved-cards", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              cardSlug,
              cardName,
              bankName
            })
          });

          const data = await response.json().catch(() => null);
          if (response.ok) {
            trackEvent("card_saved", { card_slug: cardSlug, card_name: cardName, bank_name: bankName, source_page: pathname });
            setMessage(`${cardName} saved to your shortlist.`);
          } else {
            setMessage(data?.message ?? "Unable to save this card right now.");
          }
          setIsSaving(false);
        }}
      >
        {isSaving ? "Saving..." : "Save Card"}
      </Button>
      {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
    </div>
  );
}

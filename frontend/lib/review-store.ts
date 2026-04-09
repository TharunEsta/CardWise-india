"use client";

import { reviews } from "@/lib/data";

export type FeedbackEntry = {
  id: string;
  user: string;
  kind: "comment";
  message: string;
  createdAt: string;
};

const eventName = "cardwise-feedback-updated";

const getStorageKey = (cardId: string) => `cardwise-feedback:${cardId}`;

const seedEntries: FeedbackEntry[] = reviews.map((review) => ({
  id: review.id,
  user: review.user,
  kind: "comment",
  message: review.review,
  createdAt: review.createdAt
}));

export function readFeedback(cardId: string) {
  if (typeof window === "undefined") {
    return seedEntries;
  }

  const saved = window.localStorage.getItem(getStorageKey(cardId));
  if (!saved) {
    return seedEntries;
  }

  try {
    const parsed = JSON.parse(saved) as FeedbackEntry[];
    return parsed.length ? parsed : seedEntries;
  } catch {
    return seedEntries;
  }
}

export function writeFeedback(cardId: string, entries: FeedbackEntry[]) {
  window.localStorage.setItem(getStorageKey(cardId), JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(eventName, { detail: { cardId } }));
}

export function subscribeFeedback(cardId: string, onChange: (entries: FeedbackEntry[]) => void) {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ cardId?: string }>).detail;
    if (!detail?.cardId || detail.cardId === cardId) {
      onChange(readFeedback(cardId));
    }
  };

  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

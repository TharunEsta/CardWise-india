import { banks, cards, guides, reviews } from "@/lib/data";

export const adminOverviewStats = [
  ["Total banks", String(banks.length)],
  ["Total cards", String(cards.length)],
  ["Callback leads", "428"],
  ["Open moderation items", "19"],
  ["eBook downloads", "4,920"],
  ["Top CTA", "Get Callback"]
] as const;

export const adminActivityFeed = [
  "Travel lounge card search led to ICICI Emeralde card detail view.",
  "Best Credit Cards in India 2026 guide was downloaded from the homepage hero.",
  "Callback lead created for HDFC Bank Regalia Gold.",
  "Pending review flagged for reward-rate accuracy follow-up."
];

export const adminBankRows = banks.slice(0, 10).map((bank, index) => ({
  id: bank.id,
  name: bank.name,
  cards: cards.filter((card) => card.bankId === bank.id).length,
  status: index < 7 ? "Live" : "Needs review",
  lastUpdated: `${4 - (index % 3)} Apr 2026`
}));

export const adminCardRows = cards.slice(0, 12).map((card, index) => ({
  id: card.id,
  name: card.name,
  bankName: card.bankName,
  fees: card.fees.length,
  benefits: card.benefits.length,
  faqs: card.faqs.length,
  documents: card.documents.length,
  status: index < 9 ? "Published" : "Draft review"
}));

export const adminReviewQueue = reviews.map((review, index) => ({
  ...review,
  cardName: cards[index]?.name ?? "Card page",
  status: index === 0 ? "Pending approval" : "Flagged"
}));

export const adminCommentQueue = [
  {
    id: "comment-1",
    author: "Rahul K.",
    page: cards[0]?.name ?? "Card page",
    body: "Does the lounge access still need quarterly spend?",
    replies: 3,
    status: "Awaiting moderator"
  },
  {
    id: "comment-2",
    author: "Neha S.",
    page: cards[1]?.name ?? "Card page",
    body: "The joining fee waiver line looks unclear. Please confirm.",
    replies: 1,
    status: "Needs response"
  },
  {
    id: "comment-3",
    author: "Amit P.",
    page: guides[0]?.title ?? "Guide page",
    body: "This guide is helpful, but I want a PDF version too.",
    replies: 0,
    status: "Pending approval"
  }
];

export const adminLeadRows = [
  {
    id: "lead-1",
    source: "/cards/hdfc-bank-regalia-gold",
    intent: "Callback request",
    name: "Ananya Verma",
    status: "Call today",
    createdAt: "09 Apr 2026, 10:20 IST"
  },
  {
    id: "lead-2",
    source: "/banks/icici-bank",
    intent: "Know more",
    name: "Ritesh Kumar",
    status: "Email sent",
    createdAt: "09 Apr 2026, 09:05 IST"
  },
  {
    id: "lead-3",
    source: "/guides/best-credit-cards-in-india-2026-complete-comparison-guide",
    intent: "Guide email",
    name: "Megha Shah",
    status: "Delivered",
    createdAt: "08 Apr 2026, 18:42 IST"
  },
  {
    id: "lead-4",
    source: "/compare",
    intent: "Saved card follow-up",
    name: "Karan Mehta",
    status: "Queued",
    createdAt: "08 Apr 2026, 16:10 IST"
  }
];

export const adminEbookItems = [
  {
    id: "ebook-1",
    title: guides[0]?.title ?? "Guide",
    format: "TXT download",
    availability: "Live",
    downloads: "4,920",
    emailSends: "1,804",
    lastUpdated: "09 Apr 2026"
  }
];

export const adminAnalyticsCards = [
  ["Top bank", "HDFC Bank"],
  ["Top card", "Axis Atlas"],
  ["Most searched term", "travel credit card"],
  ["Most clicked CTA", "Get Callback"],
  ["Top ebook source", "/"],
  ["Callback conversion", "18.4%"]
] as const;

export const adminAnalyticsJourneys = [
  "Homepage -> search for cashback -> card detail -> callback request",
  "Bank page -> premium card detail -> compare builder -> guide download",
  "Guide page -> email guide -> return visit -> bank shortlist"
];

export const adminSearchTerms = [
  ["travel credit card", "842 searches"],
  ["lifetime free", "701 searches"],
  ["HDFC", "622 searches"],
  ["lounge access", "590 searches"],
  ["best cashback card", "514 searches"],
  ["forex markup", "286 searches"]
] as const;

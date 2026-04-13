import { createAdminClient } from "@/lib/supabase-admin";

type UserRow = {
  id: string;
  email: string | null;
  name: string | null;
  created_at?: string;
};

function formatTimestamp(value?: string | null) {
  if (!value) {
    return "Just now";
  }

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export async function getAdminData() {
  const admin = createAdminClient();
  if (!admin) {
    return null;
  }

  const [usersResult, savedResult, commentsResult, leadsResult, searchesResult, downloadsResult, eventsResult] = await Promise.all([
    admin.from("users").select("id, email, name, created_at").order("created_at", { ascending: false }).limit(200),
    admin.from("saved_cards").select("id, user_id, card_slug, card_name, bank_name, created_at").order("created_at", { ascending: false }).limit(500),
    admin.from("comments").select("id, user_id, comment, card_slug, card_name, created_at").order("created_at", { ascending: false }).limit(500),
    admin.from("leads").select("id, user_id, source_page, intent_type, status, notes, card_slug, card_name, bank_name, created_at").order("created_at", { ascending: false }).limit(500),
    admin.from("search_logs").select("id, user_id, search_term, result_clicked_type, result_clicked_title, created_at").order("created_at", { ascending: false }).limit(1000),
    admin.from("downloads").select("id, user_id, ebook_name, ebook_slug, downloaded_at").order("downloaded_at", { ascending: false }).limit(500),
    admin.from("user_events").select("id, user_id, event_name, metadata, created_at").order("created_at", { ascending: false }).limit(1000)
  ]);

  const users = (usersResult.data ?? []) as UserRow[];
  const userMap = new Map(users.map((user) => [user.id, user]));
  const savedCards = savedResult.data ?? [];
  const comments = commentsResult.data ?? [];
  const leads = leadsResult.data ?? [];
  const searches = searchesResult.data ?? [];
  const downloads = downloadsResult.data ?? [];
  const events = eventsResult.data ?? [];

  const recentActivity = events.slice(0, 8).map((event) => {
    const actor = userMap.get(event.user_id as string);
    const metadata = (event.metadata as Record<string, unknown> | null) ?? {};
    const target =
      (typeof metadata.card_name === "string" && metadata.card_name) ||
      (typeof metadata.title === "string" && metadata.title) ||
      (typeof metadata.pathname === "string" && metadata.pathname) ||
      (typeof metadata.search_term === "string" && metadata.search_term) ||
      "";

    return `${actor?.email ?? "Guest"} -> ${String(event.event_name).replaceAll("_", " ")}${target ? ` (${target})` : ""}`;
  });

  const searchCounts = new Map<string, number>();
  for (const item of searches) {
    const term = String(item.search_term ?? "").trim();
    if (!term) continue;
    searchCounts.set(term, (searchCounts.get(term) ?? 0) + 1);
  }

  const topSearchTerms = [...searchCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([term, count]) => [term, `${count} searches`] as const);

  const eventCounts = new Map<string, number>();
  for (const event of events) {
    const name = String(event.event_name ?? "");
    if (!name) continue;
    eventCounts.set(name, (eventCounts.get(name) ?? 0) + 1);
  }

  const topEvent = [...eventCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const topSavedCard = [...savedCards.reduce((map, item) => {
    const key = String(item.card_name ?? item.card_slug ?? "Unknown card");
    map.set(key, (map.get(key) ?? 0) + 1);
    return map;
  }, new Map<string, number>()).entries()].sort((a, b) => b[1] - a[1])[0];

  const userRows = users.map((user) => {
    const userSaved = savedCards.filter((item) => item.user_id === user.id);
    const userComments = comments.filter((item) => item.user_id === user.id);
    const userLeads = leads.filter((item) => item.user_id === user.id);
    const userDownloads = downloads.filter((item) => item.user_id === user.id);
    const userEvents = events.filter((item) => item.user_id === user.id);

    return {
      id: user.id,
      email: user.email ?? "No email",
      name: user.name ?? "CardWise user",
      savedCount: userSaved.length,
      commentCount: userComments.length,
      leadCount: userLeads.length,
      downloadCount: userDownloads.length,
      eventCount: userEvents.length,
      latestSavedCard: userSaved[0]?.card_name ?? userSaved[0]?.card_slug ?? null,
      joinedAt: formatTimestamp(user.created_at)
    };
  });

  const leadRows = leads.slice(0, 50).map((lead) => ({
    id: String(lead.id),
    name: userMap.get(lead.user_id as string)?.email ?? "Guest user",
    source: String(lead.source_page ?? "/"),
    intent: String(lead.intent_type ?? "callback_request"),
    status: String(lead.status ?? "new"),
    createdAt: formatTimestamp(lead.created_at as string | null),
    cardName: (lead.card_name as string | null) ?? (lead.card_slug as string | null) ?? "Card request"
  }));

  const commentRows = comments.slice(0, 50).map((comment) => ({
    id: String(comment.id),
    author: userMap.get(comment.user_id as string)?.email ?? "CardWise user",
    page: (comment.card_name as string | null) ?? (comment.card_slug as string | null) ?? "Card page",
    body: String(comment.comment ?? ""),
    status: "Live",
    replies: 0,
    createdAt: formatTimestamp(comment.created_at as string | null)
  }));

  return {
    overviewStats: [
      ["Registered users", String(users.length)],
      ["Saved cards", String(savedCards.length)],
      ["Callback leads", String(leads.length)],
      ["Comments", String(comments.length)],
      ["Search logs", String(searches.length)],
      ["eBook downloads", String(downloads.length)]
    ] as const,
    recentActivity,
    analyticsCards: [
      ["Top event", topEvent ? `${topEvent[0]} (${topEvent[1]})` : "No activity yet"],
      ["Top saved card", topSavedCard ? `${topSavedCard[0]} (${topSavedCard[1]})` : "No saved cards yet"],
      ["Most searched term", topSearchTerms[0]?.[0] ?? "No searches yet"],
      ["Most clicked CTA", eventCounts.get("callback_requested") ? `Get Callback (${eventCounts.get("callback_requested")})` : "No CTA clicks yet"],
      ["Top ebook source", downloads[0]?.ebook_name ? String(downloads[0].ebook_name) : "No downloads yet"],
      ["Tracked page views", String(eventCounts.get("page_viewed") ?? 0)]
    ] as const,
    leadRows,
    commentRows,
    userRows,
    topSearchTerms,
    recentEvents: events.slice(0, 30).map((event) => ({
      id: String(event.id),
      eventName: String(event.event_name),
      actor: userMap.get(event.user_id as string)?.email ?? "Guest",
      createdAt: formatTimestamp(event.created_at as string | null),
      metadata: (event.metadata as Record<string, unknown> | null) ?? {}
    }))
  };
}

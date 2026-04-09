import type React from "react";
import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/banks", label: "Banks" },
  { href: "/admin/cards", label: "Cards" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/ebooks", label: "eBooks" },
  { href: "/admin/search-insights", label: "Search Insights" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[240px_1fr]">
      <aside className="glass-panel h-fit rounded-[28px] p-4">
        <div className="px-3 py-4 font-display text-2xl text-white">Admin</div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block shrink-0 rounded-2xl px-3 py-3 text-sm text-white/68 transition hover:bg-white/8 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}

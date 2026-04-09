"use client";

import type React from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchIndex } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export function CommandSearch({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) {
      return searchIndex.slice(0, 12);
    }

    const normalized = query.toLowerCase();
    return searchIndex.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(normalized)).slice(0, 12);
  }, [query]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search banks, cards, categories, and guides</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
            <Input
              className="pl-11"
              placeholder="Search HDFC, travel card, cashback..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                trackEvent("search_performed", { search_term: event.target.value });
              }}
            />
          </div>
          <div className="space-y-2">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start justify-between gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 transition hover:border-cyan-200/30 hover:bg-white/8"
                onClick={() =>
                  trackEvent("search_result_clicked", {
                    search_term: query,
                    result_clicked_type: item.type,
                    result_clicked_id: item.id
                  })
                }
              >
                <div className="min-w-0">
                  <div className="text-sm text-white">{item.title}</div>
                  <div className="text-xs text-white/45">{item.subtitle}</div>
                </div>
                <div className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-white/30 sm:text-xs">{item.type}</div>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

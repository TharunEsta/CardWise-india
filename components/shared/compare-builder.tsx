"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cards } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const comparisonRows = [
  { key: "annualFee", label: "Annual fee" },
  { key: "joiningFee", label: "Joining fee" },
  { key: "rewardRate", label: "Cashback / rewards" },
  { key: "loungeAccess", label: "Lounge access" },
  { key: "forexMarkup", label: "Forex markup" },
  { key: "fuelWaiver", label: "Fuel waiver" },
  { key: "eligibilitySummary", label: "Eligibility" },
  { key: "welcomeBenefit", label: "Welcome benefit" }
] as const;

export function CompareBuilder() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(cards.slice(0, 2).map((card) => card.id));

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return cards.filter((card) => `${card.name} ${card.bankName}`.toLowerCase().includes(normalized)).slice(0, 18);
  }, [query]);

  const selectedCards = selected.map((id) => cards.find((card) => card.id === id)).filter(Boolean);

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-[28px] p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_.6fr]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search and add cards to compare" />
          <Button variant="secondary">Save Comparison After Login</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {filtered.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selected.includes(card.id)
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-white/70"
              }`}
              onClick={() => {
                if (selected.includes(card.id)) {
                  setSelected(selected.filter((value) => value !== card.id));
                  return;
                }
                if (selected.length < 3) {
                  setSelected([...selected, card.id]);
                }
              }}
            >
              {card.name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[32px] border border-white/10 bg-white/5">
        <div className="min-w-[860px]">
        <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] border-b border-white/10">
          <div className="p-5 text-sm uppercase tracking-[0.2em] text-white/35">Feature</div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border-l border-white/10 p-5">
              {selectedCards[index] ? (
                <div>
                  <div className="font-display text-xl text-white">{selectedCards[index]?.name}</div>
                  <div className="text-sm text-white/45">{selectedCards[index]?.bankName}</div>
                </div>
              ) : (
                <div className="text-sm text-white/30">Select a card</div>
              )}
            </div>
          ))}
        </div>

        {comparisonRows.map((row) => (
          <div key={row.key} className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] border-b border-white/10 last:border-b-0">
            <div className="p-5 text-sm text-white/55">{row.label}</div>
            {Array.from({ length: 3 }).map((_, index) => {
              const card = selectedCards[index];
              const value = card?.[row.key];
              return (
                <div key={index} className="border-l border-white/10 p-5 text-sm text-white/75">
                  {typeof value === "number" ? formatCurrency(value) : value || "NA"}
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

import { adminCardRows } from "@/lib/admin";

export default function AdminCardsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-white">Manage cards</h1>
            <p className="mt-2 text-sm text-white/55">Maintain credit cards, including benefits, fees, eligibility, FAQs, and required documents.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">+ Add card</div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Benefits", "Bulk edit reward highlights and lounge value"],
          ["Fees", "Keep joining fee, annual fee, waiver rules current"],
          ["Eligibility", "Track income, score, and employment guidance"],
          ["FAQs & documents", "Publish support content and document checklists"]
        ].map(([label, text]) => (
          <div key={label} className="glass-panel rounded-[24px] p-5">
            <div className="text-sm text-white/45">{label}</div>
            <div className="mt-2 text-sm text-white/72">{text}</div>
          </div>
        ))}
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <div className="grid gap-3">
          {adminCardRows.map((card) => (
            <div key={card.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 xl:grid-cols-[1.5fr_1fr_90px_90px_90px_100px_130px_220px] xl:items-center">
              <div className="font-medium text-white">{card.name}</div>
              <div>{card.bankName}</div>
              <div>{card.benefits} benefits</div>
              <div>{card.fees} fees</div>
              <div>{card.faqs} FAQs</div>
              <div>{card.documents} docs</div>
              <div>{card.status}</div>
              <div className="text-white/55">Edit | Duplicate | Archive</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

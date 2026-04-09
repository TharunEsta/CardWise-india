import { adminBankRows } from "@/lib/admin";

export default function AdminBanksPage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-white">Manage banks</h1>
            <p className="mt-2 text-sm text-white/55">Add, edit, delete, and review issuer coverage from one place.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">+ Add bank</div>
        </div>
      </div>
      <div className="glass-panel rounded-[28px] p-6">
        <div className="grid gap-3">
          {adminBankRows.map((bank) => (
            <div key={bank.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 md:grid-cols-[1.4fr_100px_140px_140px_220px] md:items-center">
              <div className="font-medium text-white">{bank.name}</div>
              <div>{bank.cards} cards</div>
              <div>{bank.status}</div>
              <div>{bank.lastUpdated}</div>
              <div className="text-white/55">Edit | Delete | View cards</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

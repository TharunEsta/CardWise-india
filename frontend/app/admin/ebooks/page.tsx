import { adminEbookItems } from "@/lib/admin";

export default function AdminEbooksPage() {
  return (
    <div className="glass-panel rounded-[28px] p-6">
      <h1 className="font-display text-4xl text-white">eBooks</h1>
      <div className="mt-3 text-sm text-white/55">Manage ebook uploads, toggle availability, and watch download and email performance.</div>
      <div className="mt-6 space-y-4">
        {adminEbookItems.map((ebook) => (
          <div key={ebook.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/68">
            <div className="font-medium text-white">{ebook.title}</div>
            <div className="mt-3 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              <div>{ebook.format}</div>
              <div>{ebook.availability}</div>
              <div>{ebook.downloads} downloads</div>
              <div>{ebook.emailSends} emails</div>
              <div>{ebook.lastUpdated}</div>
              <div className="text-white/55">Upload | Replace file | Pause</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

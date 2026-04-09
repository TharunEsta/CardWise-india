export default function BankLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="glass-panel rounded-[36px] p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <div className="space-y-5">
            <div className="h-6 w-28 animate-pulse rounded-full bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 animate-pulse rounded-[24px] bg-white/10" />
              <div className="space-y-3">
                <div className="h-10 w-64 animate-pulse rounded-xl bg-white/10" />
                <div className="h-4 w-28 animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>
            <div className="h-4 w-full max-w-3xl animate-pulse rounded-xl bg-white/10" />
            <div className="h-4 w-4/5 max-w-2xl animate-pulse rounded-xl bg-white/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-11 animate-pulse rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-[30px] border border-white/10 bg-white/5 p-3">
            <div className="h-[220px] animate-pulse rounded-[28px] bg-white/10" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-3 h-3 w-1/2 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-5 h-9 w-20 animate-pulse rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

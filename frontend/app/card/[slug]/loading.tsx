export default function CardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <div className="h-6 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="space-y-4">
            <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-5 w-full max-w-2xl animate-pulse rounded-xl bg-white/10" />
            <div className="h-5 w-3/4 max-w-xl animate-pulse rounded-xl bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-11 w-36 animate-pulse rounded-full bg-white/10" />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass-panel rounded-[24px] p-4">
                <div className="h-4 w-20 animate-pulse rounded-xl bg-white/10" />
                <div className="mt-3 h-5 w-28 animate-pulse rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-[280px] animate-pulse rounded-[28px] bg-white/10" />
          <div className="glass-panel rounded-[28px] p-5">
            <div className="h-4 w-28 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-4 w-full animate-pulse rounded-xl bg-white/10" />
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              <div className="h-11 animate-pulse rounded-full bg-white/10" />
              <div className="h-11 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

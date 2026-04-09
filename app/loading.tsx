export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="glass-panel h-48 animate-pulse rounded-[36px]" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="glass-panel h-72 animate-pulse rounded-[28px]" />
        <div className="glass-panel h-72 animate-pulse rounded-[28px]" />
        <div className="glass-panel h-72 animate-pulse rounded-[28px]" />
      </div>
    </div>
  );
}

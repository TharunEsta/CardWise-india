export function Spotlight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{ background: "radial-gradient(circle at 50% 16%, rgba(123, 225, 255, 0.14), transparent 18%)" }}
    />
  );
}

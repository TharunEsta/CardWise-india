import { CompareBuilder } from "@/components/shared/compare-builder";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Compare"
        title="A premium side-by-side compare canvas"
        description="Search cards, add up to three, compare high-signal benefits, and save the comparison after login."
      />
      <div className="mt-12">
        <CompareBuilder />
      </div>
    </div>
  );
}

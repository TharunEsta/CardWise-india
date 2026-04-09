import { notFound } from "next/navigation";

import { CardListing } from "@/components/shared/card-listing";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories, getCardsByCategory } from "@/lib/data";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryCards = getCardsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Category"
        title={`${category.name} credit cards`}
        description={`Explore premium Indian ${category.name.toLowerCase()} card options with rich product pages and comparison-first discovery.`}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categoryCards.map((card) => (
          <CardListing key={card.id} card={card} rotating />
        ))}
      </div>
    </div>
  );
}

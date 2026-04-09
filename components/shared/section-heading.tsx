import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl space-y-4 text-center", className)}>
      <Badge variant="accent" className="mx-auto w-fit">
        {eyebrow}
      </Badge>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
      <p className="text-sm text-white/64 sm:text-base md:text-lg">{description}</p>
    </div>
  );
}

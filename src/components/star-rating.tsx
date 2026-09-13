import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            "shrink-0",
            rating >= i - 0.25
              ? "fill-cherry text-cherry"
              : rating >= i - 0.75
                ? "fill-cherry/50 text-cherry"
                : "fill-transparent text-muted-foreground/50",
          )}
        />
      ))}
    </span>
  );
}

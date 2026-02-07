import { Badge } from "@/components/ui/badge";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TagListProps {
  tags: Tag[];
  className?: string;
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          style={{
            backgroundColor: tag.color,
            color: "#fff", // Texto blanco para que resalte sobre el color
          }}
          className="border-none rounded-full px-3 py-1 text-xs font-semibold shadow-none transition-transform hover:scale-105"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

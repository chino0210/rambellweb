// components/card-model.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CardModelProps {
  escrito: {
    id: string;
    titulo_escrito: string;
    resumen?: string;
    link_imagen?: string | null;
    tags?: { id: number; name: string; color: string }[];
  };
}

export default function CardModel({ escrito }: CardModelProps) {
  if (!escrito) return null;

  return (
    /* He quitado 'shadow-lg' y 'hover:shadow-2xl'. He añadido un borde sutil para que no se pierda en el fondo */
    <Card className="p-0 group relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-card shadow-none transition-all duration-300">
      {/* Imagen pegada arriba sin espacios */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src={escrito.link_imagen || "/Fondo Prueba.avif"}
          alt={escrito.titulo_escrito}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges sin sombras */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          {escrito.tags?.map((tag) => (
            <Badge
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="border-none text-white rounded-full px-3 shadow-none"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      <CardHeader className="space-y-2 p-5 pt-6">
        <CardTitle className="line-clamp-2 text-xl font-bold leading-tight tracking-tight">
          {escrito.titulo_escrito}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {escrito.resumen || "Explora este escrito detalladamente..."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          /* Botón plano sin sombras */
          className="w-full font-semibold tracking-wide transition-all hover:gap-2 rounded-xl shadow-none"
        >
          <Link href={`/escrito/${escrito.id}`}>
            Ver Escrito
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

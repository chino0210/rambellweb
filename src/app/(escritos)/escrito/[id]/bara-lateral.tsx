// components/escrito-sidebar.tsx
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookmarkIcon } from "lucide-react";
import { BotonGuardar } from "@/components/elements/favorito-button";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface SidebarProps {
  fecha: Date;
  guardados: number;
  tags: Tag[];
  idDocumento: string;
}

export function EscritoSidebar({
  fecha,
  guardados,
  tags,
  idDocumento,
}: SidebarProps) {
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <aside className="sticky top-24 space-y-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="space-y-3">
        <BotonGuardar idDocumento={idDocumento} />
        <p className="text-[10px] text-center text-slate-400">
          Accede a tus documentos guardados desde tu perfil.
        </p>
      </div>

      <hr className="border-slate-200" />
      {/* Metadata */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Información
        </h3>

        <div className="flex items-center gap-3 text-slate-600">
          <CalendarIcon className="size-4 text-blue-500/60" />
          <span className="text-sm font-medium">{fechaFormateada}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <BookmarkIcon className="size-4 text-red-500/60" />
          <span className="text-sm font-medium">
            {guardados || 0} guardados
          </span>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Tags */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Etiquetas
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Badge
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="border-none text-white rounded-full px-4 py-1 text-[11px] font-semibold"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />
      {/* Articulos Relacionados - Anuncios */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Articulos relacionados:{" "}
        </h3>
      </div>
      <hr className="border-slate-200" />
      {/* Anuncios */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Anuncios:
        </h3>
      </div>
    </aside>
  );
}

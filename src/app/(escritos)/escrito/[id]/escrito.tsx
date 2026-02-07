// escrito.tsx
import { PlateRenderer } from "./plate-render";

interface EscritoProps {
  titulo: string;
  contenido: any;
  autorNombre: string;
}

export default function EscritoPage({
  titulo,
  contenido,
  autorNombre,
}: EscritoProps) {
  return (
    <article className="max-w-4xl mx-auto py-10 px-6">
      {/* Header del Autor */}
      <h1 className="text-4xl font-bold mb-10">{titulo}</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
          {autorNombre?.charAt(0) || "U"}
        </div>
        <span className="text-sm font-medium">{autorNombre}</span>
      </div>
      {/* El contenido renderizado con Plate */}
      <div className="min-h-75">
        <PlateRenderer initialValue={contenido} />
      </div>
    </article>
  );
}

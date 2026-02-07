// page.tsx
import prisma from "@/lib/prisma";
import EscritoPage from "./escrito";
import { EscritoSidebar } from "./bara-lateral"; // Importa el nuevo componente
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const escrito = await prisma.escrito.findUnique({
    where: { id },
    include: {
      autor: true,
      tags: true,
    },
  });

  if (!escrito) notFound();

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lado Izquierdo: El escrito */}
        <div className="lg:col-span-2">
          <EscritoPage
            titulo={escrito.titulo_escrito}
            contenido={escrito.contenido}
            autorNombre={escrito.autor?.name || "Anónimo"}
          />
        </div>

        {/* Lado Derecho: La barra lateral separada */}
        <div className="lg:col-span-1">
          <EscritoSidebar
            fecha={escrito.createdAt}
            guardados={escrito.numero_guardados}
            tags={escrito.tags}
            idDocumento={escrito.id}
          />
        </div>
      </div>
    </main>
  );
}

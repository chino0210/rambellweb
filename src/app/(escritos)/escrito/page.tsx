// src/app/(public)/page.tsx
import prisma from "@/lib/prisma";
import CardSlide from "../card-slide";

export default async function Page() {
  // Obtenemos los escritos incluyendo sus relaciones
  const escritosRaw = await prisma.escrito.findMany({
    include: {
      tags: true,
      autor: true,
    },
  });

  // Serialización para evitar errores de objetos Date o BigInt en Client Components
  const escritos = JSON.parse(JSON.stringify(escritosRaw));

  return (
    <div className="container mx-auto py-6">
      <div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Escritos disponibles:
          </h3>
        </div>
        <CardSlide escritos={escritos} statusFilter="PUBLICADO" />
      </div>
      <div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Escritos recomendados:
          </h3>
        </div>
        <CardSlide escritos={escritos} statusFilter="PUBLICADO" />
      </div>
    </div>
  );
}

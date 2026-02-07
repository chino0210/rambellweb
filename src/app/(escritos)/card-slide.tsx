// components/card-slide.tsx
"use client";
import CardModel from "./card";

interface CardSlideProps {
  escritos: any[];
  statusFilter?: "PUBLICADO" | "BORRADOR" | "TODOS";
  categoriaFilter?: string; // Aquí pasaremos el nombre como "Derecho Ambiental"
}

export default function CardSlide({
  escritos,
  statusFilter = "TODOS",
  categoriaFilter = "TODAS",
}: CardSlideProps) {
  const escritosFiltrados = escritos?.filter((item) => {
    // 1. Filtro por Status (de tu primera imagen)
    const cumpleStatus =
      statusFilter === "TODOS" || item.status === statusFilter;

    // 2. Filtro por Categoría/Tags (de tu segunda imagen)
    // Asumiendo que en tu objeto 'escrito', el campo se llama 'tags' o 'categoria'
    // y contiene el nombre o un objeto con el nombre.
    const cumpleCategoria =
      categoriaFilter === "TODAS" ||
      item.tags === categoriaFilter ||
      item.categoria?.name === categoriaFilter;

    return cumpleStatus && cumpleCategoria;
  });

  return (
    <div className="w-full">
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {escritosFiltrados?.map((item, index) => (
          <div key={item.id || index}>
            <CardModel escrito={item} />
          </div>
        ))}
      </div>

      {/* Si después de filtrar no hay nada, mostramos un aviso */}
      {escritosFiltrados?.length === 0 && (
        <div className="text-center py-20 w-full">
          <p className="text-gray-400 text-lg">
            No hay escritos en <strong>{categoriaFilter}</strong> con estado{" "}
            <strong>{statusFilter}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

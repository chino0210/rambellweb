// src/app/(admin)/escrito/[id]/edit/page.tsx
import { auth } from "@/app/actions/auth";
import { redirect } from "next/navigation";

import UpdateForm from "./update_form";
import prisma from "@/lib/prisma";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Buscamos el escrito
  const escrito = await prisma.escrito.findUnique({
    where: { id },
    include: { tags: true },
  });

  // 2. BUSCAMOS TODAS LAS ETIQUETAS (Esto es lo que falta)
  const todasLasEtiquetas = await prisma.tag.findMany();

  // 3. BUSCAMOS TODOS LOS AUTORES (También necesario para el select)
  const todosLosAutores = await prisma.autor.findMany();

  if (!escrito) notFound();

  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/escrito");
  }

  return (
    <UpdateForm
      escrito={escrito}
      etiquetasDisponibles={todasLasEtiquetas} // <-- Asegúrate de pasar esto
      autores={todosLosAutores} // <-- Y esto
    />
  );
}

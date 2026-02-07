"use server";

import { auth } from "@/app/actions/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleGuardarEscrito(escritoId: string) {
  const session = await auth();
  
  // Si no hay sesión, no lanzamos error 500, retornamos un mensaje claro
  if (!session?.user?.id) {
    return { error: "Debes iniciar sesión para guardar" };
  }

  const userId = Number(session.user.id);

  try {
    const existente = await prisma.guardado.findUnique({
      where: {
        userId_escritoId: { userId, escritoId }
      }
    });

    if (existente) {
      await prisma.guardado.delete({
        where: { id: existente.id }
      });
    } else {
      await prisma.guardado.create({
        data: { userId, escritoId }
      });
    }

    revalidatePath("/cuenta"); // Actualiza el dashboard automáticamente
    return { success: true };
  } catch (error) {
    console.error("Error en toggleGuardarEscrito:", error);
    return { error: "Error interno del servidor" };
  }
}
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTagAction(formData: FormData) {
  const name = formData.get("nombre-tag") as string;
  const color = formData.get("color-tag") as string;

  if (!name || name.trim() === "") return { error: "El nombre es obligatorio" };

  try {
    await prisma.tag.create({
      data: { name: name.trim(), color },
    });
    revalidatePath("/tags"); // Cambia a la ruta donde uses esto
    return { success: true };
  } catch (error) {
    return { error: "La etiqueta ya existe o hubo un error." };
  }
}

export async function deleteTagAction(id: number) {
  try {
    await prisma.tag.delete({ where: { id } });
    revalidatePath("/tags");
    return { success: true };
  } catch (error) {
    return { error: "No se pudo eliminar la etiqueta." };
  }
}

export async function updateTagAction(id: number, formData: FormData) {
  const name = formData.get("nombre-tag") as string;
  const color = formData.get("color-tag") as string;

  try {
    await prisma.tag.update({
      where: { id },
      data: { name, color },
    });
    revalidatePath("/tags");
    return { success: true };
  } catch (error) {
    return { error: "Error al actualizar." };
  }
}

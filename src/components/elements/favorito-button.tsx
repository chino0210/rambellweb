// components/boton-guardar.tsx
"use client";

import { useSession } from "next-auth/react";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // O tu librería de notificaciones
import { toggleGuardarEscrito } from "@/app/actions/favorite";

export function BotonGuardar({ idDocumento }: { idDocumento: string }) {
  const { status } = useSession();

  const handleGuardar = async () => {
    if (status === "unauthenticated") {
      toast.error("Función disponible solo para usuarios registrados");
      return;
    }

    try {
      await toggleGuardarEscrito(idDocumento);
      toast.success("¡Guardado en tu cuenta!");
    } catch (error) {
      toast.error("Hubo un error al guardar");
    }
  };

  return (
    <Button
      onClick={handleGuardar}
      variant="outline"
      className="w-full flex items-center justify-center gap-2 rounded-xl py-6 border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-all group"
    >
      <BookmarkIcon className="size-5 group-hover:fill-blue-600" />
      <span className="font-bold">Guardar este escrito</span>
    </Button>
  );
}

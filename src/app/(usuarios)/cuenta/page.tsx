export const runtime = "nodejs";

import { auth } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Shield,
  BookOpen,
  Settings,
  ChevronRight,
} from "lucide-react";
import LogoutButton from "./logout-button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  // 1. Obtener sesión
  const session = await auth();

  // 2. Proteger la ruta: Si no hay sesión o no hay ID, fuera.
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 3. Convertir ID de forma segura
  const userId = parseInt(session.user.id);

  // 4. Validación extra para Prisma
  if (isNaN(userId)) {
    console.log("Invalid user ID:", session.user.id);
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-bold">
          Error de sesión: ID de usuario no válido.
        </p>
        <LogoutButton />
      </div>
    );
  }

  // 5. Ahora sí, la consulta es segura
  let misGuardados;
  try {
    misGuardados = await prisma.guardado.findMany({
      where: {
        userId: userId, // Aquí ya es un número garantizado
      },
      include: {
        escrito: {
          include: { autor: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 font-bold">
          Error al cargar guardados. Inténtalo de nuevo.
        </p>
        <LogoutButton />
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* ... (Resto del código de la UI que ya tienes) ... */}
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Hola, {user?.name || "Usuario"}
              </h1>
              <p className="text-slate-500 text-sm">
                Gestiona tus lecturas guardadas
              </p>
            </div>
          </div>
          <LogoutButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contadores y datos (Usa el código del mensaje anterior) */}
          <div className="md:col-span-1 space-y-6">
            {/* ... Tarjeta de datos ... */}
          </div>

          {/* Listado de guardados */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <BookOpen size={20} className="text-blue-500" /> Mi Biblioteca
              </h2>

              <div className="grid gap-3">
                {misGuardados.length === 0 ? (
                  <p className="text-slate-400 text-center py-10">
                    No hay guardados aún.
                  </p>
                ) : (
                  misGuardados.map((item) => (
                    <Link
                      href={`/escrito/${item.escrito.id}`}
                      key={item.id}
                      className="p-4 border rounded-xl hover:bg-slate-50 flex justify-between items-center"
                    >
                      <span>{item.escrito.titulo_escrito}</span>
                      <ChevronRight size={16} />
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

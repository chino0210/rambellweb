"use client";

export const dynamic = "force-dynamic";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import LogoRambell from "../../../public/logo_rambell.svg";

import { useSession } from "next-auth/react"; // <--- NUEVO
import { UserCircle } from "lucide-react"; // Icono opcional para la cuenta

const NavBarPrincipal = [
  { name: "Escritos", href: "/escrito" },
  { name: "Contacto", href: "/contacto" },
  { name: "Equipo", href: "/equipo" },
  { name: "Nosotros", href: "/nosotros" },
];

const NavBarSecond = [
  { name: "General5", href: "/escritos" },
  { name: "General4", href: "#" },
  { name: "General3", href: "#" },
  { name: "General2", href: "#" },
  { name: "General1", href: "#" },
];

// NavLink fuera para evitar errores de renderizado
const NavLink = ({
  item,
  className,
}: {
  item: (typeof NavBarPrincipal)[0];
  className?: string;
}) => (
  <Link
    href={item.href}
    className={cn(
      "text-sm font-semibold text-white transition-colors",
      className,
    )}
  >
    {item.name}
  </Link>
);

export default function NavBar() {
  const { data: session, status } = useSession(); // <--- OBTENER SESIÓN
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <header className="bg-[#051129] border-b border-white/5 h-[73px] z-50 relative" />
    );

  return (
    <header className="bg-[#051129] border-b border-white/5 relative z-50 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-3 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image // Para poner el logo en laNavBar (lo sacas con ctrl + K ; ctrl + U)
              src={LogoRambell}
              alt="LogoRambell"
              width={40}
              height={40}
              className="brightness-0 invert" // <--- ESTO PONE EL LOGO EN BLANCO
              priority
            />
          </Link>
        </div>

        {/* --- MOBILE (CELULAR) --- */}
        <div className="flex lg:hidden items-center gap-x-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-900 border-white/10 text-white w-75 px-12 pt-18"
            >
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <SheetDescription className="sr-only">
                Navegación móvil
              </SheetDescription>

              <div className="mt-8 flex flex-col gap-y-4">
                <NavLink item={NavBarPrincipal[0]} className="text-lg" />

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="escritos" className="border-none">
                    <AccordionTrigger className="text-lg font-semibold py-0 hover:no-underline hover:text-indigo-400">
                      Escritos
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-3 pl-4 mt-3 border-l border-white/10">
                      {NavBarSecond.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {NavBarPrincipal.slice(1).map((l) => (
                  <NavLink key={l.name} item={l} className="text-lg" />
                ))}

                <hr className="border-white/10 my-2" />
                {status === "authenticated" ? (
                  <Link
                    href="/cuenta"
                    className="text-lg font-semibold text-indigo-400 flex items-center gap-2"
                  >
                    <UserCircle size={20} /> Cuenta
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-lg font-semibold text-indigo-400"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* --- DESKTOP (PC) --- */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          <NavLink
            item={NavBarPrincipal[0]}
            className="hover:bg-[#0B2b6b]/25 rounded-md py-3 px-5 transition-colors"
          />

          <div
            className="relative"
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <button className="flex items-center gap-x-1 text-sm font-semibold outline-none py-2 group">
              Escritos
              <ChevronDown
                className={cn(
                  "size-4 text-gray-500 transition-transform duration-200",
                  isPopoverOpen && "rotate-180",
                )}
              />
            </button>

            {isPopoverOpen && (
              <div className="absolute -left-8 top-full z-10 w-48 rounded-xl bg-[#0B2B6B] shadow-xl ring-1 ring-white/10 p-2">
                {NavBarSecond.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    className="block rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/15 hover:text-white transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NavBarPrincipal.slice(1).map((l) => (
            <NavLink
              key={l.name}
              item={l}
              className="hover:bg-[#0B2B6B]/25 py-3 px-5 rounded-md"
            />
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-1">
          {status === "authenticated" ? (
            <Link
              href="/cuenta"
              className="flex items-center gap-2 text-sm font-semibold hover:bg-[#0B2b6b]/25 rounded-md py-3 px-5 transition-colors border border-white/10"
            >
              <UserCircle size={18} />
              Cuenta
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold hover:bg-[#0B2b6b]/25 rounded-md py-3 px-5 transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

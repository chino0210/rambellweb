import Link from "next/link"; // ✅ Corregido: Importación de navegación, no de icono
import LogoutButton from "./(usuarios)/cuenta/logout-button";

export default function Page() {
  return (
    <div className="bg-[#051129] overflow-hidden relative isolate">
      <div className="px-6 pt-14 lg:px-8">
        {/* Degradado Superior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#69F0DE] to-[#17C2AB] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Conoce sobre nuestros próximos eventos{" "}
              {/* Reemplazado <a> por <Link> */}
              <Link href="/eventos" className="font-semibold text-[#17C2AB]">
                <span aria-hidden="true" className="absolute inset-0" />
                CONOCE MÁS <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              RAMBELL WEB
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur, nam quisquam ratione numquam voluptatem.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* Botón Principal con Link */}
              <Link
                href="/escrito"
                className="rounded-md bg-[#17C2AB] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#119281] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                MIRAR ARTÍCULOS
              </Link>

              {/* Enlace secundario con Link */}
              <Link href="/nosotros" className="text-sm/6 font-semibold text-white hover:text-gray-200 transition-colors">
                SOBRE NOSOTROS <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Degradado Inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#69F0DE] to-[#17C2AB] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}
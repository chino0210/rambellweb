"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "group/switch",
        // ESTADO UNCHECKED: Aplicando tu color #33836b6c
        "bg-[#33836b6c] data-[state=unchecked]:opacity-80",
        // ESTADO CHECKED: Más vibrante y con resplandor
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:shadow-[0_0_12px_rgba(51,131,107,0.4)]",
        // INTERACCIÓN
        "hover:brightness-110 hover:scale-105 active:scale-95",
        "data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none block rounded-full ring-0 transition-all shadow-md",
          // El thumb ahora resalta más sobre el verde traslúcido
          "dark:bg-white",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
"use client"

import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/" || pathname === "/criar-usuario"

  return (
    <main
      className={twMerge(
        !isAuthPage && "p-6 lg:p-8 mt-16"
      )}
    >
      {children}
    </main>
  )
}

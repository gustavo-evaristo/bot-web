"use client"

import { UserProvider } from "@/hooks/useUser"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  )
}


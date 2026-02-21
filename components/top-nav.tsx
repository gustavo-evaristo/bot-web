"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Columns3,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  UserCircle,
} from "lucide-react"
import { Logo } from "@/components/kanbot-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kanban", href: "/kanban", icon: Columns3 },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Conversas", href: "/conversas", icon: MessageSquare },
  { label: "Follow-up", href: "/follow-up", icon: Bell },
  { label: "Qualificacao", href: "/qualificacao", icon: UserCircle },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b border-border bg-card px-6">
      <Link href="/dashboard" className="mr-8">
        <Logo size="sm" />
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="size-5" />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-primary-foreground">
            2
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              GF
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline text-sm font-medium text-foreground">
            Gustavo Frota
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}

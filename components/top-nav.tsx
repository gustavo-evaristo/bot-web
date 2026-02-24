"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Columns3,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  UserCircle,
} from "lucide-react"
import { Logo } from "@/components/botweb-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/useUser"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const router = useRouter()
  const isAuthPage = pathname === "/" || pathname === "/criar-usuario"
  if (isAuthPage) return null

  const { user, clearUser } = useUser()

  const userInitials = (() => {
    if (!user?.name) return ""
    const parts = user.name.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  })()

  function handleSignOut() {
    router.push("/")
    clearUser()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-border bg-card px-6">
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
        <button className="relative text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Bell className="size-5" />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-primary-foreground">
            2
          </span>
        </button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden capitalize lg:inline text-sm font-medium text-foreground">
                {user?.name}
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSignOut} variant="destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

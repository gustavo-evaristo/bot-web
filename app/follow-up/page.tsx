"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  Clock,
  Phone,
  MessageSquare,
  Mail,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Timer,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface FollowUp {
  id: string
  contactName: string
  type: "call" | "message" | "email"
  scheduledFor: string
  note: string
  priority: "alta" | "media" | "baixa"
  status: "pendente" | "concluido" | "atrasado"
}

const followUps: FollowUp[] = [
  { id: "1", contactName: "Ana Silva", type: "call", scheduledFor: "Hoje, 14:00", note: "Retornar sobre proposta enviada", priority: "alta", status: "pendente" },
  { id: "2", contactName: "Carlos Mendes", type: "message", scheduledFor: "Hoje, 16:30", note: "Enviar catalogo atualizado", priority: "media", status: "pendente" },
  { id: "3", contactName: "Bruna Costa", type: "email", scheduledFor: "Amanha, 09:00", note: "Follow-up pos-demo", priority: "alta", status: "pendente" },
  { id: "4", contactName: "Diego Oliveira", type: "call", scheduledFor: "Ontem, 11:00", note: "Confirmar pedido", priority: "alta", status: "atrasado" },
  { id: "5", contactName: "Fernanda Lima", type: "message", scheduledFor: "18/02, 15:00", note: "Verificar interesse", priority: "baixa", status: "concluido" },
  { id: "6", contactName: "Gabriel Santos", type: "email", scheduledFor: "17/02, 10:00", note: "Enviar orcamento revisado", priority: "media", status: "concluido" },
]

const typeIcons = { call: Phone, message: MessageSquare, email: Mail }
const typeLabels = { call: "Ligacao", message: "Mensagem", email: "E-mail" }

const priorityStyles = {
  alta: "bg-destructive/10 text-destructive border-destructive/20",
  media: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  baixa: "bg-chart-3/10 text-chart-3 border-chart-3/20",
}

const statusConfig = {
  pendente: { icon: Timer, label: "Pendente", className: "text-chart-2" },
  concluido: { icon: CheckCircle2, label: "Concluido", className: "text-primary" },
  atrasado: { icon: AlertCircle, label: "Atrasado", className: "text-destructive" },
}

export default function FollowUpPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "pendente" | "concluido" | "atrasado">("all")

  const filtered = followUps.filter((f) => {
    const matchSearch = f.contactName.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === "all" || f.status === activeTab
    return matchSearch && matchTab
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Follow-up</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {followUps.filter((f) => f.status === "pendente").length} tarefas pendentes
          </p>
        </div>
        <Button className="gap-2 rounded-xl" size="sm">
          <Plus className="size-4" />
          Novo Follow-up
        </Button>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "pendente", label: "Pendentes" },
              { key: "atrasado", label: "Atrasados" },
              { key: "concluido", label: "Concluidos" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 rounded-xl pl-10 bg-card border-border text-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Filter className="size-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const TypeIcon = typeIcons[item.type]
          const statusCfg = statusConfig[item.status]
          const StatusIcon = statusCfg.icon
          return (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {item.contactName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.contactName}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <TypeIcon className="size-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{typeLabels[item.type]}</span>
                    </div>
                  </div>
                </div>
                <button className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.scheduledFor}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("rounded-lg text-[10px] font-medium", priorityStyles[item.priority])}
                  >
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </Badge>
                </div>
                <div className={cn("flex items-center gap-1", statusCfg.className)}>
                  <StatusIcon className="size-3.5" />
                  <span className="text-xs font-medium">{statusCfg.label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

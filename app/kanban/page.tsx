"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Layers,
  Settings,
  Copy,
  Trash2,
  ExternalLink,
  Users,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface KanbanBoard {
  id: string
  name: string
  leads: number
  automationOnly: boolean
  allowQuestions: boolean
  status: "active" | "pending" | "paused"
}

const initialBoards: KanbanBoard[] = [
  {
    id: "1",
    name: "Campanha Black Friday",
    leads: 45,
    automationOnly: true,
    allowQuestions: true,
    status: "active",
  },
  {
    id: "2",
    name: "Lancamento Produto X",
    leads: 12,
    automationOnly: true,
    allowQuestions: false,
    status: "pending",
  },
  {
    id: "3",
    name: "Reativacao Clientes",
    leads: 89,
    automationOnly: false,
    allowQuestions: true,
    status: "active",
  },
  {
    id: "4",
    name: "Prospeccao B2B",
    leads: 0,
    automationOnly: true,
    allowQuestions: true,
    status: "paused",
  },
]

const statusConfig = {
  active: { label: "Ativo", icon: CheckCircle2, className: "bg-primary/10 text-primary border-primary/20" },
  pending: { label: "Pendente", icon: AlertCircle, className: "bg-chart-5/10 text-chart-5 border-chart-5/20" },
  paused: { label: "Pausado", icon: AlertCircle, className: "bg-muted text-muted-foreground border-border" },
}

export default function KanbanPage() {
  const [search, setSearch] = useState("")
  const [boards] = useState<KanbanBoard[]>(initialBoards)

  const filteredBoards = boards.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl pl-10 bg-card border-border"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl">
            <Layers className="size-4" />
            Modelos Prontos
          </Button>
          <Button className="gap-2 rounded-xl">
            <Plus className="size-4" />
            Novo Kanban
          </Button>
        </div>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Create new card */}
        <button className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-card/50 transition-colors hover:border-primary/40 hover:bg-primary/5">
          <div className="flex size-14 items-center justify-center rounded-xl bg-secondary">
            <Plus className="size-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Criar novo</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ou use um modelo pronto
            </p>
          </div>
        </button>

        {/* Board cards */}
        {filteredBoards.map((board) => {
          const config = statusConfig[board.status]
          const StatusIcon = config.icon
          return (
            <div
              key={board.id}
              className="group flex flex-col rounded-2xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/20"
            >
              {/* Thumbnail area */}
              <div className="relative flex h-32 items-center justify-center rounded-t-2xl bg-secondary">
                <ImageIcon className="size-10 text-muted-foreground/40" />
                <Badge
                  variant="outline"
                  className={cn(
                    "absolute top-3 left-3 gap-1 rounded-lg text-[11px] font-medium",
                    config.className
                  )}
                >
                  <StatusIcon className="size-3" />
                  {config.label}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">{board.name}</h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  {board.leads} leads
                </div>

                <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
                  <span>
                    {"Automacao: "}
                    <span className="font-medium text-foreground">
                      {board.automationOnly ? "Sim" : "Nao"}
                    </span>
                  </span>
                  <span>
                    {"Perguntas: "}
                    <span className="font-medium text-foreground">
                      {board.allowQuestions ? "Sim" : "Nao"}
                    </span>
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                    <ExternalLink className="size-3" />
                    Acessar
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                    <Settings className="size-3" />
                    Configurar
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                    <Copy className="size-3" />
                    Duplicar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                    Remover
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreHorizontal,
  ArrowUpRight,
  Users,
  Target,
  Zap,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface QualifiedLead {
  id: string
  name: string
  email: string
  score: number
  engagement: "alto" | "medio" | "baixo"
  lastInteraction: string
  tags: string[]
}

const qualifiedLeads: QualifiedLead[] = [
  { id: "1", name: "Ana Silva", email: "ana@email.com", score: 92, engagement: "alto", lastInteraction: "Hoje", tags: ["Hot Lead", "Decisor"] },
  { id: "2", name: "Carlos Mendes", email: "carlos@email.com", score: 78, engagement: "alto", lastInteraction: "Ontem", tags: ["Interessado"] },
  { id: "3", name: "Bruna Costa", email: "bruna@email.com", score: 65, engagement: "medio", lastInteraction: "2 dias", tags: ["Retorno"] },
  { id: "4", name: "Diego Oliveira", email: "diego@email.com", score: 54, engagement: "medio", lastInteraction: "3 dias", tags: ["Pesquisando"] },
  { id: "5", name: "Fernanda Lima", email: "fer@email.com", score: 43, engagement: "baixo", lastInteraction: "5 dias", tags: ["Frio"] },
  { id: "6", name: "Gabriel Santos", email: "gabriel@email.com", score: 88, engagement: "alto", lastInteraction: "Hoje", tags: ["Hot Lead", "Urgente"] },
  { id: "7", name: "Helena Rocha", email: "helena@email.com", score: 71, engagement: "medio", lastInteraction: "Ontem", tags: ["Interessado"] },
  { id: "8", name: "Igor Pereira", email: "igor@email.com", score: 35, engagement: "baixo", lastInteraction: "1 semana", tags: ["Frio"] },
]

const engagementConfig = {
  alto: { icon: TrendingUp, label: "Alto", className: "text-primary" },
  medio: { icon: Minus, label: "Medio", className: "text-chart-2" },
  baixo: { icon: TrendingDown, label: "Baixo", className: "text-destructive" },
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            score >= 70 ? "bg-primary" : score >= 50 ? "bg-chart-2" : "bg-destructive"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground w-7 text-right">{score}</span>
    </div>
  )
}

export default function QualificacaoPage() {
  const [search, setSearch] = useState("")

  const filtered = qualifiedLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  )

  const hotLeads = qualifiedLeads.filter((l) => l.score >= 70).length
  const warmLeads = qualifiedLeads.filter((l) => l.score >= 50 && l.score < 70).length
  const coldLeads = qualifiedLeads.filter((l) => l.score < 50).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Qualificacao</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Score e engajamento dos leads
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl" size="sm">
            <Filter className="size-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{hotLeads}</p>
              <p className="text-xs text-muted-foreground">Leads quentes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-chart-2/10">
              <Target className="size-5 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{warmLeads}</p>
              <p className="text-xs text-muted-foreground">Leads mornos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
              <Users className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{coldLeads}</p>
              <p className="text-xs text-muted-foreground">Leads frios</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar lead..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-xl pl-10 bg-card border-border"
        />
      </div>

      {/* Lead cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((lead) => {
          const engCfg = engagementConfig[lead.engagement]
          const EngIcon = engCfg.icon
          return (
            <div
              key={lead.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                </div>
                <button className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              {/* Score */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Score</span>
                  <div className={cn("flex items-center gap-1", engCfg.className)}>
                    <EngIcon className="size-3" />
                    <span className="text-[11px] font-medium">{engCfg.label}</span>
                  </div>
                </div>
                <ScoreBar score={lead.score} />
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {lead.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-lg text-[10px] font-medium bg-secondary/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {"Ultima interacao: "}
                  <span className="font-medium text-foreground">{lead.lastInteraction}</span>
                </span>
                <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg text-xs text-primary hover:text-primary">
                  <ArrowUpRight className="size-3" />
                  Ver detalhes
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

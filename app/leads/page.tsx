"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: "novo" | "qualificado" | "negociando" | "convertido" | "perdido"
  date: string
}

const leads: Lead[] = [
  { id: "1", name: "Ana Silva", email: "ana@email.com", phone: "+55 11 99999-0001", source: "WhatsApp", status: "novo", date: "20/02/2026" },
  { id: "2", name: "Carlos Mendes", email: "carlos@email.com", phone: "+55 21 99999-0002", source: "Instagram", status: "qualificado", date: "19/02/2026" },
  { id: "3", name: "Bruna Costa", email: "bruna@email.com", phone: "+55 31 99999-0003", source: "Site", status: "negociando", date: "19/02/2026" },
  { id: "4", name: "Diego Oliveira", email: "diego@email.com", phone: "+55 41 99999-0004", source: "WhatsApp", status: "convertido", date: "18/02/2026" },
  { id: "5", name: "Fernanda Lima", email: "fer@email.com", phone: "+55 51 99999-0005", source: "Indicacao", status: "perdido", date: "18/02/2026" },
  { id: "6", name: "Gabriel Santos", email: "gabriel@email.com", phone: "+55 61 99999-0006", source: "WhatsApp", status: "novo", date: "17/02/2026" },
  { id: "7", name: "Helena Rocha", email: "helena@email.com", phone: "+55 71 99999-0007", source: "Instagram", status: "qualificado", date: "17/02/2026" },
  { id: "8", name: "Igor Pereira", email: "igor@email.com", phone: "+55 81 99999-0008", source: "Site", status: "novo", date: "16/02/2026" },
]

const statusStyles: Record<Lead["status"], string> = {
  novo: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  qualificado: "bg-primary/10 text-primary border-primary/20",
  negociando: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  convertido: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  perdido: "bg-destructive/10 text-destructive border-destructive/20",
}

const statusLabels: Record<Lead["status"], string> = {
  novo: "Novo",
  qualificado: "Qualificado",
  negociando: "Negociando",
  convertido: "Convertido",
  perdido: "Perdido",
}

export default function LeadsPage() {
  const [search, setSearch] = useState("")

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {leads.length} leads no total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl" size="sm">
            <Download className="size-4" />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl" size="sm">
            <Filter className="size-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-xl pl-10 bg-card border-border"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lead
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Telefone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Origem
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Data
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  className={cn(
                    "transition-colors hover:bg-accent/50",
                    i < filtered.length - 1 && "border-b border-border"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {lead.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.phone}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn("rounded-lg text-[11px] font-medium", statusStyles[lead.status])}
                    >
                      {statusLabels[lead.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{lead.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Phone className="size-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Mail className="size-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <MessageSquare className="size-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Mostrando 1-{filtered.length} de {leads.length}
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="icon-sm" className="rounded-lg">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon-sm" className="rounded-lg">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

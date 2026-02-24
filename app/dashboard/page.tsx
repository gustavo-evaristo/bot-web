"use client"

import { MessageSquare, Megaphone, Filter, Coins, History, Copy } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadsChart } from "@/components/leads-chart"
import { TokensChart } from "@/components/tokens-chart"
import { TokensUsageChart } from "@/components/tokens-usage-chart"
// import { useGetAllUsers } from "@/hooks/useGetAllUsers"

export default function DashboardPage() {

  // const {data} = useGetAllUsers()

  return (
    <div className="flex flex-col gap-6">
      {/* Period filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando para o Periodo{" "}
          <span className="font-semibold text-foreground">13/02/2026</span>
          {" ate "}
          <span className="font-semibold text-foreground">20/02/2026</span>
        </p>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Filter className="size-4" />
          Filtrar
        </Button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Stats + Chart */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              title="Total Interacoes"
              value={247}
              icon={MessageSquare}
              trend={{ value: "12% esta semana", positive: true }}
            />
            <StatCard
              title="Total de Leads"
              value={89}
              icon={Megaphone}
              trend={{ value: "8% esta semana", positive: true }}
            />
          </div>

          {/* Leads chart */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Novos Leads por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsChart />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Tokens */}
        <div className="flex flex-col gap-6">
          {/* API Key */}
          <Card className="rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between rounded-xl bg-secondary p-3">
                <span className="text-xs font-mono text-muted-foreground truncate mr-2">
                  sk-kanbot-xxxx...xxxx
                </span>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Copy className="size-4" />
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gap-2 rounded-xl text-xs" size="sm">
                  <Coins className="size-4" />
                  Comprar Tokens
                </Button>
                <Button variant="outline" className="flex-1 gap-2 rounded-xl text-xs" size="sm">
                  <History className="size-4" />
                  Historico
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tokens donut */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <TokensChart used={3200} available={6800} />
              <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Utilizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Disponiveis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tokens usage per day */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Tokens Utilizados por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <TokensUsageChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

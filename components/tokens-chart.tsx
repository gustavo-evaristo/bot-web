"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

interface TokensChartProps {
  used: number
  available: number
}

export function TokensChart({ used, available }: TokensChartProps) {
  const data = [
    { name: "Utilizados", value: used },
    { name: "Disponiveis", value: available },
  ]

  const total = used + available
  const percentUsed = Math.round((used / total) * 100)

  return (
    <div className="relative h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          >
            <Cell fill="oklch(0.91 0.008 240)" />
            <Cell fill="oklch(0.72 0.14 175)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{percentUsed}%</span>
        <span className="text-xs text-muted-foreground">utilizado</span>
      </div>
    </div>
  )
}

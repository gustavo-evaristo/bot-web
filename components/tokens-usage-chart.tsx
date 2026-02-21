"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { date: "13/02", tokens: 120 },
  { date: "14/02", tokens: 340 },
  { date: "15/02", tokens: 210 },
  { date: "16/02", tokens: 480 },
  { date: "17/02", tokens: 390 },
  { date: "18/02", tokens: 550 },
  { date: "19/02", tokens: 280 },
  { date: "20/02", tokens: 420 },
]

export function TokensUsageChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.008 240)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "oklch(0.52 0.02 240)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "oklch(0.52 0.02 240)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.91 0.008 240)",
              borderRadius: "12px",
              fontSize: "13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar
            dataKey="tokens"
            fill="oklch(0.72 0.14 175)"
            radius={[6, 6, 0, 0]}
            name="Tokens"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

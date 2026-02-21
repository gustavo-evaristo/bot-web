"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { date: "13/02", leads: 3 },
  { date: "14/02", leads: 7 },
  { date: "15/02", leads: 5 },
  { date: "16/02", leads: 12 },
  { date: "17/02", leads: 9 },
  { date: "18/02", leads: 15 },
  { date: "19/02", leads: 11 },
  { date: "20/02", leads: 18 },
]

export function LeadsChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.14 175)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="oklch(0.72 0.14 175)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.008 240)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "oklch(0.52 0.02 240)" }}
            axisLine={{ stroke: "oklch(0.91 0.008 240)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "oklch(0.52 0.02 240)" }}
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
          <Area
            type="monotone"
            dataKey="leads"
            stroke="oklch(0.72 0.14 175)"
            strokeWidth={2.5}
            fill="url(#leadsGradient)"
            name="Leads"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

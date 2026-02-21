import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-2xl font-bold text-card-foreground">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-primary" : "text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="size-6 text-primary" />
      </div>
    </div>
  )
}

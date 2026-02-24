export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { icon: 28, text: "text-base" },
    default: { icon: 34, text: "text-lg" },
    lg: { icon: 48, text: "text-2xl" },
  }

  const d = dimensions[size]

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold"
        style={{ width: d.icon, height: d.icon, fontSize: d.icon * 0.4 }}
      >
        {'B'}
      </div>
      <span className={`${d.text} font-semibold tracking-tight text-foreground`}>
        {'bot'}
        <span className="text-primary">{'web'}</span>
      </span>
    </div>
  )
}

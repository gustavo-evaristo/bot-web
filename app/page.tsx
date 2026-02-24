"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/botweb-logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center bg-card px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12">
            <Logo size="lg" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-secondary border-transparent px-4 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Esqueceu a Senha?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl bg-secondary border-transparent px-4 pr-12 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 rounded-xl text-sm font-semibold uppercase tracking-wider"
            >
              Acessar
            </Button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link href="/criar-usuario" className="font-medium text-primary hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 size-72 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute bottom-20 right-20 size-96 rounded-full bg-primary/10 blur-[150px]" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-primary text-primary-foreground text-3xl font-bold">
              B
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Automatize seus processos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            Gerencie leads, conversas e fluxos de trabalho em uma plataforma intuitiva e poderosa.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: "10k+", label: "Leads gerenciados" },
              { value: "98%", label: "Taxa de entrega" },
              { value: "24/7", label: "Disponibilidade" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

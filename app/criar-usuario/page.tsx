"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Logo } from "@/components/botweb-logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query";
import { registerProfile } from "@/api/auth"
import { twMerge } from "tailwind-merge"

const inputClassName =
  "h-12 rounded-xl bg-secondary border-transparent px-4 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"

export default function CriarUsuarioPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const {
    mutate,
    isPending,
  } = useMutation({
    mutationFn: registerProfile,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const name = (watch("name") || "").trim();
  const isNameValid = /^[A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{1,})+$/.test(
    name
  );

  const emailValue = watch("email");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue || "");

  const [email, password, confirmPassword] = watch(['email', 'password', 'confirmPassword'])

  const handleRegister = (data: z.infer<typeof RegisterSchema>) => {
    const { confirmPassword: _confirmPassword, ...rest } = data

    const cleanedData = {
      ...data,
      name: rest.name.trim().replace(/\s+/g, " "),
      phone: rest.phone.trim().replace(/\s+/g, ""),
    }

    mutate(cleanedData)
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center bg-card px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12">
            <Logo size="lg" />
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                {...register("name")}
                error={errors.name?.message}
                isValid={isNameValid}
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefone
              </label>
              <Input
                className={inputClassName}
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                {...register("phone")}
                error={errors.phone?.message}
                isValid={/^\d+$/.test(watch("phone") || "")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <Input
                className={inputClassName}
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
                error={errors.email?.message}
                isValid={isEmailValid}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...register("password")}
                  className={twMerge(
                    `${inputClassName} pr-12`,
                    errors.password && "border-red-500",
                  )}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                </button>
              </div>

              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirmar senha
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  {...register("confirmPassword")}
                  className={twMerge(
                    `${inputClassName} pr-12`,
                    errors.confirmPassword && "border-red-500",
                  )}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending || !name || !email || !password || !confirmPassword}
              isLoading={isPending}
              className="h-12 rounded-xl text-sm font-semibold uppercase tracking-wider"
            >
              Criar conta
            </Button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/" className="font-medium text-primary hover:underline">
                Entrar
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
            Comece em poucos passos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            Crie sua conta e comece a gerenciar leads, conversas e fluxos de trabalho em uma única plataforma.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: "1", label: "Cadastro rápido" },
              { value: "100%", label: "Gratuito para começar" },
              { value: "24/7", label: "Suporte" },
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

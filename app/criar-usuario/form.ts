import { z } from "zod";

const required = "Este campo é obrigatório"

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .nonempty(required)
      .trim()
      .min(3, "Digite pelo menos 3 caracteres")
      .regex(
        /^[A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{1,})+$/,
        "Digite nome e sobrenome válidos"
      ),
    phone: z
      .string()
      .nonempty(required)
      .regex(/^\d+$/, "O telefone deve conter apenas números")
      .min(11, "Digite um telefone válido!"),
    email: z.string().email(required),
    password: z
      .string()
      .nonempty(required)
      .min(8, "A senha deve ter no mínimo 8 dígitos")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A senha deve conter pelo menos um caractere especial"
      ),
    confirmPassword: z
      .string()
      .nonempty(required)
      .min(8, "A senha deve ter no mínimo 8 dígitos"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    },
  );


"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "./session";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validações
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  // Verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email ou senha incorretos");
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email ou senha incorretos");
  }

  // Criar sessão
  await createSession(user.id);

  // Redirecionar para /learn após login bem-sucedido
  redirect("/learn");
}

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validações
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Todos os campos são obrigatórios");
  }

  if (password !== confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  if (password.length < 7) {
    throw new Error("A senha deve ter pelo menos 7 caracteres");
  }

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Usuário já existe com este email");
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 12);

  // Criar novo usuário
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Usuário criado com sucesso",
    userId: user.id,
  };
}


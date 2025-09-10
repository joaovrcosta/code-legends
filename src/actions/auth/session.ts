"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSession(userId: string) {
  const cookieStore = await cookies();

  // Criar um token simples (em produção, use JWT)
  const sessionToken = `session_${userId}_${Date.now()}`;

  // Salvar no cookie
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return sessionToken;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return null;
  }

  // Extrair userId do token
  const userId = sessionToken.split("_")[1];

  if (!userId) {
    return null;
  }

  // Buscar usuário no banco
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  return user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}

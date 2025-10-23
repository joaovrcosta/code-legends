"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function createSession(token: string) {
  const cookieStore = await cookies();

  // Salvar o token JWT no cookie
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return token;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    // Buscar dados do usuário usando o token da rota /me
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Sempre buscar dados atualizados
    });

    if (!response.ok) {
      console.error("Erro ao buscar usuário da API:", response.status);
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

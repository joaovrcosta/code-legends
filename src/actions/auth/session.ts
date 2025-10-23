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
    // Buscar dados do usuário usando o token
    // Quando a rota /me estiver disponível, descomente e ajuste:
    /*
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
    */

    // Temporariamente, decodificar o JWT para extrair informações do usuário
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      avatar: payload.avatar || null,
      createdAt: payload.createdAt || new Date(),
    };
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

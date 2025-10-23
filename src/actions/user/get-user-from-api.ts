"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Busca os dados completos do usuário autenticado diretamente da API através da rota /me
 * Esta função será útil quando a rota /users/me estiver implementada na API
 *
 * Use esta função quando precisar de dados atualizados do servidor,
 * ao invés de usar apenas os dados decodificados do JWT.
 */
export async function getUserFromAPI() {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Sempre buscar dados atualizados
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token inválido ou expirado
        console.error("Token inválido ou expirado");
      }
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário da API:", error);
    return null;
  }
}

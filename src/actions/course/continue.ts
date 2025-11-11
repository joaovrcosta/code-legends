"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Marca a lição atual como concluída e avança para a próxima
 */
export async function continueCourse(
  lessonId: number
): Promise<{ success: boolean }> {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `${API_BASE_URL}/lessons/${lessonId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Lição não encontrada");
        throw new Error("Lição não encontrada");
      }

      if (response.status === 401) {
        console.error("Não autorizado");
        throw new Error("Não autorizado");
      }

      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na resposta da API:", errorData);
      throw new Error(
        errorData.message || "Erro ao marcar lição como completa"
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao continuar curso:", error);
    throw error instanceof Error ? error : new Error("Erro ao continuar curso");
  }
}

"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export interface MyLearningCourse {
  id: string;
  title: string;
  icon: string;
  progress: number;
}

export interface MyLearningResponse {
  inProgress: MyLearningCourse[];
  completed: MyLearningCourse[];
}

/**
 * Busca os cursos do usuário (em progresso e completos)
 */
export async function getMyLearning(): Promise<MyLearningResponse> {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return { inProgress: [], completed: [] };
    }

    const response = await fetch(`${API_BASE_URL}/my-learning`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { inProgress: [], completed: [] };
      }

      console.error("Erro na resposta da API:", response.statusText);
      return { inProgress: [], completed: [] };
    }

    const data: MyLearningResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar meu aprendizado:", error);
    throw error instanceof Error
      ? error
      : new Error("Erro ao buscar meu aprendizado");
  }
}

"use server";

import { getAuthToken } from "../auth/session";
import type { ModulesWithProgressResponse } from "@/types/roadmap";

/**
 * Busca os módulos de um curso com informações de progresso
 */
export async function listModulesProgress(
  courseId: string
): Promise<ModulesWithProgressResponse | null> {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/modules/with-progress`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Módulos não encontrados");
        return null;
      }

      if (response.status === 401) {
        console.error("Não autorizado");
        return null;
      }

      console.error("Erro na resposta da API:", response.statusText);
      return null;
    }

    const data: ModulesWithProgressResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar módulos com progresso:", error);
    return null;
  }
}

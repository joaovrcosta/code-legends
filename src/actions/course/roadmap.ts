"use server";

import { getAuthToken } from "../auth/session";
import type { RoadmapResponse } from "@/types/roadmap";

/**
 * Busca o roadmap de um curso
 */
export async function getCourseRoadmap(
  courseId: string
): Promise<RoadmapResponse | null> {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/roadmap`,
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
        console.error("Roadmap não encontrado");
        return null;
      }

      console.error("Erro na resposta da API:", response.statusText);
      return null;
    }

    const data: RoadmapResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar roadmap:", error);
    return null;
  }
}

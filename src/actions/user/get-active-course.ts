"use server";

import { getAuthToken } from "../auth/session";
import type {
  ActiveCourseResponse,
  ActiveCourse,
} from "@/types/user-course.ts";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Busca o curso ativo do usuário logado
 */
export async function getActiveCourse(): Promise<ActiveCourse | null> {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/account/active-course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Curso ativo não encontrado");
        return null;
      }

      if (response.status === 401) {
        console.error("Não autorizado");
        return null;
      }

      console.error("Erro na resposta da API:", response.statusText);
      return null;
    }

    const data: ActiveCourseResponse = await response.json();
    return data.course;
  } catch (error) {
    console.error("Erro ao buscar curso ativo:", error);
    return null;
  }
}

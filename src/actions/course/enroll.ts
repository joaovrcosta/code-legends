"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Inscreve o usuário em um curso
 */
export async function enrollInCourse(courseId: string) {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao inscrever no curso");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao inscrever no curso:", error);
    throw error instanceof Error
      ? error
      : new Error("Erro ao inscrever no curso");
  }
}

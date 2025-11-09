"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function completeOnboarding(): Promise<{ success: boolean }> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(`${API_BASE_URL}/users/onboarding/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 404) {
        throw new Error("Usuário não encontrado");
      }

      throw new Error(errorData.message || "Erro ao completar onboarding");
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao completar onboarding:", error);
    throw error instanceof Error
      ? error
      : new Error("Erro ao completar onboarding");
  }
}

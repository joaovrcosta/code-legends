"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function getUserCourses() {
  try {
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Erro na resposta da API:", response.statusText);
      return [];
    }

    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Erro ao buscar cursos do usuário:", error);
    return [];
  }
}

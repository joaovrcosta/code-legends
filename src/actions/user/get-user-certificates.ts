"use server";

import { getAuthToken } from "../auth/session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function getUserCertificates() {
  try {
    // Obter o token de autenticação do NextAuth
    const token = await getAuthToken();

    if (!token) {
      console.error("Token de autenticação não encontrado");
      return [];
    }

    // Buscar certificados do usuário via API
    const response = await fetch(`${API_BASE_URL}/certificates`, {
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

    const certificates = await response.json();
    return certificates;
  } catch (error) {
    console.error("Erro ao buscar certificados do usuário:", error);
    return [];
  }
}

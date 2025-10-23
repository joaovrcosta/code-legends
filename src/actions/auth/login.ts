"use server";

import { redirect } from "next/navigation";
import { createSession } from "./session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validações
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  try {
    console.log(API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Email ou senha incorretos");
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("Token não recebido da API");
    }

    // Criar sessão com o token JWT
    await createSession(data.token);

    // Redirecionar para /learn após login bem-sucedido
    redirect("/learn");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao fazer login");
  }
}

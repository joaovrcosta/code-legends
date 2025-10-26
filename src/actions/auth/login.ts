"use server";

import { signIn } from "@/auth/authSetup";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validações
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  try {
    // Usar NextAuth para fazer login
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/learn",
    });
  } catch (error: any) {
    // Se for um erro de credenciais
    if (error?.type === "CredentialsSignin") {
      throw new Error("Email ou senha incorretos");
    }
    // Se for um redirect (sucesso), deixar passar
    throw error;
  }
}

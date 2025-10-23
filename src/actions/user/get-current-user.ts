"use server";

import { getCurrentSession } from "../auth/session";

export async function getCurrentUser() {
  try {
    const user = await getCurrentSession();
    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

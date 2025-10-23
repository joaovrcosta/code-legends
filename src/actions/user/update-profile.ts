"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function updateUserProfile(data: {
  name?: string;
  avatar?: string;
}) {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      throw new Error("Usuário não autenticado");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.avatar && { avatar: data.avatar }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw new Error("Erro ao atualizar perfil");
  }
}

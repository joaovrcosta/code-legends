"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function getUserProgress() {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      return null;
    }

    const userProgress = await prisma.userProgress.findMany({
      where: { userId: user.id },
      include: {
        task: {
          include: {
            submodule: {
              include: {
                module: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return userProgress;
  } catch (error) {
    console.error("Erro ao buscar progresso do usuário:", error);
    return null;
  }
}

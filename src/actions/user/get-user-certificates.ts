"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function getUserCertificates() {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      return [];
    }

    // Buscar cursos concluídos pelo usuário
    const completedCourses = await prisma.userCourse.findMany({
      where: {
        userId: user.id,
        isCompleted: true,
      },
      include: {
        course: true,
      },
      orderBy: { completedAt: "desc" },
    });

    return completedCourses;
  } catch (error) {
    console.error("Erro ao buscar certificados do usuário:", error);
    return [];
  }
}

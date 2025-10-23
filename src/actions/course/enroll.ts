"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function enrollInCourse(courseId: string) {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      throw new Error("Usuário não autenticado");
    }

    // Verificar se o usuário já está inscrito no curso
    const existingEnrollment = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: parseInt(courseId),
        },
      },
    });

    if (existingEnrollment) {
      throw new Error("Usuário já está inscrito neste curso");
    }

    // Buscar o primeiro módulo do curso para definir como módulo atual
    const firstModule = await prisma.module.findFirst({
      where: { courseId: parseInt(courseId) },
      orderBy: { id: "asc" },
    });

    // Criar inscrição no curso
    const enrollment = await prisma.userCourse.create({
      data: {
        userId: user.id,
        courseId: parseInt(courseId),
        currentModuleId: firstModule?.id || null,
        progress: 0,
        isCompleted: false,
      },
      include: {
        course: true,
        currentModule: true,
      },
    });

    return enrollment;
  } catch (error) {
    console.error("Erro ao inscrever no curso:", error);
    throw new Error("Erro ao inscrever no curso");
  }
}

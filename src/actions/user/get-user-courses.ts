"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function getUserCourses() {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      return [];
    }

    const userCourses = await prisma.userCourse.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            modules: {
              include: {
                submodules: {
                  include: {
                    tasks: true,
                  },
                },
              },
            },
          },
        },
        currentModule: true,
        currentTask: true,
      },
      orderBy: { lastAccessedAt: "desc" },
    });

    return userCourses;
  } catch (error) {
    console.error("Erro ao buscar cursos do usuário:", error);
    return [];
  }
}

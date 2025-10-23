"use server";

import { prisma } from "@/lib/prisma";

export async function getCourse(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      include: {
        modules: {
          include: {
            submodules: {
              include: {
                tasks: true,
              },
            },
          },
          orderBy: { id: "asc" },
        },
      },
    });

    return course;
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return null;
  }
}

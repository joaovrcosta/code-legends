"use server";

import { prisma } from "@/lib/prisma";

export async function createCourse(
  title: string,
  description: string,
  slug: string
) {
  if (!title || !description || !slug) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  await prisma.course.create({
    data: {
      title,
      description,
      slug,
    },
  });
}

export async function createModule(courseSlug: string, name: string) {
  if (!courseSlug || !name) {
    throw new Error("O slug do curso e o nome do módulo são obrigatórios.");
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) {
    throw new Error("Curso não encontrado.");
  }

  await prisma.module.create({
    data: {
      name,
      courseId: course.id,
    },
  });
}

export async function createSubmodule(moduleId: number, name: string) {
  if (!name) {
    throw new Error("O nome do submódulo é obrigatório.");
  }

  await prisma.submodule.create({
    data: {
      name,
      moduleId,
    },
  });
}

export async function createTask(
  submoduleId: number,
  title: string,
  description: string,
  type: string,
  video_url: string
) {
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        type,
        submoduleId,
        video_url,
        slug: title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[:\s]+/g, "-"),
      },
    });
    return task;
  } catch (error) {
    throw new Error("Erro ao criar a tarefa: " + (error as Error).message);
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function markTaskAsCompleted(taskId: string) {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      throw new Error("Usuário não autenticado");
    }

    // Buscar a tarefa e suas relações
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
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
    });

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    // Buscar o userCourse relacionado
    const userCourse = await prisma.userCourse.findFirst({
      where: {
        userId: user.id,
        courseId: task.submodule.module.courseId,
      },
    });

    if (!userCourse) {
      throw new Error("Usuário não está inscrito neste curso");
    }

    // Marcar tarefa como concluída
    await prisma.userProgress.upsert({
      where: {
        userId_taskId: {
          userId: user.id,
          taskId: parseInt(taskId),
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        taskId: parseInt(taskId),
        userCourseId: userCourse.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    // Atualizar progresso do módulo
    await updateModuleProgress(user.id, task.submodule.moduleId);

    // Atualizar progresso do curso
    await updateCourseProgress(user.id, task.submodule.module.courseId);

    return { success: true };
  } catch (error) {
    console.error("Erro ao marcar tarefa como concluída:", error);
    throw new Error("Erro ao marcar tarefa como concluída");
  }
}

async function updateModuleProgress(userId: string, moduleId: number) {
  const moduleData = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      submodules: {
        include: {
          tasks: true,
        },
      },
    },
  });

  if (!moduleData) return;

  // Buscar o userCourse relacionado
  const userCourse = await prisma.userCourse.findFirst({
    where: {
      userId,
      courseId: moduleData.courseId,
    },
  });

  if (!userCourse) return;

  const totalTasks = moduleData.submodules.reduce(
    (acc, submodule) => acc + submodule.tasks.length,
    0
  );

  const completedTasks = await prisma.userProgress.count({
    where: {
      userId,
      isCompleted: true,
      task: {
        submodule: {
          moduleId: moduleId,
        },
      },
    },
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isCompleted = completedTasks === totalTasks;

  await prisma.userModuleProgress.upsert({
    where: {
      userId_moduleId: {
        userId,
        moduleId: moduleId,
      },
    },
    update: {
      progress,
      isCompleted,
      tasksCompleted: completedTasks,
      totalTasks,
    },
    create: {
      userId,
      moduleId,
      userCourseId: userCourse.id,
      progress,
      isCompleted,
      tasksCompleted: completedTasks,
      totalTasks,
    },
  });
}

async function updateCourseProgress(userId: string, courseId: number) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
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
  });

  if (!course) return;

  const totalTasks = course.modules.reduce(
    (acc, module) =>
      acc +
      module.submodules.reduce(
        (subAcc, submodule) => subAcc + submodule.tasks.length,
        0
      ),
    0
  );

  const completedTasks = await prisma.userProgress.count({
    where: {
      userId,
      isCompleted: true,
      task: {
        submodule: {
          module: {
            courseId: courseId,
          },
        },
      },
    },
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isCompleted = completedTasks === totalTasks;

  await prisma.userCourse.updateMany({
    where: {
      userId,
      courseId: courseId,
    },
    data: {
      progress,
      isCompleted,
    },
  });
}

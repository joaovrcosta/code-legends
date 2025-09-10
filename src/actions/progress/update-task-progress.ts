"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";

export async function updateTaskProgress(
  taskId: string,
  data: {
    timeSpent?: number;
    lastPosition?: number;
    attempts?: number;
    score?: number;
    notes?: string;
  }
) {
  try {
    const user = await getCurrentSession();

    if (!user?.id) {
      throw new Error("Usuário não autenticado");
    }

    // Buscar a tarefa para obter o courseId
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
      include: {
        submodule: {
          include: {
            module: true,
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

    const updatedProgress = await prisma.userProgress.upsert({
      where: {
        userId_taskId: {
          userId: user.id,
          taskId: parseInt(taskId),
        },
      },
      update: {
        ...(data.timeSpent !== undefined && { timeSpent: data.timeSpent }),
        ...(data.lastPosition !== undefined && {
          lastPosition: data.lastPosition,
        }),
        ...(data.attempts !== undefined && { attempts: data.attempts }),
        ...(data.score !== undefined && { score: data.score }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      create: {
        userId: user.id,
        taskId: parseInt(taskId),
        userCourseId: userCourse.id,
        ...(data.timeSpent !== undefined && { timeSpent: data.timeSpent }),
        ...(data.lastPosition !== undefined && {
          lastPosition: data.lastPosition,
        }),
        ...(data.attempts !== undefined && { attempts: data.attempts }),
        ...(data.score !== undefined && { score: data.score }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });

    return updatedProgress;
  } catch (error) {
    console.error("Erro ao atualizar progresso da tarefa:", error);
    throw new Error("Erro ao atualizar progresso da tarefa");
  }
}

"use server";

import { getAuthToken } from "../auth/session";

/**
 * Cria um novo curso
 * TODO: Implementar quando a API estiver disponível
 */
export async function createCourse(
  title: string,
  description: string,
  slug: string
) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }

  // TODO: Implementar chamada à API
  console.log("createCourse - Não implementado:", { title, description, slug });
  throw new Error("Funcionalidade não implementada");
}

/**
 * Cria um novo módulo
 * TODO: Implementar quando a API estiver disponível
 */
export async function createModule(
  courseSlug: string,
  moduleName: string,
  nivel: string
) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }

  // TODO: Implementar chamada à API
  console.log("createModule - Não implementado:", {
    courseSlug,
    moduleName,
    nivel,
  });
  throw new Error("Funcionalidade não implementada");
}

/**
 * Cria um novo submódulo
 * TODO: Implementar quando a API estiver disponível
 */
export async function createSubmodule(moduleId: number, submoduleName: string) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }

  // TODO: Implementar chamada à API
  console.log("createSubmodule - Não implementado:", {
    moduleId,
    submoduleName,
  });
  throw new Error("Funcionalidade não implementada");
}

/**
 * Cria uma nova tarefa
 * TODO: Implementar quando a API estiver disponível
 */
export async function createTask(
  submoduleId: number,
  taskTitle: string,
  taskDescription: string,
  taskType: string,
  videoUrl: string,
  videoDuration: string,
  order: number
) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Não autenticado");
  }

  // TODO: Implementar chamada à API
  console.log("createTask - Não implementado:", {
    submoduleId,
    taskTitle,
    taskDescription,
    taskType,
    videoUrl,
    videoDuration,
    order,
  });
  throw new Error("Funcionalidade não implementada");
}


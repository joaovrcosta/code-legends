import type { CoursesListResponse } from "@/types/user-course.ts";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Lista cursos filtrados por slug da categoria
 */
export async function listCoursesByCategory(
  categorySlug: string
): Promise<CoursesListResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/courses?categorySlug=${categorySlug}`,
      {
        next: { revalidate: 60 }, // cache de 1min
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar cursos");
    }

    const data: CoursesListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao listar cursos por categoria:", error);
    return { courses: [] };
  }
}

import type { CoursesListResponse } from "@/types/user-course.ts";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Busca cursos por termo de pesquisa
 */
export async function searchCourses(
  query: string
): Promise<CoursesListResponse> {
  if (!query || query.trim().length === 0) {
    return { courses: [] };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/courses/search?q=${encodeURIComponent(query)}`,
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
    console.error("Erro ao buscar cursos:", error);
    return { courses: [] };
  }
}

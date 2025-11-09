import type { CourseDetail, CourseDetailResponse } from "@/types/course-types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

/**
 * Busca um curso pelo slug
 */
export async function getCourseBySlug(
  slug: string
): Promise<CourseDetail | null> {
  if (!slug) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/courses/${slug}`, {
      next: { revalidate: 60 }, // cache de 1min
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar curso");
    }

    const data: CourseDetailResponse = await response.json();
    return data.course;
  } catch (error) {
    console.error("Erro ao buscar curso por slug:", error);
    return null;
  }
}

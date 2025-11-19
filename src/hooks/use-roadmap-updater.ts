import { useEffect, useRef, useCallback } from "react";
import {
  getCourseRoadmap,
  getCourseRoadmapFresh,
  revalidateRoadmapCache,
} from "@/actions/course";
import type { RoadmapResponse } from "@/types/roadmap";

interface UseRoadmapUpdaterOptions {
  isOpen: boolean;
  courseId: string | undefined;
  currentLessonId: number | undefined;
  lessonCompletedTimestamp: number | null;
  onRoadmapUpdate: (roadmap: RoadmapResponse | null) => void;
}

export function useRoadmapUpdater({
  isOpen,
  courseId,
  currentLessonId,
  lessonCompletedTimestamp,
  onRoadmapUpdate,
}: UseRoadmapUpdaterOptions) {
  const lastLessonIdRef = useRef<number | null>(null);
  const lastCompletedTimestampRef = useRef<number | null>(null);
  const hasInitialFetchRef = useRef(false);

  // Memoiza a função de callback para evitar re-renderizações
  const stableOnRoadmapUpdate = useCallback(
    (roadmap: RoadmapResponse | null) => {
      onRoadmapUpdate(roadmap);
    },
    [onRoadmapUpdate]
  );

  useEffect(() => {
    if (!isOpen || !courseId) {
      // Reset refs quando o modal fecha
      if (!isOpen) {
        hasInitialFetchRef.current = false;
        lastLessonIdRef.current = null;
        lastCompletedTimestampRef.current = null;
      }
      return;
    }

    const fetchUpdatedRoadmap = async (
      useFresh: boolean = false,
      delay: number = 200
    ) => {
      try {
        // Revalida o cache
        await revalidateRoadmapCache(courseId);

        // Aguarda delay para garantir que o cache foi revalidado
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Busca roadmap (com ou sem cache dependendo do parâmetro)
        const roadmapData = useFresh
          ? await getCourseRoadmapFresh(courseId)
          : await getCourseRoadmap(courseId);

        if (roadmapData) {
          stableOnRoadmapUpdate(roadmapData);
        }
      } catch (error) {
        console.error("Erro ao buscar roadmap:", error);
      }
    };

    // 1. Busca inicial quando o modal abre
    if (!hasInitialFetchRef.current) {
      hasInitialFetchRef.current = true;
      fetchUpdatedRoadmap(false, 0);
      return;
    }

    // 2. Atualiza quando uma aula é completada (prioridade maior)
    if (
      lessonCompletedTimestamp &&
      lessonCompletedTimestamp !== lastCompletedTimestampRef.current
    ) {
      lastCompletedTimestampRef.current = lessonCompletedTimestamp;
      fetchUpdatedRoadmap(true, 500); // Delay maior para garantir que API foi atualizada
      return;
    }

    // 3. Atualiza quando muda de aula
    if (currentLessonId && currentLessonId !== lastLessonIdRef.current) {
      lastLessonIdRef.current = currentLessonId;
      fetchUpdatedRoadmap(true, 200);
    }
  }, [
    isOpen,
    courseId,
    currentLessonId,
    lessonCompletedTimestamp,
    stableOnRoadmapUpdate,
  ]);
}

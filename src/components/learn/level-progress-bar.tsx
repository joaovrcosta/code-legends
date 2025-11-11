"use client";

import Image from "next/image";
import { Progress } from "../ui/progress";
import { useEffect, useState, useMemo } from "react";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";
import { getCourseRoadmap } from "@/actions/course";
import type { RoadmapResponse } from "@/types/roadmap";
import level1complete from "../../../public/level-1.png";
import level2incomplete from "../../../public/level-2-incomplete.png";
import { CertificateIcon } from "@phosphor-icons/react/dist/ssr";

export function LevelProgressBar() {
  const { activeCourse } = useActiveCourseStore();
  const { lessonCompletedTimestamp } = useCourseModalStore();
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);

  useEffect(() => {
    async function fetchRoadmap() {
      if (!activeCourse?.id) return;

      try {
        // Se uma lição foi completada, aguarda um delay para garantir que a API foi atualizada
        if (lessonCompletedTimestamp) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const roadmapData = await getCourseRoadmap(activeCourse.id);
        setRoadmap(roadmapData);
      } catch (error) {
        console.error("Erro ao buscar roadmap:", error);
      }
    }

    fetchRoadmap();
  }, [activeCourse?.id, lessonCompletedTimestamp]);

  const { currentModule, nextModule, currentLevel, nextLevel } = useMemo(() => {
    if (!roadmap || !roadmap.modules || roadmap.modules.length === 0) {
      return {
        currentModule: null,
        nextModule: null,
        currentLevel: 1,
        nextLevel: null,
      };
    }

    // Encontra o primeiro módulo não completado
    const firstIncompleteModule = roadmap.modules.find(
      (module) => !module.isCompleted
    );

    // Se todos os módulos estão completos, usa o último
    const currentModule =
      firstIncompleteModule || roadmap.modules[roadmap.modules.length - 1];
    const currentModuleIndex = roadmap.modules.findIndex(
      (m) => m.id === currentModule.id
    );

    // Próximo módulo se existir
    const nextModule =
      currentModuleIndex < roadmap.modules.length - 1
        ? roadmap.modules[currentModuleIndex + 1]
        : null;

    return {
      currentModule,
      nextModule,
      currentLevel: currentModuleIndex + 1,
      nextLevel: nextModule ? currentModuleIndex + 2 : null,
    };
  }, [roadmap]);

  const progressValue = currentModule
    ? Math.round(currentModule.progress * 100)
    : 0;

  return (
    <div className="flex justify-between items-center w-full gap-3">
      {/* Nível Atual */}
      <div className="flex items-center justify-center flex-col text-muted-foreground">
        <Image
          src={level1complete}
          alt={`Level ${currentLevel}`}
          className="object-contain"
        />
        <span className="text-xs text-nowrap">Level {currentLevel}</span>
      </div>

      {/* Barra de Progresso */}
      <Progress value={progressValue} className="h-[8px]" />

      {/* Próximo Nível ou Certificado */}
      <div className="flex items-center justify-center flex-col text-muted-foreground">
        {nextModule ? (
          <>
            <Image
              src={level2incomplete}
              alt={`Level ${nextLevel}`}
              className="object-contain"
            />
            <span className="text-xs text-nowrap">Level {nextLevel}</span>
          </>
        ) : (
          <>
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <CertificateIcon
                size={24}
                className="text-muted-foreground"
                weight="fill"
              />
            </div>
            <span className="text-xs text-nowrap">Certificado</span>
          </>
        )}
      </div>
    </div>
  );
}

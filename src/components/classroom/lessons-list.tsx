"use client";

import { useCourseModalStore } from "@/stores/course-modal-store";
import type { Lesson, RoadmapResponse } from "@/types/roadmap";
import { findLessonContext, generateLessonUrl } from "@/utils/lesson-url";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface LessonsListProps {
  lessons: Lesson[];
  currentLessonId?: number;
  roadmap: RoadmapResponse | null;
}

export function LessonsList({
  lessons,
  currentLessonId,
  roadmap,
}: LessonsListProps) {
  const { setLessonsForPage } = useCourseModalStore();
  const router = useRouter();

  const organizedLessons = useMemo(() => {
    if (!roadmap?.modules) return [];
    return roadmap.modules.map((module) => ({
      ...module,
      groups: module.groups.map((group) => ({
        ...group,
        lessons: group.lessons || [],
      })),
    }));
  }, [roadmap]);

  const handleLessonClick = (lesson: Lesson, index: number) => {
    if (lesson.status === "locked") return;
    if (!roadmap?.modules) return;

    const context = findLessonContext(lesson.id, roadmap.modules);

    if (context) {
      const url = generateLessonUrl(lesson, context.module, context.group);
      router.push(url);
    } else {
      setLessonsForPage(lessons, index);
      router.push("/classroom");
    }
  };

  if (!roadmap || organizedLessons.length === 0) {
    return (
      <div className="p-6 text-zinc-500 text-sm animate-pulse">
        Carregando estrutura...
      </div>
    );
  }

  // Pegando o primeiro módulo
  const currentModule = organizedLessons[0];

  return (
    <div className="h-full overflow-y-auto bg-[#121214] scrollbar-thin [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-zinc-700/40
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600 scrollbar-thumb-zinc-800">
      {/* Cabeçalho do Módulo */}
      <div className="sticky top-0 z-20 bg-[#121214]/95 backdrop-blur px-4 py-6 border-b border-zinc-900">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 block">
          Módulo 01
        </span>
        <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-lg">
        {currentModule?.title || "Carregando..."}
          </span>
      </div>

      <div className="px-4 py-6 pb-20">
        <div className="flex flex-col gap-6">
          {currentModule?.groups.map((group, groupIndex) => {
            const isLastGroup = groupIndex === currentModule.groups.length - 1;

            return (
              <div key={group.id} className="relative">
                {/* Linha vertical principal que conecta os grupos (se houver mais de um) */}
                {!isLastGroup && (
                  <div className="absolute left-[11px] top-8 bottom-[-24px] w-[2px] bg-zinc-800/50 z-0" />
                )}

                {/* Título do Grupo (Nó Pai) */}
                <div className="relative z-10 flex items-center gap-4 mb-2">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-sm shrink-0">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-200">
                    {group.title}
                  </h3>
                  
                </div>

                {/* Lista de Lições (Filhos) */}
                <div className="relative pl-[11px]">
                  {/* Linha Guia Vertical do Grupo para as lições */}
                  <div 
                    className={`absolute left-[11px] top-0 bottom-0 w-[2px] bg-zinc-800/50 ${
                      group.lessons.length === 0 ? "hidden" : ""
                    }`} 
                  />

                  <div className="flex flex-col">
                    {group.lessons.map((lesson, lessonIndex) => {
                      const isActive = currentLessonId === lesson.id;
                      const isLocked = lesson.status === "locked";
                      const isLastLesson = lessonIndex === group.lessons.length - 1;
                      
                      // Encontra o índice global para o fallback de navegação
                      const lessonIndexInAll = lessons.findIndex((l) => l.id === lesson.id);

                      return (
                        <div key={lesson.id} className="relative pl-8 pt-1">
                          {/* CONECTOR CURVO (A mágica acontece aqui) */}
                          {/* 1. Máscara para cobrir a linha vertical se for o último item */}
                          {isLastLesson && (
                            <div className="absolute left-0 top-4 bottom-0 w-[4px] bg-[#121214] z-10" />
                          )}
                          
                          {/* 2. O Desenho da Curva (L Shape) */}
                          <div className="absolute left-0 top-0 h-[24px] w-[24px] border-b-2 border-l-2 border-zinc-800/50 rounded-bl-xl translate-y-[-50%]" />

                          <button
                            onClick={() => handleLessonClick(lesson, lessonIndexInAll)}
                            disabled={isLocked}
                            className={`group relative flex items-center gap-3 w-full py-2 px-3 rounded-[12px] transition-all duration-200 text-left ${
                              isActive
                                ? "bg-zinc-800/50"
                                : "hover:bg-zinc-800/30"
                            } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {/* Bolinha da Lição */}
                            <div className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                              isActive
                                ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                                : isLocked
                                  ? "bg-zinc-700"
                                  : "bg-cyan-400"
                            }`} />

                            <span
                              className={`text-sm font-medium truncate transition-colors ${
                                isActive
                                  ? "text-cyan-50 font-semibold"
                                  : "text-zinc-400 group-hover:text-zinc-300"
                              }`}
                            >
                              {lesson.title}
                            </span>
                            
                            {/* Ícone de Play ou Cadeado sutil à direita */}
                            {isActive && (
                                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
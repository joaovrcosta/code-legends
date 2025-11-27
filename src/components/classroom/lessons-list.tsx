"use client";

import {
  Article,
  Brain,
  CheckCircle,
  Circle,
  Lock,
  PlayCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { Lesson, RoadmapResponse } from "@/types/roadmap";
import { useCourseModalStore } from "@/stores/course-modal-store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { generateLessonUrl, findLessonContext } from "@/utils/lesson-url";

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

  // Organiza as aulas por módulo e grupo
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

    // Encontra o contexto da aula (módulo e grupo)
    const context = findLessonContext(lesson.id, roadmap.modules);
    
    if (context) {
      // Gera a URL dinâmica
      const url = generateLessonUrl(lesson, context.module, context.group);
      router.push(url);
    } else {
      // Fallback: usa a store e navega para /classroom
      setLessonsForPage(lessons, index);
      router.push("/classroom");
    }
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.status === "locked") {
      return <Lock size={16} className="text-gray-500" />;
    }
    if (lesson.status === "completed") {
      return (
        <CheckCircle size={16} weight="fill" className="text-[#00a277]" />
      );
    }

    switch (lesson.type) {
      case "video":
        return <PlayCircle size={16} weight="fill" />;
      case "quiz":
        return <Brain size={16} weight="fill" />;
      case "article":
        return <Article size={16} weight="fill" />;
      default:
        return <Circle size={16} weight="bold" />;
    }
  };

  if (!roadmap || organizedLessons.length === 0) {
    return (
      <div className="p-4 text-[#C4C4CC] text-sm">
        Carregando aulas...
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="">
        {organizedLessons.map((module) => (
          <li key={module.id}>
            <div className="p-4 border-b border-[#25252A] shadow-xl">
              <span className="text-xs text-[#666c6f]">Módulo</span>
              <span className="block text-base font-semibold text-[#C4C4CC] whitespace-nowrap">
                {module.title}
              </span>
            </div>

            <ul>
              {module.groups.map((group) => (
                <li key={group.id}>
                  <div className="px-4 py-2 border-b border-[#25252A]">
                    <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-xs whitespace-nowrap">
                      {group.title}
                    </span>
                  </div>
                  <ul>
                    {group.lessons.map((lesson) => {
                      const lessonIndex = lessons.findIndex(
                        (l) => l.id === lesson.id
                      );
                      const isActive = currentLessonId === lesson.id;
                      const isLocked = lesson.status === "locked";

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => handleLessonClick(lesson, lessonIndex)}
                            disabled={isLocked}
                            className={`w-full flex items-center h-[52px] px-4 transition-colors text-left ${
                              isActive
                                ? "bg-blue-gradient-500 text-white font-semibold"
                                : isLocked
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-[#C4C4CC] bg-[#1A1A1E] hover:bg-[#2E2E32]"
                            }`}
                          >
                            <span className="mr-2 flex-shrink-0">
                              {getLessonIcon(lesson)}
                            </span>

                            <div className="flex flex-col min-w-0">
                              <span className="text-[12px] text-white font-semibold whitespace-nowrap truncate">
                                {lesson.title}
                              </span>
                              {lesson.video_duration && (
                                <span className="text-xs text-[#CCCCCC] whitespace-nowrap">
                                  {lesson.video_duration}
                                </span>
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}


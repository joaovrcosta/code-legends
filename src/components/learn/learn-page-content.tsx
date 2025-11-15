"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { getCourseRoadmap } from "@/actions/course";
import { useCourseModalStore } from "@/stores/course-modal-store";
import type { RoadmapResponse } from "@/types/roadmap";
import type { ActiveCourse } from "@/types/user-course.ts";
import { LearnHeader } from "@/components/learn/learn-header";
import { LessonsContent } from "@/components/learn/lessons-content";

interface LearnPageContentProps {
  initialRoadmap: RoadmapResponse;
  activeCourse: ActiveCourse;
}

export function LearnPageContent({
  initialRoadmap,
  activeCourse,
}: LearnPageContentProps) {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);
  const [roadmap, setRoadmap] = useState<RoadmapResponse>(initialRoadmap);
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const prevOpenPopoverRef = useRef<number | null>(null);
  const prevIsModalOpenRef = useRef<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const lastCompletedTimestampRef = useRef<number | null>(null);

  const { isOpen: isModalOpen, lessonCompletedTimestamp } =
    useCourseModalStore();

  // Função para buscar o roadmap atualizado
  const fetchRoadmap = useCallback(async () => {
    if (!activeCourse?.id) return;

    try {
      const roadmapData = await getCourseRoadmap(activeCourse.id);
      if (roadmapData) {
        setRoadmap(roadmapData);
      }
    } catch (error) {
      console.error("Erro ao buscar roadmap:", error);
    }
  }, [activeCourse?.id]);

  // Coleta todas as lições de todos os módulos e grupos
  const allLessons = useMemo(() => {
    if (!roadmap?.modules) return [];
    return roadmap.modules
      .flatMap((module) => module?.groups || [])
      .flatMap((group) => group?.lessons || []);
  }, [roadmap]);

  // Encontra a primeira lição não completada para mostrar o popover "Continuar"
  const firstIncompleteLesson = useMemo(() => {
    return allLessons.find(
      (lesson) => lesson.status !== "completed" && lesson.status !== "locked"
    );
  }, [allLessons]);

  // Usa currentModule e currentClass diretamente do backend
  const currentModule = roadmap?.course.currentModule ?? 1;
  const currentClass = roadmap?.course.currentClass ?? 1;

  // Encontra o título da lição atual (memoizado)
  const currentLessonTitle = useMemo(() => {
    if (!roadmap?.modules) return "Selecione uma aula";

    for (const moduleItem of roadmap.modules) {
      if (!moduleItem?.groups) continue;
      for (const group of moduleItem.groups) {
        if (!group?.lessons) continue;
        const currentLesson = group.lessons.find((l) => l.isCurrent);
        if (currentLesson) {
          return currentLesson.title;
        }
      }
    }
    return "Selecione uma aula";
  }, [roadmap]);

  // Fecha o popover quando o modal abre e reativa "Começar" quando o modal fecha
  useEffect(() => {
    const wasModalOpen = prevIsModalOpenRef.current;

    if (isModalOpen) {
      // Modal abriu: fecha o popover
      setOpenPopover(null);
      prevOpenPopoverRef.current = null;
    } else if (wasModalOpen && !isModalOpen) {
      // Modal foi fechado: reativa o popover "Começar" na primeira lição incompleta
      if (firstIncompleteLesson) {
        setShowContinue(true);
        // Faz scroll até a lição atual após fechar o modal
        // Aguarda um delay para garantir que o DOM foi atualizado
        setTimeout(() => {
          const lessonElement = taskRefs.current[firstIncompleteLesson.id];
          if (lessonElement) {
            lessonElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 500);
      }
    }

    // Atualiza a referência com o valor atual
    prevIsModalOpenRef.current = isModalOpen;
  }, [isModalOpen, firstIncompleteLesson]);

  // Quando o popover "Assistir" é fechado, mostra o popover "Começar" novamente na lição atual
  useEffect(() => {
    // Verifica se o popover estava aberto e agora foi fechado (não foi por causa do modal)
    const wasOpen = prevOpenPopoverRef.current !== null;
    const isClosed = openPopover === null;
    const modalDidntCloseIt = !isModalOpen;

    if (wasOpen && isClosed && modalDidntCloseIt && firstIncompleteLesson) {
      setShowContinue(true);
    }

    // Atualiza a referência com o valor atual
    prevOpenPopoverRef.current = openPopover;
  }, [openPopover, isModalOpen, firstIncompleteLesson]);

  // Atualiza o roadmap quando uma lição é marcada como concluída no modal
  useEffect(() => {
    if (lessonCompletedTimestamp && activeCourse?.id) {
      // Aguarda um pequeno delay para garantir que a API foi atualizada
      const timeoutId = setTimeout(async () => {
        await fetchRoadmap();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [lessonCompletedTimestamp, activeCourse?.id, fetchRoadmap]);

  // Faz scroll quando o roadmap é atualizado após completar uma lição
  useEffect(() => {
    // Verifica se há uma nova lição completada e se ainda não fizemos scroll para ela
    if (
      lessonCompletedTimestamp &&
      lessonCompletedTimestamp !== lastCompletedTimestampRef.current &&
      roadmap &&
      firstIncompleteLesson
    ) {
      // Marca que já fizemos scroll para este timestamp
      lastCompletedTimestampRef.current = lessonCompletedTimestamp;

      // Aguarda um delay para garantir que o DOM foi atualizado
      const timeoutId = setTimeout(() => {
        const lessonElement = taskRefs.current[firstIncompleteLesson.id];
        if (lessonElement) {
          lessonElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 800); // Delay maior para garantir que o roadmap foi atualizado

      return () => clearTimeout(timeoutId);
    }
  }, [roadmap, firstIncompleteLesson, lessonCompletedTimestamp]);

  // Faz scroll até a lição atual quando a página carrega
  useEffect(() => {
    if (!hasScrolledRef.current && roadmap && firstIncompleteLesson) {
      // Aguarda um pequeno delay para garantir que o DOM foi renderizado
      const timeoutId = setTimeout(() => {
        const lessonElement = taskRefs.current[firstIncompleteLesson.id];
        if (lessonElement) {
          lessonElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          hasScrolledRef.current = true;
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [roadmap, firstIncompleteLesson]);

  const togglePopover = (id: number) => {
    setOpenPopover((prev) => (prev === id ? null : id));
  };

  // Verificação de segurança: não renderiza se o roadmap não estiver disponível
  if (!roadmap || !roadmap.modules) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Carregando roadmap do curso...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full space-y-4">
        <div className="w-full lg:py-10 py-0 rounded-2xl flex items-center justify-center flex-col">
          <LearnHeader
            currentModule={currentModule}
            currentClass={currentClass}
            courseTitle={roadmap?.course?.title || "Curso"}
            lessonTitle={currentLessonTitle}
            onToggleModules={() => {}}
            loadingModules={false}
          />
          <LessonsContent
            roadmap={roadmap}
            activeCourse={activeCourse}
            openPopover={openPopover}
            togglePopover={togglePopover}
            showContinue={showContinue}
            setShowContinue={setShowContinue}
            firstIncompleteLesson={firstIncompleteLesson}
            allLessons={allLessons}
            taskRefs={taskRefs}
          />
        </div>
      </div>
    </div>
  );
}

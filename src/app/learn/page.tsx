"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import DividerWithText from "@/components/divider-with-text";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import { getCourseRoadmap } from "@/actions/course";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";
import type { RoadmapResponse } from "@/types/roadmap";
import { LessonPopover } from "@/components/learn/lesson-popover";

export default function LearnPage() {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const prevOpenPopoverRef = useRef<number | null>(null);
  const prevIsModalOpenRef = useRef<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const lastCompletedTimestampRef = useRef<number | null>(null);

  const {
    activeCourse,
    isLoading: isLoadingActiveCourse,
    fetchActiveCourse,
  } = useActiveCourseStore();
  const { isOpen: isModalOpen, lessonCompletedTimestamp } =
    useCourseModalStore();

  // Função para buscar o roadmap
  const fetchRoadmap = useCallback(async () => {
    if (!activeCourse?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const roadmapData = await getCourseRoadmap(activeCourse.id);
      setRoadmap(roadmapData);
    } catch (error) {
      console.error("Erro ao buscar roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeCourse?.id]);

  // Busca o curso ativo quando o componente monta
  useEffect(() => {
    fetchActiveCourse();
  }, [fetchActiveCourse]);

  // Coleta todas as lições de todos os módulos e grupos
  const allLessons = useMemo(() => {
    return roadmap
      ? roadmap.modules
          .flatMap((module) => module.groups)
          .flatMap((group) => group.lessons)
      : [];
  }, [roadmap]);

  // Encontra a primeira lição não completada para mostrar o popover "Continuar"
  const firstIncompleteLesson = useMemo(() => {
    return allLessons.find(
      (lesson) => lesson.status !== "completed" && lesson.status !== "locked"
    );
  }, [allLessons]);

  // Função para fazer scroll até a lição atual
  // const scrollToCurrentLesson = useCallback(() => {
  //   if (!firstIncompleteLesson || !roadmap) return;

  //   // Aguarda um pequeno delay para garantir que o DOM foi atualizado
  //   const timeoutId = setTimeout(() => {
  //     const lessonElement = taskRefs.current[firstIncompleteLesson.id];
  //     if (lessonElement) {
  //       lessonElement.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [firstIncompleteLesson, roadmap]);

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

  // Carrega o roadmap quando o curso ativo muda
  useEffect(() => {
    if (activeCourse) {
      fetchRoadmap();
    }
  }, [activeCourse?.id, fetchRoadmap, activeCourse]);

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
    if (
      !hasScrolledRef.current &&
      !isLoading &&
      roadmap &&
      firstIncompleteLesson
    ) {
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
  }, [isLoading, roadmap, firstIncompleteLesson]);

  const togglePopover = (id: number) => {
    setOpenPopover((prev) => (prev === id ? null : id));
  };

  // Função para determinar se a lição está completa baseada no status
  const isLessonCompleted = (status: string) => status === "completed";
  const isLessonLocked = (status: string) => status === "locked";

  if (isLoadingActiveCourse || isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-muted-foreground">Carregando roadmap...</p>
      </div>
    );
  }

  if (!roadmap || !activeCourse) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Nenhum curso ativo encontrado. Selecione um curso para começar.
          </p>
          <Link href="/learn/catalog">
            <PrimaryButton>Explorar cursos</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full space-y-4">
        <div className="w-full lg:py-10 py-0 rounded-2xl flex items-center justify-center flex-col">
          {/* Cabeçalho */}

          <div className="w-full max-w-[713px] lg:sticky md:sticky fixed mt-[48px] lg:mt-0 md:mt-0 top-0 z-10 mb-8 px-4 md:pt-2 pt-4 lg:pt-0">
            <div className="bg-[#121214] px-4 flex items-center  justify-between h-[24px]"></div>
            <section className="bg-gray-gradient border border-[#25252A] px-4 py-4 flex items-center shadow-lg rounded-lg w-full max-w-[713px] justify-between sticky top-0 z-10 bg-[#1a1a1e]">
              <div className="flex flex-col lg:ml-4">
                <Link href="/learn/catalog">
                  <div className="flex items-center gap-2 cursor-pointer mb-2 text-xs text-[#7e7e89]">
                    <ArrowLeft size={16} className="text-[#7e7e89]" />
                    {roadmap.modules[0]?.title || "Curso"} -{" "}
                    {roadmap.modules[0]?.groups[0]?.title || "Início"}
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                      {roadmap.course.title}
                    </span>
                    <p className="text-xl">
                      {roadmap.modules[0]?.groups[0]?.lessons.find(
                        (l) => l.isCurrent
                      )?.title || "Selecione uma aula"}
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/learn/catalog">
                <ChevronRight size={48} />
              </Link>
            </section>
          </div>

          <div className="lg:pb-14 pb-20 w-full lg:mt-0 md:mt-0 mt-40">
            <section className="mt-0 space-y-12 px-4 mb-12">
              {roadmap.modules.map((module, moduleIndex) => (
                <div key={module.id}>
                  {module.groups.map(
                    (group, groupIndex) =>
                      group.lessons.length > 0 && (
                        <div
                          key={group.id}
                          className="flex flex-col items-center justify-center"
                        >
                          <DividerWithText text={group.title} />
                          {group.lessons.map((lesson, lessonIndex) => {
                            const isLeft = lessonIndex % 2 === 0;
                            const completed = isLessonCompleted(lesson.status);
                            const locked = isLessonLocked(lesson.status);
                            // Verifica se é a primeira lição do módulo (primeira do primeiro grupo do módulo)
                            const isFirstInModule =
                              groupIndex === 0 && lessonIndex === 0;

                            return (
                              <div
                                key={lesson.id}
                                className="max-w-[384px]"
                                ref={(el) => {
                                  taskRefs.current[lesson.id] = el;
                                }}
                              >
                                <div className="flex items-center justify-center space-x-4 mb-6 pt-7 max-w-[384px]">
                                  {isLeft && (
                                    <div
                                      className={`h-[42px] lg:w-[256px] w-[212px] rounded-tl-[55px] border-t border-l ${
                                        completed
                                          ? "border-[#00C8FF]"
                                          : "border-[#25252A]"
                                      }`}
                                    ></div>
                                  )}
                                  <LessonPopover
                                    lesson={lesson}
                                    openPopover={openPopover}
                                    togglePopover={togglePopover}
                                    showContinue={
                                      showContinue &&
                                      firstIncompleteLesson?.id === lesson.id
                                    }
                                    setShowContinue={setShowContinue}
                                    completed={completed}
                                    locked={locked}
                                    currentCourseSlug={activeCourse.slug}
                                    allLessons={allLessons}
                                    isFirstInModule={isFirstInModule}
                                  />
                                  {!isLeft && (
                                    <div
                                      className={`h-[42px] lg:w-[256px] w-[212px] rounded-tr-[55px] border-t border-r ${
                                        completed
                                          ? "border-[#00C8FF]"
                                          : "border-[#25252A]"
                                      }`}
                                    ></div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )
                  )}
                  {/* Mostra seção bloqueada se o módulo não estiver completo */}
                  {moduleIndex < roadmap.modules.length - 1 &&
                    !module.isCompleted && (
                      <div className="w-full flex items-center justify-center mt-12">
                        <section className="flex items-center justify-center p-8 border border-[#25252A] rounded-[20px] flex-col space-y-3 max-w-[384px] w-full">
                          <p className="text-sm text-center text-muted-foreground">
                            Módulo {roadmap.modules.length}
                          </p>
                          <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-center">
                            {roadmap.modules[moduleIndex + 1]?.title}
                          </span>
                          <PrimaryButton disabled>
                            Módulo bloqueado <Lock />
                          </PrimaryButton>
                        </section>
                      </div>
                    )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

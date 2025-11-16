"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  getCourseRoadmap,
  listModulesProgress,
  unlockNextModule,
} from "@/actions/course";
import { useCourseModalStore } from "@/stores/course-modal-store";
import type { RoadmapResponse } from "@/types/roadmap";
import type { ActiveCourse } from "@/types/user-course.ts";
import type { ModuleWithProgress } from "@/types/roadmap";
import { LearnHeader } from "@/components/learn/learn-header";
import { LessonsContent } from "@/components/learn/lessons-content";
import { CertificateIcon, Lock } from "@phosphor-icons/react/dist/ssr";
import { PrimaryButton } from "../ui/primary-button";
import { useRouter } from "next/navigation";

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
  const [modulesProgress, setModulesProgress] = useState<ModuleWithProgress[]>(
    []
  );
  const [isUnlocking, setIsUnlocking] = useState(false);
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const prevOpenPopoverRef = useRef<number | null>(null);
  const prevIsModalOpenRef = useRef<boolean>(false);
  const hasScrolledRef = useRef<boolean>(false);
  const lastCompletedTimestampRef = useRef<number | null>(null);
  const router = useRouter();

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

  // Função para buscar os módulos com progresso
  const fetchModulesProgress = useCallback(async () => {
    if (!activeCourse?.slug) return;

    try {
      const modulesData = await listModulesProgress(activeCourse.slug);

      if (modulesData?.modules) {
        setModulesProgress(modulesData.modules);
      }
    } catch (error) {
      console.error("Erro ao buscar módulos com progresso:", error);
    }
  }, [activeCourse?.slug]);

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

  const nextLockedModule = useMemo(() => {
    // Encontra o módulo atual usando isCurrent
    const currentModuleIndex = modulesProgress.findIndex(
      (module) => module.isCurrent
    );

    // Se encontrou o módulo atual e não é o último, retorna o próximo
    if (
      currentModuleIndex !== -1 &&
      currentModuleIndex < modulesProgress.length - 1
    ) {
      return modulesProgress[currentModuleIndex + 1];
    }

    // Se não encontrou módulo atual ou é o último, retorna undefined
    return undefined;
  }, [modulesProgress]);

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

  // Busca os módulos com progresso quando o componente carrega
  useEffect(() => {
    fetchModulesProgress();
  }, [fetchModulesProgress]);

  // Atualiza o roadmap quando uma lição é marcada como concluída no modal
  useEffect(() => {
    if (lessonCompletedTimestamp && activeCourse?.id) {
      // Aguarda um pequeno delay para garantir que a API foi atualizada
      const timeoutId = setTimeout(async () => {
        await fetchRoadmap();
        await fetchModulesProgress();
      }, 1);

      return () => clearTimeout(timeoutId);
    }
  }, [
    lessonCompletedTimestamp,
    activeCourse?.id,
    fetchRoadmap,
    fetchModulesProgress,
  ]);

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

  const handleUnlockNext = async () => {
    if (!nextLockedModule || !activeCourse?.id) return;

    setIsUnlocking(true);
    try {
      const result = await unlockNextModule(activeCourse.id);
      if (result.success) {
        // Atualiza os módulos e o roadmap
        await fetchModulesProgress();
        await fetchRoadmap();
        router.refresh();
      } else {
        console.error("Erro ao desbloquear módulo:", result.error);
        alert(result.error || "Erro ao desbloquear módulo");
      }
    } catch (error) {
      console.error("Erro ao desbloquear módulo:", error);
      alert("Erro ao desbloquear módulo");
    } finally {
      setIsUnlocking(false);
    }
  };

  // Verificação de segurança: não renderiza se o roadmap não estiver disponível
  if (!roadmap || !roadmap.modules) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
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
          <div className="flex items-center justify-between flex-col border border-[#25252A] lg:border-b-[1px] lg:border-r-[1px] lg:border-l-[1px] border-l-0 border-r-0 border-b-0 lg:rounded-lg rounded-none p-8 w-full max-w-[412px]">
            <div className="flex items-center justify-between p-2 bg-[#1a1a1e] rounded-lg mb-4">
              <span className="text-xs font-bold bg-blue-gradient-500 bg-clip-text text-transparent bg-[#1a1a1e]">
                {nextLockedModule ? "A SEGUIR" : "CERTIFICADO"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 flex-col w-full">
              {nextLockedModule ? (
                <>
                  <div className="flex items-center text-center justify-between gap-2 text-2xl mb-4">
                    <Lock size={24} weight="fill" />
                    <p>{nextLockedModule.title}</p>
                  </div>
                  {/* <h3 className="text-2xl text-center">
                    {nextLockedModule.title}
                  </h3> */}
                  <button
                    onClick={handleUnlockNext}
                    disabled={!nextLockedModule.canUnlock}
                    className="w-full text-center px-6 h-[48px] rounded-full border border-[#25252A] text-sm flex items-center justify-center text-white ease-linear duration-150 bg-blue-gradient-500"
                  >
                    {isUnlocking ? "Desbloqueando..." : "Proximo módulo"}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl text-center">
                    Parabéns! Você completou o curso!
                  </h3>
                  <p className="text-muted-foreground">
                    Gere seu certificado de conclusão
                  </p>
                  <PrimaryButton
                    variant="secondary"
                    onClick={() => {}}
                    className="h-[48px]"
                  >
                    Gerar certificado
                    <CertificateIcon size={18} className="mr-2" weight="fill" />
                  </PrimaryButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLessonBySlug, type LessonResponse, unlockNextModule, getCourseRoadmapFresh, revalidateRoadmapCache } from "@/actions/course";
import { LessonContent } from "@/components/classroom/lesson-content";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LevelProgressBar } from "@/components/learn/level-progress-bar";
import { SkipForward } from "@phosphor-icons/react";
import { SkipBack, LockOpen } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { LessonsList } from "@/components/classroom/lessons-list";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";
import useClassroomSidebarStore from "@/stores/classroom-sidebar";
import type { RoadmapResponse } from "@/types/roadmap";

export default function DynamicLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { activeCourse } = useActiveCourseStore();
  const { setLessonForPage, lessonCompletedTimestamp, currentLesson } = useCourseModalStore();
  const { isOpen: isSidebarOpen } = useClassroomSidebarStore();

  const moduleSlug = params.module as string;
  const lessonSlug = params.lesson as string;

  const [lessonData, setLessonData] = useState<LessonResponse | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  // Ref para evitar loop infinito no useEffect de atualização do roadmap
  const lessonDataRef = useRef<LessonResponse | null>(null);

  // console.log(canUnlockNextModule)
  
  // Atualiza o ref sempre que lessonData mudar
  useEffect(() => {
    lessonDataRef.current = lessonData;
  }, [lessonData]);

  // Carrega a aula específica
  useEffect(() => {
    const loadLesson = async () => {
      if (!activeCourse?.id || !lessonSlug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getLessonBySlug(activeCourse.id, lessonSlug);
        if (data) {
          setLessonData(data);
          
          
          // Atualiza o store com a lição atual, incluindo o status do nível raiz
          const lessonWithStatus = {
            ...data.lesson,
            status: data.status, // Usa o status do nível raiz da resposta
          };
          setLessonForPage(lessonWithStatus);
        } else {
          setError("Aula não encontrada");
        }
      } catch (err) {
        console.error("Erro ao carregar aula:", err);
        setError("Erro ao carregar aula");
      } finally {
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [activeCourse?.id, lessonSlug, setLessonForPage]);

  // Carrega o roadmap para a sidebar
  useEffect(() => {
    const loadRoadmap = async () => {
      if (!activeCourse?.id) return;

      try {
        const roadmapData = await getCourseRoadmapFresh(activeCourse.id);
        if (roadmapData) {
          setRoadmap(roadmapData);
        }
      } catch (error) {
        console.error("Erro ao carregar roadmap:", error);
      }
    };

    loadRoadmap();
  }, [activeCourse?.id]);

  // Atualiza o roadmap quando uma lição é completada
  useEffect(() => {
    const updateRoadmap = async () => {
      if (!activeCourse?.id || !lessonCompletedTimestamp || !lessonSlug) return;
      
      // Usa o ref para acessar lessonData sem causar loop
      const currentLessonData = lessonDataRef.current;
      if (!currentLessonData) return;

      const currentLessonId = currentLessonData.lesson.id;

      try {
        // Revalida o cache
        await revalidateRoadmapCache(activeCourse.id);
        
        // Aguarda um delay para garantir que a API foi atualizada
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Recarrega a lição diretamente da API para obter o status atualizado do nível raiz
        const refreshedLessonData = await getLessonBySlug(activeCourse.id, lessonSlug);
        if (refreshedLessonData) {
          console.log("Lição recarregada após completar - Status:", refreshedLessonData.status);
          setLessonData(refreshedLessonData);
          // Atualiza o store com o status correto do nível raiz
          const lessonWithStatus = {
            ...refreshedLessonData.lesson,
            status: refreshedLessonData.status, // Usa o status do nível raiz
          };
          setLessonForPage(lessonWithStatus);
        }
        
        // Busca o roadmap atualizado para a sidebar
        const roadmapData = await getCourseRoadmapFresh(activeCourse.id);
        if (roadmapData) {
          setRoadmap(roadmapData);
        }
      } catch (error) {
        console.error("Erro ao atualizar roadmap:", error);
      }
    };

    updateRoadmap();
    // Removido lessonData e setLessonForPage das dependências para evitar loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonCompletedTimestamp, activeCourse?.id, lessonSlug]);

  // Atualiza a lição local quando o currentLesson do store mudar (após completar)
  useEffect(() => {
    if (currentLesson && lessonData && currentLesson.id === lessonData.lesson.id) {
      // Se o status mudou para completed, atualiza o lessonData local
      // Usa o status do nível raiz (lessonData.status) em vez de lessonData.lesson.status
      if (currentLesson.status === "completed" && lessonData.status !== "completed") {
        setLessonData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            status: "completed", // Atualiza o status do nível raiz
            lesson: { ...prev.lesson, status: "completed" },
          };
        });
      }
    }
  }, [currentLesson, lessonData]);

  // Recarrega a lição quando ela é completada para obter dados atualizados do back-end
  useEffect(() => {
    const reloadLesson = async () => {
      if (!lessonCompletedTimestamp || !activeCourse?.id || !lessonSlug) return;
      
      try {
        // Aguarda um delay para garantir que a API foi atualizada
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // Recarrega a lição para obter o status atualizado
        const data = await getLessonBySlug(activeCourse.id, lessonSlug);
        if (data) {
          console.log("Lição recarregada após completar:", data.status);
          setLessonData(data);
          // Atualiza o store com o status correto do nível raiz
          const lessonWithStatus = {
            ...data.lesson,
            status: data.status, // Usa o status do nível raiz
          };
          setLessonForPage(lessonWithStatus);
        }
      } catch (error) {
        console.error("Erro ao recarregar lição após completar:", error);
      }
    };

    reloadLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonCompletedTimestamp]);

  // Debug: verifica se navigation está disponível (sempre chamado, mesmo que lessonData seja null)
  useEffect(() => {
    if (lessonData?.navigation) {
      console.log("Navigation disponível:", {
        previous: lessonData.navigation.previous,
        next: lessonData.navigation.next,
      });
    } else if (lessonData) {
      console.warn("Navigation não disponível no lessonData");
    }
  }, [lessonData]);

  // Função para navegar para uma aula
  const navigateToLesson = (
    lessonSlug: string,
    targetModuleSlug: string,
    targetGroupSlug: string
  ) => {
    router.push(
      `/classroom/${targetModuleSlug}/group/${targetGroupSlug}/lesson/${lessonSlug}`
    );
  };

  // Coleta todas as aulas para a sidebar (sempre executado, mesmo se lessonData for null)
  const allLessons = roadmap?.modules
    .flatMap((m) => m?.groups || [])
    .flatMap((g) => g?.lessons || []) || [];

  // Encontra o módulo atual e verifica se está completo (sempre executado)
  const currentModuleData = useMemo(() => {
    if (!roadmap || !lessonData?.module) return null;
    
    const moduleData = lessonData.module;
    // Tenta encontrar o módulo por ID ou slug
    const foundModule = roadmap.modules.find(
      (m) => m.id === moduleData.id || m.slug === moduleData.slug || m.slug === moduleSlug
    );
    return foundModule || null;
  }, [roadmap, lessonData?.module, moduleSlug]);

  const canUnlockNextModule = roadmap?.course.canUnlockNextModule ?? false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-white">
          <p className="text-muted-foreground">Carregando aula...</p>
        </div>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-white">
          <p className="text-muted-foreground mb-4">
            {error || "Aula não encontrada"}
          </p>
          <Link href="/learn">
            <Button>Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!activeCourse) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-white">
          <p className="text-muted-foreground mb-4">
            Nenhum curso ativo encontrado.
          </p>
          <Link href="/learn/catalog">
            <Button>Explorar cursos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, navigation } = lessonData;

  // Handler para desbloquear o próximo módulo
  const handleUnlockNext = async () => {
    if (!activeCourse?.id) return;

    setIsUnlocking(true);
    try {
      const result = await unlockNextModule(activeCourse.id);
      if (result.success) {
        // Revalida o cache do roadmap
        await revalidateRoadmapCache(activeCourse.id);
        
        // Aguarda um pouco para garantir que o revalidateTag foi processado
        await new Promise((resolve) => setTimeout(resolve, 200));
        
        // Recarrega o roadmap atualizado
        const roadmapData = await getCourseRoadmapFresh(activeCourse.id);
        if (roadmapData) {
          setRoadmap(roadmapData);
          
          // Recarrega a lição atual para obter dados atualizados (incluindo navigation)
          const refreshedLessonData = await getLessonBySlug(activeCourse.id, lessonSlug);
          if (refreshedLessonData) {
            setLessonData(refreshedLessonData);
            
            // Se houver uma próxima aula disponível, navega automaticamente para ela
            if (refreshedLessonData.navigation?.next) {
              navigateToLesson(
                refreshedLessonData.navigation.next.slug,
                refreshedLessonData.navigation.next.moduleSlug,
                refreshedLessonData.navigation.next.groupSlug
              );
            }
          }
        }
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

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar com lista de aulas - apenas no desktop */}
      <aside
        className={`hidden lg:block fixed left-0 top-[63px] bg-[#121214] border-r border-[#25252A] flex-shrink-0 h-[calc(100vh-63px)] overflow-hidden z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        {isSidebarOpen && (
          <div className="h-full flex flex-col w-64">
            <div className="p-4 border-b border-[#25252A] bg-[#121214]">
              <h2 className="text-sm font-semibold text-[#C4C4CC]">Trilha</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <LessonsList
                lessons={allLessons}
                currentLessonId={lesson.id}
                roadmap={roadmap}
              />
            </div>
          </div>
        )}
      </aside>

      {/* Conteúdo principal */}
      <div
        className={`flex-1 w-full lg:bg-[radial-gradient(circle_at_center,_#627fa1_0%,_#121214_70%)]
             bg-[radial-gradient(circle_at_center,_#344c68_0%,_#121214_70%)]
             text-white h-screen shadow-2xl shadow-[#00C8FF]/10 flex flex-col transition-all duration-300 ease-in-out ${
               isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
             }`}
      >
        {/* Header */}
        <header className="h-[63px] py-4 pb-0 bg-transparent rounded-t-[20px] lg:border-b lg:border-[#25252A] border-none lg:mb-2 mb-0 flex-shrink-0">
          <div className="flex items-center justify-between w-full px-4">
            <div className="lg:hidden flex">
              <Menu size={32} className="text-white" />
            </div>

            {/* Botão de voltar (direita) */}
            <Link href="/learn">
              <X size={32} className="text-white cursor-pointer" />
            </Link>
          </div>
        </header>


        {/* Conteúdo */}
        <LessonContent
          lesson={lesson}
          courseTitle={activeCourse?.title}
          moduleTitle={lessonData.moduleTitle}
          groupTitle={lessonData.groupTitle}
          courseIcon={activeCourse?.icon}
        />

        {/* Footer */}
        <footer
          className={`fixed left-0 right-0 lg:bottom-0 bottom-[51px] lg:bg-[#0C0C0F] bg-[#0C0C0F] lg:border-t lg:border-t-[#25252A] border-t border-t-[#25252A] lg:rounded-b-[20px] rounded-b-none p-0 z-50 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:left-64" : "lg:left-0"
          }`}
        >
          <div className="flex justify-between w-full m-0 p-0">
            <Button
              variant="outline"
              className="h-[64px] lg:min-h-[84px] w-1/2 max-w-[320px] bg-black rounded-none text-base border-none 
      rounded-bl-none disabled:opacity-50"
              onClick={() => {
                if (navigation?.previous) {
                  navigateToLesson(
                    navigation.previous.slug,
                    navigation.previous.moduleSlug,
                    navigation.previous.groupSlug
                  );
                }
              }}
              disabled={!navigation?.previous}
            >
              <SkipBack weight="fill" size={24} />
              Aula anterior
            </Button>
            <div className="w-full lg:flex items-center justify-center px-8 hidden">
              <LevelProgressBar />
            </div>
            {canUnlockNextModule ? (
              <Button
                variant="outline"
                onClick={handleUnlockNext}
                disabled={isUnlocking}
                className="h-[64px] lg:min-h-[84px] w-1/2 max-w-[320px] rounded-none text-base bg-blue-gradient-500 border-none
      rounded-br-none disabled:opacity-50"
              >
                {isUnlocking ? (
                  "Desbloqueando..."
                ) : (
                  <>
                    Desbloquear <LockOpen weight="fill" size={16} />
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  if (navigation?.next && lessonData.status === "completed") {
                    navigateToLesson(
                      navigation.next.slug,
                      navigation.next.moduleSlug,
                      navigation.next.groupSlug
                    );
                  }
                }}
                disabled={!navigation?.next || lessonData.status !== "completed"}
                className="h-[64px] lg:min-h-[84px] w-1/2 max-w-[320px] text-base bg-black border-none
      disabled:opacity-50"
              >
                Próxima aula <SkipForward weight="fill" size={16} />
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}


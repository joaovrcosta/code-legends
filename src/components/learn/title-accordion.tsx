"use client";

import { MessageCircle, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { continueCourse, type CompleteLessonResponse } from "@/actions/course";
import { useState, useEffect } from "react";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";
import { motion, AnimatePresence } from "framer-motion";

interface TitleAccordinProps {
  title: string | undefined;
  description: string | undefined;
}

export function TitleAccordion({ title, description }: TitleAccordinProps) {
  const [isMarking, setIsMarking] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpData, setXpData] = useState<CompleteLessonResponse | null>(null);
  const { activeCourse, fetchActiveCourse } = useActiveCourseStore();
  const { currentLesson, updateCurrentLessonStatus } = useCourseModalStore();

  // Verifica se a lição atual já está marcada como completada
  const isMarked = currentLesson?.status === "completed";

  // Debug: verifica se currentLesson está disponível
  useEffect(() => {
  }, [currentLesson]);

  const handleMarkAsWatched = async () => {
    
    if (!currentLesson?.id) {
      console.error("currentLesson não tem ID:", currentLesson);
      alert("Erro: Lição não encontrada. Recarregue a página.");
      return;
    }
    
    if (isMarking || isMarked) {
      return;
    }

    // Verifica se a aula está bloqueada antes de tentar completá-la
    if (currentLesson.status === "locked") {
      alert("Esta aula está bloqueada. Complete as aulas anteriores para desbloqueá-la.");
      return;
    }

    try {
      setIsMarking(true);
      
      const result = await continueCourse(currentLesson.id, activeCourse?.id);
      
      if (!result || !result.success) {
        throw new Error("A API não retornou sucesso ao completar a lição");
      }

      // Armazena os dados de XP
      setXpData(result);

      // Mostra popup de XP se houver XP ganho
      if (result.xpGained && result.xpGained > 0) {
        setShowXpPopup(true);
        // Remove o popup após 2 segundos
        setTimeout(() => {
          setShowXpPopup(false);
        }, 2000);
      }

      // Atualiza o status da lição atual no modal imediatamente
      updateCurrentLessonStatus("completed");

      // Atualiza o curso ativo para refletir o progresso
      await fetchActiveCourse();
    } catch (error) {
      console.error("Erro ao marcar como assistido:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      
      // Se o erro for sobre aula bloqueada, mostra mensagem mais clara
      if (errorMessage.includes("locked") || errorMessage.includes("bloqueada")) {
        alert("Esta aula está bloqueada. Complete as aulas anteriores para desbloqueá-la. Se você acabou de resetar o curso, aguarde alguns segundos e recarregue a página.");
      } else {
        alert(`Erro ao marcar como assistido: ${errorMessage}. Tente novamente.`);
      }
    } finally {
      setIsMarking(false);
    }
  };
  return (
    <>
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="item-1">
          <div className="w-full mx-auto lg:rounded-[20px] rounded-none bg-[#0C0C0F] border border-[#2A2A2A] shadow-xl mb-4
            border-l-0 border-r-0 lg:border-l lg:border-r"
          >
            <AccordionTrigger className="group w-full lg:px-8 px-6 lg:py-8 py-4 relative">
              {/* Popup de XP único - posicionado acima do botão correto */}
              <AnimatePresence>
                {showXpPopup && xpData?.xpGained && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, y: -60, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute z-50 pointer-events-none lg:right-[120px] lg:top-4 right-1/2 top-4 translate-x-1/2 lg:translate-x-0"
                  >
                    <div className="bg-[#00c0f5] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-[#00c0f5]/50 whitespace-nowrap">
                      +{xpData.xpGained} XP
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex justify-between w-full items-center">
                <div>
                  <span className="lg:block hidden bg-blue-gradient-500 bg-clip-text text-transparent lg:text-[20px] text-[16px] font-bold">
                    {title}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="lg:flex hidden items-center gap-2 border border-[#25252A] px-3 py-2 rounded-full text-sm text-white whitespace-nowrap mr-4 font-normal">
                    <MessageCircle size={16} /> 3 comentários
                  </div>
                  <div className="relative">
                    <motion.div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsWatched();
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        backgroundColor: isMarked
                          ? "rgba(0, 192, 245, 0.1)"
                          : isMarking
                          ? "rgba(6, 182, 212, 0.1)"
                          : "transparent",
                        borderColor: isMarked
                          ? "#00c0f5"
                          : isMarking
                          ? "#06b6d4"
                          : "#25252A",
                        boxShadow: isMarked
                          ? "0 0 20px rgba(0, 192, 245, 0.3)"
                          : isMarking
                          ? "0 0 15px rgba(6, 182, 212, 0.2)"
                          : "none",
                      }}
                      transition={{ duration: 0.2 }}
                      className={`lg:flex hidden items-center gap-2 border px-3 py-2 rounded-full text-sm text-white whitespace-nowrap mr-4 font-normal relative ${
                        isMarking || isMarked || !currentLesson
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:border-[#00b3e4]"
                      }`}
                    >
                      <motion.div
                        animate={{
                          rotate: isMarked ? [0, 360] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        {isMarking ? (
                          <Loader2 size={16} className="animate-spin text-[#00b3e4]" />
                        ) : (
                          <Check
                            weight="bold"
                            size={16}
                            className={isMarked ? "text-[#00c0f5]" : "text-[#00b3e4]"}
                          />
                        )}
                      </motion.div>
                      {isMarking
                        ? "Marcando..."
                        : isMarked
                        ? "Completa"
                        : "Completar lição"}
                    </motion.div>
                  </div>
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 w-full">
                  <div className="relative flex-1">
                    <motion.div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsWatched();
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        backgroundColor: isMarked
                          ? "rgba(0, 192, 245, 0.1)"
                          : isMarking
                          ? "rgba(6, 182, 212, 0.1)"
                          : "transparent",
                        borderColor: isMarked
                          ? "#00c0f5"
                          : isMarking
                          ? "#06b6d4"
                          : "#25252A",
                        boxShadow: isMarked
                          ? "0 0 20px rgba(0, 192, 245, 0.3)"
                          : isMarking
                          ? "0 0 15px rgba(6, 182, 212, 0.2)"
                          : "none",
                      }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center shadow-2xl justify-center gap-2 border px-3 py-2 rounded-[14px] text-sm text-white whitespace-nowrap font-normal relative ${
                        isMarking || isMarked || !currentLesson
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:border-[#00c0f5]"
                      }`}
                    >
                      <motion.div
                        animate={{
                          rotate: isMarked ? [0, 360] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        {isMarking ? (
                          <Loader2 size={16} className="animate-spin text-[#00b3e4]" />
                        ) : (
                          <Check
                            size={16}
                            weight="bold"
                            className={isMarked ? "text-[#00c0f5]" : "text-[#00b3e4]"}
                          />
                        )}
                      </motion.div>
                      <p className="font-semibold">
                        {isMarking
                          ? "Marcando..."
                          : isMarked
                          ? "Completa"
                          : "Completar"}
                      </p>
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 border border-[#25252A] px-3 py-2 rounded-[14px] text-sm text-white whitespace-nowrap font-normal shrink-0">
                    <MessageCircle size={20} />
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="lg:px-8 px-6 pb-8 text-white">
              <p className="lg:text-sm text-xs text-muted-foreground font-normal mb-6">
                {description}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Avatar className="h-[32px] w-[32px]">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?s=400&u=415dc8fde593b5dcbdef181e6186a8d80daf72fc&v=4" />
                  <AvatarFallback>JV</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white">João Victor</p>
                  <p className="text-xs text-[#c4c4c4]">Educator</p>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}

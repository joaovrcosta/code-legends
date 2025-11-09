"use client";

import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { continueCourse } from "@/actions/course";
import { useState } from "react";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";

interface TitleAccordinProps {
  title: string | undefined;
}

export function TitleAccordion({ title }: TitleAccordinProps) {
  const [isMarking, setIsMarking] = useState(false);
  const { activeCourse, fetchActiveCourse } = useActiveCourseStore();
  const { currentLesson, lessons, currentIndex, updateCurrentLessonStatus } =
    useCourseModalStore();

  // Verifica se a lição atual já está marcada como completada
  const isMarked = currentLesson?.status === "completed";

  const handleMarkAsWatched = async () => {
    if (!currentLesson?.id || isMarking || isMarked) return;

    try {
      setIsMarking(true);
      await continueCourse(currentLesson.id);

      // Atualiza o status da lição atual no modal imediatamente
      updateCurrentLessonStatus("completed");

      // Atualiza o curso ativo para refletir o progresso
      await fetchActiveCourse();
    } catch (error) {
      console.error("Erro ao marcar como assistido:", error);
      alert("Erro ao marcar como assistido. Tente novamente.");
    } finally {
      setIsMarking(false);
    }
  };
  return (
    <>
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="item-1">
          <div className="w-full mx-auto rounded-[20px] bg-[#0C0C0F] border border-[#2A2A2A] shadow-xl mb-4">
            <AccordionTrigger className="group w-full lg:px-8 px-6 lg:py-8 py-6">
              <div className="flex justify-between w-full items-center">
                <div>
                  <span className="bg-blue-gradient-500 bg-clip-text text-transparent lg:text-[20px] text-[16px] font-bold">
                    {title}
                  </span>
                  <p className="lg:text-sm text-xs text-muted-foreground font-normal mt-1">
                    Vamos iniciar o nosso conhecimento com ReactJS
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="lg:flex hidden items-center gap-2 border border-[#25252A] px-3 py-1 rounded-full text-sm text-white whitespace-nowrap mr-4 font-normal">
                    <MessageCircle size={16} /> 3 comentários
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsWatched();
                    }}
                    className={`lg:flex hidden items-center gap-2 border px-3 py-1 rounded-full text-sm text-white whitespace-nowrap mr-4 font-normal transition-all ${
                      isMarking || isMarked || !currentLesson
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-green-500"
                    } ${
                      isMarked
                        ? "border-green-500 bg-green-500/10"
                        : "border-[#25252A]"
                    }`}
                  >
                    <Check
                      size={16}
                      className={isMarked ? "text-green-500" : "text-green-500"}
                    />{" "}
                    {isMarking
                      ? "Marcando..."
                      : isMarked
                      ? "Completado"
                      : "Completar lição"}
                  </div>
                </div>
                <div className="lg:hidden flex flex-col items-center gap-2">
                  {/* <div className="flex items-center gap-2 border border-[#25252A] px-3 py-1 rounded-full text-sm text-white whitespace-nowrap font-normal">
                    <MessageCircle size={16} />
                  </div> */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsWatched();
                    }}
                    className={`flex items-center gap-2 border px-3 py-1 rounded-full text-sm text-white whitespace-nowrap font-normal transition-all ${
                      isMarking || isMarked || !currentLesson
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-green-500"
                    } ${
                      isMarked
                        ? "border-green-500 bg-green-500/10"
                        : "border-[#25252A]"
                    }`}
                  >
                    <Check
                      size={16}
                      className={isMarked ? "text-green-500" : "text-green-500"}
                    />
                    {isMarking
                      ? "Marcando..."
                      : isMarked
                      ? "Completado"
                      : "Completar"}
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="lg:px-8 px-6 pb-8 text-white">
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

"use client";

import {
  ArrowBigDown,
  ArrowLeft,
  ChevronRight,
  CirclePlay,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PrimaryButton } from "@/components/ui/primary-button";
import completeTaskRight from "../../../public/complete-task-right.svg";
import completeTaskLeft from "../../../public/complete-task-left.svg";
import incompleteTaskLeft from "../../../public/incomplete-task-left.svg";
import incompleteTaskRight from "../../../public/incomplete-task-right.svg";
import DividerWithText from "@/components/divider-with-text";

type Task = {
  id: number;
  title: string;
  category: string;
  image: string;
  completed: boolean;
  locked?: boolean;
  url?: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Introdução",
    category: "ReactJS",
    image: completeTaskRight,
    completed: true,
    url: "/learn/catalog",
  },
  {
    id: 2,
    title: "Fundamentos do ReactJS",
    category: "ReactJS",
    image: completeTaskLeft,
    completed: true,
    url: "/learn/catalog",
  },
  {
    id: 3,
    title: "Bundlers & Compilers",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/catalog",
  },
  {
    id: 4,
    title: "Criando um projeto React",
    category: "ReactJS",
    image: incompleteTaskRight,
    completed: false,
    locked: true,
    url: "/learn/catalog",
  },
  {
    id: 5,
    title: "Componentes",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    locked: true,
    url: "/learn/catalog",
  },
];

const firstIncompleteTask = tasks.find((task) => !task.completed)?.id ?? null;

const TaskTooltip = ({
  task,
  openTooltip,
  toggleTooltip,
  showContinue,
  setShowContinue,
}: {
  task: Task;
  openTooltip: number | null;
  toggleTooltip: (id: number) => void;
  showContinue: boolean;
  setShowContinue: (state: boolean) => void;
}) => (
  <TooltipProvider>
    {showContinue && firstIncompleteTask === task.id ? (
      <Tooltip open={true}>
        <TooltipTrigger asChild>
          <Image
            src={task.image}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              setShowContinue(false);
              toggleTooltip(task.id);
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="w-[120px] text-center bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-white text-sm">Continuar</span>
            <ArrowBigDown className="text-[#00c8ff]" />
          </div>
        </TooltipContent>
      </Tooltip>
    ) : (
      /* Tooltip normal de "Assistir" */
      <Tooltip open={openTooltip === task.id}>
        <TooltipTrigger asChild>
          <Image
            src={task.image}
            alt=""
            className="cursor-pointer"
            onClick={() => toggleTooltip(task.id)}
          />
        </TooltipTrigger>
        <TooltipContent className="w-[295px] bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-4">
          <div className="mb-3">
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
              {task.category}
            </span>
            <h3 className="text-xl mt-2">{task.title}</h3>
          </div>
          <PrimaryButton disabled={task.locked}>
            {task.locked ? "Confidencial" : "Assistir"}
            {task.locked ? <Lock /> : <CirclePlay />}
          </PrimaryButton>
        </TooltipContent>
      </Tooltip>
    )}
  </TooltipProvider>
);

export default function LearnPage() {
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);

  const toggleTooltip = (id: number) => {
    setOpenTooltip((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full space-y-4">
        <div className="w-full lg:py-10 py-0 rounded-2xl flex items-center justify-center flex-col">
          {/* Cabeçalho */}
          <div className="w-full max-w-[713px] sticky top-0 z-10 mb-8">
            <div className="bg-[#121214] px-4 flex items-center  justify-between h-[24px]"></div>
            <section className="bg-gray-gradient border border-[#25252A] px-4 py-4 flex items-center shadow-lg rounded-lg w-full max-w-[713px] justify-between sticky top-0 z-10 bg-[#1a1a1e]">
              <div className="flex flex-col lg:ml-4">
                <Link href="/learn/catalog">
                  <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
                    <ArrowLeft size={16} className="text-[#7e7e89]" />
                    SEÇÃO 1, AULA 3
                  </div>
                </Link>
                <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                  ReactJS
                </span>
                <p className="text-xl">Bundlers & Compilers</p>
              </div>
              <Link href="/learn/catalog">
                <ChevronRight size={48} />
              </Link>
            </section>
          </div>

          <DividerWithText text="Fundamentos do ReactJS" />

          {/* Lista de Tarefas */}
          <section className="mt-8 space-y-10 px-4">
            {tasks.map((task, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between mt-4 space-x-2"
                >
                  {isLeft && (
                    <div className="h-[56px] w-[256px] rounded-tl-[55px] border-t border-l"></div>
                  )}
                  <TaskTooltip
                    task={task}
                    openTooltip={openTooltip}
                    toggleTooltip={toggleTooltip}
                    showContinue={showContinue}
                    setShowContinue={setShowContinue}
                  />
                  {!isLeft && (
                    <div className="h-[56px] w-[256px] rounded-tr-[55px] border-t border-r"></div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

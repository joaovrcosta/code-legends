"use client";

import { ArrowLeft, ChevronRight, CirclePlay, Lock } from "lucide-react";
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
    url: "/learn/courses",
  },
  {
    id: 2,
    title: "Fundamentos do ReactJS",
    category: "ReactJS",
    image: completeTaskLeft,
    completed: true,
    url: "/learn/courses",
  },
  {
    id: 3,
    title: "Bundlers & Compilers",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/courses",
  },
  {
    id: 4,
    title: "Criando um projeto React",
    category: "ReactJS",
    image: incompleteTaskRight,
    completed: false,
    locked: true,
    url: "/learn/courses",
  },
  {
    id: 5,
    title: "Componentes",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/courses",
  },
  {
    id: 6,
    title: "Propriedades",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/courses",
  },
  {
    id: 7,
    title: "Componentes",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/courses",
  },
  {
    id: 8,
    title: "Propriedades",
    category: "ReactJS",
    image: incompleteTaskLeft,
    completed: false,
    url: "/learn/courses",
  },
];

const TaskTooltip = ({
  task,
  openTooltip,
  toggleTooltip,
}: {
  task: Task;
  openTooltip: number | null;
  toggleTooltip: (id: number) => void;
}) => (
  <TooltipProvider>
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
  </TooltipProvider>
);

export default function LearnPage() {
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);

  const toggleTooltip = (id: number) =>
    setOpenTooltip((prev) => (prev === id ? null : id));

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full space-y-4">
        <div className="w-full lg:py-10 py-0 rounded-2xl flex items-center justify-center flex-col">
          {/* Cabeçalho */}
          <div className="w-full max-w-[713px] sticky top-0 z-10">
            <div className="bg-[#121214] px-4 flex items-center  justify-between h-[24px]"></div>
            <section className="bg-gray-gradient border border-[#25252A] px-4 py-4 flex items-center rounded-lg w-full max-w-[713px] justify-between sticky top-0 z-10 bg-[#1a1a1e]">
              <div className="flex flex-col lg:ml-4">
                <Link href="/learn/courses">
                  <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
                    <ArrowLeft size={16} className="text-[#7e7e89]" />
                    SEÇÃO 1, AULA 14
                  </div>
                </Link>
                <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-sm">
                  ReactJS
                </span>
                <p className="text-xl">Fundamentos do ReactJS</p>
              </div>
              <Link href="/learn/courses">
                <ChevronRight size={48} />
              </Link>
            </section>
          </div>

          {/* Lista de Tarefas */}
          <section className="mt-12 space-y-10 px-4">
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

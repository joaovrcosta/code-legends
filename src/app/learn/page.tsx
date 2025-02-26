"use client";

import { ArrowLeft, ChevronRight, CirclePlay, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@/components/ui/popover"; // Supondo que você tenha esse componente Popover
import { PrimaryButton } from "@/components/ui/primary-button";
import completeTaskRight from "../../../public/complete-task-right.svg";
import completeTaskLeft from "../../../public/complete-task-left.svg";
import incompleteTaskLeft from "../../../public/incomplete-task-left.svg";
import incompleteTaskRight from "../../../public/incomplete-task-right.svg";
import DividerWithText from "@/components/divider-with-text";
import { FastForward } from "@phosphor-icons/react/dist/ssr";

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

const TaskPopover = ({
  task,
  openPopover,
  togglePopover,
  showContinue,
  setShowContinue,
}: {
  task: Task;
  openPopover: number | null;
  togglePopover: (id: number) => void;
  showContinue: boolean;
  setShowContinue: (state: boolean) => void;
}) => (
  <div>
    {showContinue && firstIncompleteTask === task.id ? (
      <Popover open={true}>
        <PopoverTrigger asChild>
          <Image
            src={task.image}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              setShowContinue(false);
              togglePopover(task.id);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[120px] text-center bg-[#00c1f6] rounded-[12px] border-[2px] border-[#25252A] shadow-lg p-2"
          side="top"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-white text-base">Continuar</span>
          </div>
          <PopoverArrow className="fill-[#00c1f6] mb-3 w-4 h-4 transform translate-y-[-2px]" />
        </PopoverContent>
      </Popover>
    ) : (
      <Popover open={openPopover === task.id}>
        <PopoverTrigger asChild>
          <Image
            src={task.image}
            alt=""
            className="cursor-pointer"
            onClick={() => togglePopover(task.id)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[295px] bg-[#1a1a1e] rounded-[20px] border border-[#25252A] shadow-lg p-4">
          <div className="mb-3">
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
              {task.category}
            </span>
            <h3 className="text-xl mt-2 text-white">{task.title}</h3>
          </div>
          <PrimaryButton disabled={task.locked}>
            {task.locked ? "Confidencial" : "Assistir"}
            {task.locked ? <Lock /> : <CirclePlay />}
          </PrimaryButton>
          <PopoverArrow className="fill-[#1a1a1e] w-4 h-4 transform translate-y-[-2px]" />
        </PopoverContent>
      </Popover>
    )}
  </div>
);

export default function LearnPage() {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);

  const togglePopover = (id: number) => {
    setOpenPopover((prev) => (prev === id ? null : id));
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
          <div className="pb-14">
            <section className="mt-8 space-y-12 px-4 mb-12">
              {tasks.map((task, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between mt-4 space-x-2 pb-4"
                  >
                    {isLeft && (
                      <div className="h-[56px] w-[256px] rounded-tl-[55px] border-t border-l"></div>
                    )}
                    <TaskPopover
                      task={task}
                      openPopover={openPopover}
                      togglePopover={togglePopover}
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
            <section className="flex items-center justify-center p-8 border border-[#25252A] rounded-[20px] flex-col space-y-3">
              <p className="text-sm">Seção 2</p>
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                Aprofundando com hooks
              </span>
              <PrimaryButton>
                Pular sessão <FastForward size={32} weight="fill" />
              </PrimaryButton>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

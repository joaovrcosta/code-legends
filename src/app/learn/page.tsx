"use client";

import { ArrowLeft, ChevronRight, CirclePlay, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@/components/ui/popover";
import { PrimaryButton } from "@/components/ui/primary-button";
import DividerWithText from "@/components/divider-with-text";
import { FastForward } from "@phosphor-icons/react/dist/ssr";
import { reactCourseData, Task } from "../../../db";

const firstIncompleteTask =
  reactCourseData.courseModules[0].submodules[0].tasks.find(
    (task) => !task.completed
  )?.id ?? null;

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
          className="w-[120px] cursor-pointer text-center bg-[#121214] rounded-full border-[2px] border-[#25252A] shadow-lg p-2 hover:bg-[#25252A]"
          side="top"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-white text-sm font-semibold">Continuar</span>
          </div>
          <PopoverArrow className="fill-[#25252A] mb-3 w-4 h-4 transform translate-y-[-2px]" />
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
            <div className="flex items-center space-x-2">
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                {task.category}
              </span>
              <span className="text-xs text-[#7e7e89] capitalize">
                {task.type}
              </span>
            </div>
            <h3 className="text-xl mt-2 text-white">{task.title}</h3>
          </div>
          <Link href={`${task.url}`}>
            <PrimaryButton disabled={task.locked}>
              {task.locked ? "Confidencial" : "Assistir"}
              {task.locked ? <Lock /> : <CirclePlay />}
            </PrimaryButton>
          </Link>

          {(task.type === "project" || task.type === "quiz") && (
            <Link href={`/skip-task/${task.id}`}>
              <PrimaryButton className="mt-2" disabled={task.locked}>
                Pular
                <FastForward size={24} weight="fill" />
              </PrimaryButton>
            </Link>
          )}
          <PopoverArrow className="fill-[#1a1a1e] w-4 h-4 transform translate-y-[-2px]" />
        </PopoverContent>
      </Popover>
    )}
  </div>
);

export default function LearnPage() {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const togglePopover = (id: number) => {
    setOpenPopover((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (firstIncompleteTask && taskRefs.current[firstIncompleteTask]) {
      taskRefs.current[firstIncompleteTask]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

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
          {/* Lista de Tarefas */}
          <div className="lg:pb-14 pb-20 w-full">
            <section className="mt-0 space-y-12 px-4 mb-12">
              {reactCourseData.courseModules[0].submodules.map(
                (submodule, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex flex-col items-center justify-center"
                  >
                    <DividerWithText text={submodule.submoduleName} />
                    {submodule.tasks.map((task, index) => {
                      const isLeft = index % 2 === 0;
                      return (
                        <div
                          key={task.id}
                          className="max-w-[384px]"
                          ref={(el) => {
                            taskRefs.current[task.id] = el;
                          }}
                        >
                          <div className="flex items-center justify-center space-x-4 mb-6 pt-7 max-w-[384px]">
                            {isLeft && (
                              <div
                                className={`h-[42px] w-[256px] rounded-tl-[55px] border-t border-l ${
                                  task.completed
                                    ? "border-[#00C8FF]"
                                    : "border-[#25252A]"
                                }`}
                              ></div>
                            )}
                            <TaskPopover
                              task={task}
                              openPopover={openPopover}
                              togglePopover={togglePopover}
                              showContinue={showContinue}
                              setShowContinue={setShowContinue}
                            />
                            {!isLeft && (
                              <div
                                className={`h-[42px] w-[256px] rounded-tr-[55px] border-t border-r ${
                                  task.completed
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
            </section>
            {reactCourseData.courseModules[1] && (
              <div className="w-full flex items-center justify-center">
                <section className="flex items-center justify-center p-8 border border-[#25252A] rounded-[20px] flex-col space-y-3 max-w-[384px] w-full">
                  <p className="text-sm">Seção 2</p>
                  <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                    {reactCourseData.courseModules[1].moduleName}
                  </span>
                  <PrimaryButton>
                    Pular sessão <FastForward size={32} weight="fill" />
                  </PrimaryButton>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

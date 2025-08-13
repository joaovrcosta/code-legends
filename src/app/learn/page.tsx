"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import DividerWithText from "@/components/divider-with-text";
import { FastForward } from "@phosphor-icons/react/dist/ssr";
import { reactCourseData } from "../../../db";
import { TaskPopover } from "@/components/learn/task-popover";

export default function LearnPage() {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState<boolean>(true);
  const taskRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const togglePopover = (id: number) => {
    setOpenPopover((prev) => (prev === id ? null : id));
  };

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
                    SEÇÃO 1, AULA 3
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  {/* <div className="border p-3 rounded-[20px] border-[#25252A] hover:bg-[#25252A] cursor-pointer hidden lg:block">
                    <Image src={reactImg} alt="" height={36} width={36} />
                  </div> */}
                  <div>
                    <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                      ReactJS
                    </span>
                    <p className="text-xl">CSS Modules</p>
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

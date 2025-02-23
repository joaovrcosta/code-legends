"use client";

import { ArrowLeft, ChevronRight, CirclePlay, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import completeTaskRight from "../../../public/complete-task-right.svg";
import completeTaskLeft from "../../../public/complete-task-left.svg";
import incompleteTaskLeft from "../../../public/incomplete-task-left.svg";
import incompleteTaskRight from "../../../public/incomplete-task-right.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function LearnPage() {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const toggleTooltip = (id: string) => {
    setOpenTooltip((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full space-y-4">
          <div className=" w-full lg:py-10 py-0 rounded-2xl flex items-center justify-center flex-col">
            <section className="bg-gray-gradient border border-[#25252A] p-8 px-4 py-4 flex items-center rounded-lg w-full max-w-[713px] justify-between">
              <div className="flex flex-col lg:ml-4">
                <Link href="/learn/courses">
                  <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
                    <ArrowLeft size={16} className="text-[#7e7e89]" />
                    SEÇÃO 1, AULA 14
                  </div>
                </Link>
                <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent ext-sm">
                  ReactJS
                </span>
                <p className="text-xl">Fundamentos do ReactJS</p>
              </div>
              <div>
                <ChevronRight size={48} />
              </div>
            </section>
            <section className="mt-10 space-y-10 px-4">
              <div className="flex items-center justify-between mt-4">
                <div className="h-[56px] w-[256px] rounded-tl-[55px] border-t border-l"></div>
                <TooltipProvider>
                  <Tooltip open={openTooltip === "completeTaskRight"}>
                    <TooltipTrigger asChild>
                      <Image
                        src={completeTaskRight}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => toggleTooltip("completeTaskRight")}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="w-[295px]  bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-4">
                      <div className="mb-3">
                        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                          ReactJS
                        </span>
                        <h3 className="text-xl mt-2">Introdução</h3>
                      </div>
                      <PrimaryButton>
                        Assistir de novo <CirclePlay />
                      </PrimaryButton>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between mt-4">
                <TooltipProvider>
                  <Tooltip open={openTooltip === "completeTaskLeft"}>
                    <TooltipTrigger asChild>
                      <Image
                        src={completeTaskLeft}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => toggleTooltip("completeTaskLeft")}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="w-[295px]  bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-4">
                      <div className="mb-3">
                        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                          ReactJS
                        </span>
                        <h3 className="text-xl mt-2">Fundamentos do ReactJS</h3>
                      </div>
                      <PrimaryButton>
                        Assistir de novo <CirclePlay />
                      </PrimaryButton>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="h-[56px] w-[256px] rounded-tr-[55px] border-t border-r"></div>
              </div>
              <div className="flex items-center justify-between mt-4 space-x-2">
                <div className="h-[56px] w-[256px] rounded-tl-[55px] border-t border-l"></div>
                <TooltipProvider>
                  <Tooltip open={openTooltip === "incompleteTaskLeft"}>
                    <TooltipTrigger asChild>
                      <Image
                        src={incompleteTaskLeft}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => toggleTooltip("incompleteTaskLeft")}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="w-[295px]  bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-4">
                      <div className="mb-3">
                        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                          ReactJS
                        </span>
                        <h3 className="text-xl mt-2">Bundlers & Compilers</h3>
                      </div>
                      <PrimaryButton>
                        Assistir <CirclePlay />
                      </PrimaryButton>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between mt-4 space-x-3">
                <TooltipProvider>
                  <Tooltip open={openTooltip === "incompleteTaskRight"}>
                    <TooltipTrigger asChild>
                      <Image
                        src={incompleteTaskRight}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => toggleTooltip("incompleteTaskRight")}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="w-[295px]  bg-[#1a1a1e] rounded-[20px] mb-4 border border-[#25252A] shadow-lg p-4">
                      <div className="mb-3">
                        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                          ReactJS
                        </span>
                        <h3 className="text-xl mt-2">
                          Criando um projeto React
                        </h3>
                      </div>
                      <PrimaryButton disabled>
                        Confidencial <Lock />
                      </PrimaryButton>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="h-[56px] w-[256px] rounded-tr-[55px] border-t border-r"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

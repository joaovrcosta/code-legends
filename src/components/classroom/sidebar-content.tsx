"use client";

import Link from "next/link";
import { CheckCircle, Brain, Article } from "@phosphor-icons/react";
import { Lock } from "lucide-react";
import { Circle, House } from "@phosphor-icons/react/dist/ssr";
import useClassroomSidebarStore from "@/stores/classroom-sidebar";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SidebarContentProps } from "@/types/course-types";

export default function SidebarContent({ course }: SidebarContentProps) {
  const pathName = usePathname();
  const { isOpen } = useClassroomSidebarStore();

  return (
    <aside
      className={`flex flex-col bg-[#121214] border-r-[1px] border-[#25252A] text-white transition-all duration-300 ease-in-out h-screen ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      {isOpen && (
        <>
          <div className="px-4 pb-2 bg-[#121214] z-10 shadow-lg flex items-center space-x-1 border-b border-[#25252A]">
            <div className="flex items-center space-x-1 w-full justify-start">
              {/* <Path size={28} weight="fill" className="text-[#00C8FF]" /> */}
              <span className="font-semibold bg-blue-gradient-500 bg-clip-text text-transparent italic tracking-[3px] mt-3">
                TRILHA
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {/* <Link
                href="/courses/react-js"
                className="hover:bg-[#252931] px-2 pt-4 pb-2 rounded-br-3xl rounded-bl-3xl hover:text-[#00C8FF] text-[#666c6f]"
              >
                <ArrowUp
                  size={28}
                  className="transition-transform transform hover:-rotate-45"
                />
              </Link> */}
              <Link
                href="/learn"
                className="hover:bg-[#252931] px-2 pt-4 pb-2 rounded-br-3xl rounded-bl-3xl hover:text-[#00C8FF] text-[#666c6f]"
              >
                <House size={28} />
              </Link>
            </div>
          </div>
          <nav className="flex-1">
            <ul className="">
              {course.modules.map((module) => (
                <li key={module.name}>
                  <div className="p-4 border-b border-[#25252A] shadow-xl">
                    <span className="text-xs text-[#666c6f]">
                      {module.nivel}
                    </span>
                    <span className="block text-base font-semibold text-[#C4C4CC] whitespace-nowrap">
                      {module.name}
                    </span>
                  </div>

                  <ul>
                    {module.submodules.map((submodule) => (
                      <Accordion
                        key={submodule.name}
                        type="multiple"
                        defaultValue={["1"]}
                      >
                        <AccordionItem
                          value="1"
                          className="border-b border-[#25252A]"
                        >
                          <AccordionTrigger className="px-4 py-2 cursor-pointer">
                            <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-xs whitespace-nowrap">
                              {submodule.name}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="mt-1">
                            <ul>
                              {submodule.tasks.map((task) => {
                                const isActive =
                                  pathName ===
                                    `/classroom/react-js/lessons/${task.slug}` ||
                                  pathName === `${task.url}`;

                                return (
                                  <li key={task.id}>
                                    <Link
                                      href={
                                        task.locked
                                          ? "#"
                                          : task.type === "article"
                                          ? task.url || "#"
                                          : `/classroom/react-js/lessons/${task.slug}`
                                      }
                                      className={`flex items-center h-[52px] px-4 transition-colors hover:bg-zinc-900 ${
                                        isActive
                                          ? "bg-blue-gradient-500 text-white font-semibold"
                                          : task.locked
                                          ? "text-gray-500 cursor-not-allowed"
                                          : "text-[#C4C4CC] bg-[#1A1A1E] hover:bg-[#2E2E32]"
                                      }`}
                                    >
                                      <span className="mr-2">
                                        {task.locked ? (
                                          <Lock size={16} />
                                        ) : task.completed ? (
                                          <CheckCircle
                                            size={16}
                                            weight="fill"
                                            className="text-[#00a277]"
                                          />
                                        ) : task.type === "video" ? (
                                          <Circle size={16} weight="bold" />
                                        ) : task.type === "quiz" ? (
                                          <Brain size={16} weight="fill" />
                                        ) : task.type === "article" ? (
                                          <Article size={16} weight="fill" />
                                        ) : null}
                                      </span>

                                      <div className="flex flex-col">
                                        <span className="text-[12px] text-white font-semibold whitespace-nowrap">
                                          {task.title}
                                        </span>
                                        <span className="text-xs text-[#CCCCCC] whitespace-nowrap">
                                          {task.video_duration}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
}

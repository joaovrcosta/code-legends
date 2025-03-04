"use client";

import { usePathname } from "next/navigation";
import { Lock } from "@phosphor-icons/react";
import Link from "next/link";
import useClassroomSidebarStore from "@/stores/classroom-sidebar";
import { reactCourseData } from "../../../db";
import {
  Brain,
  CheckCircle,
  PuzzlePiece,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";

const ClassroomSidebar = () => {
  const pathName = usePathname();
  const { isOpen } = useClassroomSidebarStore();

  return (
    <section
      className={`flex flex-col bg-[#121214] border-r-[1px] border-[#25252A] text-white py-4 transition-all duration-300 ease-in-out h-screen ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      {isOpen && (
        <>
          <div className="px-4 pb-4 top-0 bg-[#121214] z-10 shadow-lg">
            <span className="font-semibold bg-blue-gradient-500 bg-clip-text text-transparent italic tracking-[3px]">
              TRILHA
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <nav className="w-full">
              <ul className="space-y-4">
                {reactCourseData.courseModules.map((module) => (
                  <li key={module.moduleName}>
                    <div className="p-4 border-b border-t border-[#25252A]">
                      <span className="block text-[14px] font-semibold text-[#C4C4CC] whitespace-nowrap">
                        {module.moduleName}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-2">
                      {module.submodules.map((submodule) => (
                        <li key={submodule.submoduleName}>
                          <div className="p-4">
                            <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-xs">
                              {submodule.submoduleName}
                            </span>
                            <span className="block text-xs text-gray-40 whitespace-nowrap"></span>
                          </div>
                          <ul className="mt-1 space-y-1">
                            {submodule.tasks.map((task) => {
                              const isActive = pathName === task.url;
                              return (
                                <li key={task.id}>
                                  <Link
                                    href={task.locked ? "#" : task.url}
                                    className={`flex items-center h-[52px] px-4 transition-colors hover:bg-zinc-900 ${
                                      isActive
                                        ? "bg-blue-500 text-white font-semibold"
                                        : task.locked
                                        ? "text-gray-500 cursor-not-allowed"
                                        : "text-[#C4C4CC] hover:bg-[#2E2E32]"
                                    }`}
                                  >
                                    <span className="mr-2">
                                      {task.locked ? (
                                        <Lock size={16} weight="bold" />
                                      ) : task.completed ? (
                                        <CheckCircle
                                          size={16}
                                          weight="fill"
                                          className="text-[#00a277]"
                                        />
                                      ) : task.type === "video" ? (
                                        <VideoCamera size={16} weight="fill" />
                                      ) : task.type === "quiz" ? (
                                        <Brain size={16} weight="fill" />
                                      ) : task.type === "project" ? (
                                        <PuzzlePiece size={16} weight="fill" />
                                      ) : null}
                                    </span>
                                    <span className="text-[12px] font-semibold whitespace-nowrap">
                                      {task.title}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </section>
  );
};

export default ClassroomSidebar;

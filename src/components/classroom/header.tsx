"use client";

import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import Link from "next/link";
import { Menu } from "lucide-react";
import useClassroomSidebarStore from "@/stores/classroom-sidebar";
import { SkipBack, SkipForward } from "@phosphor-icons/react/dist/ssr";
import codeLegendsLogoMobile from "../../../public/code-legends-logo-mobile.svg";
import { UserDropdown } from "../user-dropdown";
import { StrikeSection } from "../strike-section";
import { CourseDropdownMenu } from "../learn/course-menu";
import { useActiveCourseStore } from "@/stores/active-course-store";
import { useCourseModalStore } from "@/stores/course-modal-store";
import type { EnrolledCourse, ActiveCourse } from "@/types/user-course.ts";

interface ClassroomHeaderProps {
  initialUserCourses: EnrolledCourse[];
  initialActiveCourse: ActiveCourse | null;
}

export default function ClassroomHeader({
  initialUserCourses,
  initialActiveCourse,
}: ClassroomHeaderProps) {
  const { toggleSidebar } = useClassroomSidebarStore();
  const { activeCourse } = useActiveCourseStore();
  const { currentLesson } = useCourseModalStore();
  
  // Usa o activeCourse do store se disponível, senão usa o inicial
  const currentActiveCourse = activeCourse || initialActiveCourse;
  
  // Constrói o path do curso dinamicamente
  const coursePath = currentActiveCourse?.slug 
    ? `/learn/paths/${currentActiveCourse.slug}` 
    : "/learn/catalog";
  
  // Nome do curso para exibir (fallback para "Curso" se não tiver título)
  const courseName = currentActiveCourse?.title || "Curso";

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <header className="fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-2">
        <ul className="flex justify-between items-center lg:pt-2 pt-0 lg:pb-2 lpb-0 w-full mx-auto px-4">
          <li className="flex items-center lg:space-x-6">
            <button
              onClick={toggleSidebar}
              className="text-white p-1 border border-[#25252a] rounded-lg lg:block hidden hover:bg-[#25252a] transition-all duration-150 ease-in-out"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              {/* <LoggedSheet /> */}

              <div>
                <Link href="/learn">
                  <Image
                    src={codeLegendsLogo}
                    alt="Code Legends"
                    className="lg:block hidden"
                  />
                </Link>
                <Link href="/learn">
                  <Image
                    src={codeLegendsLogoMobile}
                    alt="Code Legends"
                    className="lg:hidden block"
                    height={24}
                    width={24}
                  />
                </Link>
              </div>
            </div>
            {currentActiveCourse && (
              <Link href={coursePath}>
                <div className="border rounded-[8px] border-[#25252a] py-2 lg:block hidden px-3 hover:bg-[#25252a] cursor-pointer transition-all duration-150 ease-in-out">
                  <span className="text-[14px]">{courseName}</span>
                </div>
              </Link>
            )}
            <div className="p-2 lg:flex hidden px-3 space-x-2">
              <SkipBack size={24} />
              <SkipForward size={24} weight="fill" />
            </div>
            <div className="p-2 lg:flex hidden px-3 space-x-2">
              <p className="text-white text-sm truncate max-w-[200px]">
                {currentLesson?.title || "Introdução"}
              </p>
            </div>
          </li>

          <li className="flex lg:space-x-2 space-x-1 items-center ">
            <div className="flex items-center lg:space-x-4 space-x-4">
              <CourseDropdownMenu
                initialUserCourses={initialUserCourses}
                initialActiveCourse={initialActiveCourse}
              />
              <StrikeSection />
              <UserDropdown />
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}

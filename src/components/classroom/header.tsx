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

export default function ClassroomHeader() {
  const { toggleSidebar } = useClassroomSidebarStore();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <header className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-2">
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
            <Link href="/paths/react-js">
              <div className="border rounded-[8px] border-[#25252a] py-2 lg:block hidden px-3 hover:bg-[#25252a] cursor-pointer transition-all duration-150 ease-in-out">
                <span className="text-[14px]">ReactJS</span>
              </div>
            </Link>
            <div className="p-2 lg:flex flex px-3 space-x-2 lg:block hidden">
              <SkipBack size={24} />
              <SkipForward size={24} weight="fill" />
            </div>
            <div className="p-2 lg:flex flex px-3 space-x-2 lg:block hidden">
              <p>Introdução</p>
            </div>
          </li>

          <li className="flex lg:space-x-2 space-x-1 items-center ">
            <div className="flex items-center lg:space-x-4 space-x-4">
              <CourseDropdownMenu />
              <StrikeSection />
              <UserDropdown />
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}

"use client";

import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import codeLegendsLogoMobile from "../../../public/code-legends-logo-mobile.svg";
import Link from "next/link";
import { ListEnd, Menu } from "lucide-react";
import useSidebarStore from "@/stores/sidebarStore";
import { usePathname } from "next/navigation";
import { CourseDropdownMenu } from "./course-menu";
import { UserDropdown } from "../user-dropdown";
import { StrikeSection } from "../strike-section";

export default function LearnHeader() {
  const { toggleSidebar, isOpen } = useSidebarStore();
  const pathName = usePathname();

  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-2 ">
      <ul className="flex justify-between items-center lg:pt-4 pt-0 lg:pb-4 lpb-0 w-full mx-auto px-4">
        <li className="flex items-center lg:space-x-3">
          {!pathName.startsWith("/account") && (
            <button
              onClick={toggleSidebar}
              className="text-white p-1 border border-[#25252a] rounded-lg lg:block hidden hover:bg-[#25252a] transition-all duration-150 ease-in-out"
            >
              {isOpen ? (
                <>
                  <ListEnd size={24} />
                </>
              ) : (
                <>
                  <Menu size={24} />
                </>
              )}
            </button>
          )}

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
        </li>

        <li className="flex space-x-2 items-center ">
          <div className="flex items-center space-x-4">
            <CourseDropdownMenu />
            <StrikeSection />

            {/* <div className="flex items-center space-x-2">
              <Brain size={24} weight="fill" className="text-[#00C8FF]" />
              <span>8</span>
            </div> */}

            <div>
              <UserDropdown />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

"use client";

import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import codeLegendsLogoMobile from "../../../public/code-legends-logo-mobile.svg";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Headset, ListEnd, LogOut, Menu, User } from "lucide-react";
import fireIcon from "../../../public/hot-flame-icon.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useSidebarStore from "@/stores/sidebarStore";
import { usePathname } from "next/navigation";
import { CourseDropdownMenu } from "./course-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function LearnHeader() {
  const { toggleSidebar, isOpen } = useSidebarStore();
  const pathName = usePathname();

  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-4">
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
            {/* <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="bg-gray-gradient-first items-center gap-3 border py-3 px-4 rounded-[12px] border-[#25252A] hover:bg-[#25252A] cursor-pointer hidden lg:flex max-h-[42px]">
                    <Image src={reactImg} alt="" height={20} width={20} />
                    <p>ReactJS</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1A1A1E] border border-[#25252A] rounded-[20px] shadow-lg">
                  <CourseMenu />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="flex items-center space-x-3 border py-2 px-3 border-[#25252A] hover:bg-[#25252A] rounded-[20px]">
                    <Image
                      src={fireIcon}
                      alt=""
                      height={20}
                      width={20}
                      className="h-4 w-4"
                    />
                    <span className="text-base">21</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] bg-[#1A1A1E] border border-[#25252A] rounded-[20px] shadow-lg p-4 text-sm">
                  <p>
                    Seu{" "}
                    <span className="font-bold bg-yellow-lightning-500 bg-clip-text text-transparent">
                      STREAK
                    </span>
                    ele representa quantos dias seguidos você se dedicou dentro
                    da plataforma estudando, e se tornando uma{" "}
                    <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                      lenda
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* <div className="flex items-center space-x-2">
              <Brain size={24} weight="fill" className="text-[#00C8FF]" />
              <span>8</span>
            </div> */}

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-[42px] w-[42px]">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side="bottom"
                  className="
                   w-screen 
                   max-w-none 
                   left-0 
                   right-0 
                   rounded-none 
                   border-none 
                   bg-[#1A1A1E] 
                   shadow-2xl 
                   z-50
                   mt-3
               
                   sm:w-auto 
                   sm:max-w-sm 
                   sm:rounded-[20px] 
                   sm:border 
                   sm:border-[#25252A] 
                   sm:left-auto 
                   sm:right-auto
                 "
                >
                  <DropdownMenuLabel className="p-4">
                    <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                      Minha Conta
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border border-[#25252A]" />
                  <DropdownMenuItem
                    asChild
                    className="px-6 py-4 lg:w-[352px] w-full text-white border-none rounded-[20px]"
                  >
                    <Link
                      href="/account"
                      className="flex items-center space-x-2"
                    >
                      <User className="text-[#00C8FF]" />
                      <span>Minha conta</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="px-6 py-4  lg:w-[352px] w-full text-white border-none rounded-[20px]"
                  >
                    <Link
                      href="/account"
                      className="flex items-center space-x-2"
                    >
                      <Headset className="text-[#00C8FF]" />
                      <span>Suporte</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="px-6 py-4  lg:w-[352px] w-full text-white border-none rounded-[20px]"
                  >
                    <Link
                      href="/logout"
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="text-[#fe6e78]" />
                      <span className="text-[#fe6e78]">Sair da conta</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

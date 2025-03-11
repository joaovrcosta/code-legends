"use client";

import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Headset, LogOut, Menu, User } from "lucide-react";
import fireIcon from "../../../public/hot-flame-icon.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useClassroomSidebarStore from "@/stores/classroom-sidebar";
import { SkipBack, SkipForward } from "@phosphor-icons/react/dist/ssr";

export default function ClassroomHeader() {
  const { toggleSidebar } = useClassroomSidebarStore();

  return (
    <header className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-4">
      <ul className="flex justify-between items-center lg:pt-4 pt-0 lg:pb-4 lpb-0 w-full mx-auto px-4">
        <li className="flex items-center lg:space-x-6">
          <button
            onClick={toggleSidebar}
            className="text-white p-1 border border-[#25252a] rounded-lg lg:block hidden hover:bg-[#25252a] transition-all duration-150 ease-in-out"
          >
            <Menu size={24} />
          </button>
          <div className="">
            <Link href="/learn">
              <Image src={codeLegendsLogo} alt="Code Legends" />
            </Link>
          </div>
          <Link href="/courses/react-js">
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

        <li className="flex space-x-2 items-center ">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center space-x-3 border border-[#25252a] py-2 px-4 rounded-[8px] hover:bg-[#25252a] transition-all duration-150 ease-in-out">
                    <Image
                      src={fireIcon}
                      alt=""
                      height={28}
                      width={28}
                      className="h-5 w-5"
                    />
                    <span>21</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
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
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border border-[#25252A] h-[42px] rounded-full"
                  >
                    <User className="text-[#00C8FF]" />
                    <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                      João
                    </span>
                    <ChevronDown className="text-[#00C8FF]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1A1A1E] border border-[#25252A] rounded-[20px] shadow-lg"
                >
                  <DropdownMenuItem
                    asChild
                    className="px-6 py-4 w-[352px] text-white border-none rounded-[20px]"
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
                    className="px-6 py-4 w-[352px] text-white border-none rounded-[20px]"
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
                    className="px-6 py-4 w-[352px] text-white border-none rounded-[20px]"
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
    </header>
  );
}

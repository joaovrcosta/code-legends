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
import useSidebarStore from "@/stores/sidebarStore";

export default function LearnHeader() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] shadow-lg border-b-[1px] border-[#25252a] lg:py-0 py-4">
      <ul className="flex justify-between items-center lg:pt-4 pt-0 lg:pb-4 lpb-0 w-full mx-auto px-4">
        <li className="flex items-center lg:space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-white p-1 border border-[#25252a] rounded-lg lg:block hidden hover:bg-[#25252a] transition-all duration-150 ease-in-out"
          >
            <Menu size={24} />
          </button>
          <div className="lg:flex hidden">
            <Link href="/learn">
              <Image src={codeLegendsLogo} alt="Code Legends" />
            </Link>
          </div>

          <div className="lg:hidden block">
            <Link href="/learn">
              <Image
                src={codeLegendsLogo}
                alt="Code Legends"
                // className="h-8 w-8"
              />
            </Link>
          </div>
        </li>

        <li className="flex space-x-2 items-center ">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={fireIcon}
                      alt=""
                      height={32}
                      width={32}
                      className="h-6 w-6"
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

            {/* <div className="flex items-center space-x-2">
              <Brain size={24} weight="fill" className="text-[#00C8FF]" />
              <span>8</span>
            </div> */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border border-[#25252A] h-[42px] rounded-full"
                  >
                    <User className="text-[#00C8FF]" />
                    <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                      João Victor
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
    </div>
  );
}

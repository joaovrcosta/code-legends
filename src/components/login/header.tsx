import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { ChevronRight, User, Menu } from "lucide-react";
import circleIcon from "../../../public/circle.svg";
import { PrimaryButton } from "../ui/primary-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function HeaderLogin() {
  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214] p-4">
      <div className="relative max-w-[1200px] mx-auto flex justify-between items-center px-4 md:px-0 md:py-2">
        <Link href="/">
          <Image src={codeLegendsLogo} alt="Code Legends" />
        </Link>

        {/* Menu Hamburger para telas menores */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={28} color="#c4c4cc" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#121214] p-4">
              <div className="flex flex-col space-y-4">
                <a
                  href=""
                  className="text-[#c4c4cc] p-2 hover:bg-[#202024] rounded-lg"
                >
                  Conteúdos gratuitos
                </a>
                <a
                  href=""
                  className="text-[#c4c4cc] p-2 hover:bg-[#202024] rounded-lg"
                >
                  Cursos
                </a>
                <a
                  href=""
                  className="text-[#c4c4cc] p-2 hover:bg-[#202024] rounded-lg"
                >
                  Contato
                </a>
                <hr className="border-[#29292e]" />
                <a
                  href=""
                  className="text-[#c4c4cc] p-2 hover:bg-[#202024] rounded-lg flex items-center space-x-2"
                >
                  <User size={20} />
                  <span>LOGIN</span>
                </a>
                <PrimaryButton>
                  INSCREVA-SE
                  <ChevronRight />
                </PrimaryButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Menu para telas maiores */}
        <ul className="hidden md:flex xl:space-x-12 space-x-2 items-center">
          <ul className="flex xl:space-x-8  space-x-2 items-center">
            <li className="flex hidden xl:block">
              <a
                href=""
                className="relative p-3 flex space-x-2 rounded-xl px-8 hover:text-white group"
              >
                <span className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r from-[#00c8ff] via-[rgb(0 78 99)] to-blue-500"></span>
                <Image src={circleIcon} alt="" />
                <span className="text-sm text-[#c4c4cc]">
                  Conteúdos gratuitos
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="relative p-3 flex space-x-2 rounded-xl px-8 hover:text-white group"
              >
                <span className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r from-[#00c8ff] via-[rgb(0 78 99)] to-blue-500"></span>
                <span className="text-sm text-[#c4c4cc]">Cursos</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="relative p-3 flex space-x-2 rounded-xl px-8 hover:text-white group"
              >
                <span className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r from-[#00c8ff] via-[rgb(0 78 99)] to-blue-500"></span>
                <span className="text-sm text-[#c4c4cc]">Contato</span>
              </a>
            </li>
            <li className="block xl:hidden">
              <a
                href=""
                className="relative p-3 flex space-x-2 rounded-xl px-8 hover:text-white group"
              >
                <span className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-gradient-to-r from-[#00c8ff] via-[rgb(0 78 99)] to-blue-500"></span>
                <span className="text-sm text-[#c4c4cc]">Login</span>
              </a>
            </li>
          </ul>
          <ul className="flex items-center space-x-4 border-l-2 border-[#29292e]">
            <li className="ml-4 hidden xl:block">
              <a
                href=""
                className="p-3 flex space-x-2 text-[#c4c4cc] px-8 hover:bg-[#202024] rounded-xl hover:text-white"
              >
                <User size={20} />
                <span className="text-sm font-semibold">LOGIN</span>
              </a>
            </li>
            <li>
              <PrimaryButton>
                INSCREVA-SE
                <ChevronRight />
              </PrimaryButton>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

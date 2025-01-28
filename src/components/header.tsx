import Image from "next/image";
import codeLegendsLogo from "../../public/code-legends-logo.svg";
import { ChevronRight, User } from "lucide-react";
import circleIcon from "../../public/circle.svg";

export default function Header() {
  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214]">
      <ul className="flex justify-between items-center py-6 px-16">
        <li>
          <Image src={codeLegendsLogo} alt="Code Legends" />
        </li>
        <li className="flex space-x-12 items-center">
          <ul className="flex space-x-24 items-center">
            <li className="flex">
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
          </ul>
          <ul className="flex items-center space-x-4 border-l-2 border-[#29292e]">
            <li className="ml-4">
              <a
                href=""
                className="p-3 flex space-x-2 text-[#c4c4cc] px-8 hover:bg-[#202024] rounded-xl hover:text-white"
              >
                <User size={20} />
                <span className="text-sm ">LOGIN</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="p-3 px-9 flex bg-blue-gradient rounded-full border border-[#25252A] items-center space-x-2"
              >
                <span className="font-semibold text-sm">INSCREVA-SE</span>
                <ChevronRight />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

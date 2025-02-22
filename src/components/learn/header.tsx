import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { SheetHeader } from "./sheet-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

export default function LearnHeader() {
  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214]">
      <ul className="flex justify-between items-center lg:pt-8 pt-4 pb-1 max-w-[1560px] mx-auto px-4">
        <li className="flex space-x-3">
          <SheetHeader />
          <Link href="/learn">
            <Image src={codeLegendsLogo} alt="Code Legends" />
          </Link>
        </li>
        <li className="flex space-x-2 items-center hidden lg:block">
          <Link href="/account" className="border px-2 py-2 border-none">
            Suporte
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border border-[#25252A] h-[42px]"
              >
                <User />
                João
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1A1A1E] border border-[#25252A] rounded-[20px]"
            >
              <DropdownMenuItem
                asChild
                className="px-6 py-4 w-[352px] text-white border-none rounded-[20px] hover:bg-zinc-800"
              >
                <div className="flex">
                  <User />
                  <Link href="/profile">Perfil</Link>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="px-6 py-4 w-[352px] text-white  border-none rounded-[20px] hover:bg-zinc-800"
              >
                <div>
                  <Settings />
                  <Link href="/settings">Configurações</Link>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="px-6 py-4 w-[352px] text-white border-none rounded-[20px] hover:bg-zinc-800"
              >
                <div className="flex">
                  <LogOut className="text-[#fe6e78]" />
                  <Link href="/logout" className="text-[#fe6e78]">
                    Sair da conta
                  </Link>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  );
}

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Headset, LogOut, User, Zap } from "lucide-react";
import { logout } from "@/actions/auth";

export function UserDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-[#25252A] p-1 rounded-full cursor-pointer">
            <Avatar className="h-[38px] w-[38px]">
              <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
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
                   mt-1
               
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
            <div className="flex items-center justify-between">
              <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                Minha Conta
              </span>
              <div className="flex border border-[#25252A] py-2 px-4 rounded-[20px] items-center gap-3 text-[#8234E9] hover:bg-[#25252A] cursor-pointer">
                <Zap />
                <span className="bg-purple-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                  Premium
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border border-[#25252A]" />
          <DropdownMenuItem
            asChild
            className="px-6 py-4 lg:w-[352px] w-full text-white border-none rounded-[20px]"
          >
            <Link href="/account" className="flex items-center space-x-2">
              <User className="text-[#00C8FF]" />
              <span>Minha conta</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="px-6 py-4  lg:w-[352px] w-full text-white border-none rounded-[20px]"
          >
            <Link href="/account" className="flex items-center space-x-2">
              <Headset className="text-[#00C8FF]" />
              <span>Suporte</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="px-6 py-4  lg:w-[352px] w-full text-white border-none rounded-[20px] cursor-pointer"
            onClick={() => logout()}
          >
            <div className="flex items-center space-x-2">
              <LogOut className="text-[#fe6e78]" />
              <span className="text-[#fe6e78]">Sair da conta</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

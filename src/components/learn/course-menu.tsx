"use client";

import Image from "next/image";
import reactImg from "../../../public/react-icon-course.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import reactImgIcon from "../../../public/react-course-icon.svg";
import tailwindIcon from "../../../public/tailwind-course-icon.svg";
import patternsIcons from "../../../public/pattern-icon.png";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CourseDropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="bg-gray-gradient-first items-center gap-3 border py-3 px-4 rounded-[12px] border-[#25252A] hover:bg-[#25252A] cursor-pointer flex max-h-[42px]">
          <Image src={reactImg} alt="" height={20} width={20} />
          <p className="lg:block hidden">ReactJS</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        side="bottom"
        className="w-screen max-w-none left-0 right-0 border-none bg-[#1A1A1E] shadow-2xl z-50 mt-3 p-0
                  sm:w-auto sm:max-w-sm sm:rounded-[20px] sm:border sm:border-[#25252A] sm:left-auto sm:right-auto"
      >
        <DropdownMenuLabel className="p-4">
          <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
            Trocar de curso
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="border border-[#25252A]" />

        <DropdownMenuItem
          asChild
          className="pl-2 pr-4 w-full text-white border-none rounded-[20px]"
        >
          <div className="flex items-center gap-3">
            <Image src={reactImgIcon} alt="" width={70} height={70} />
            <span className="text-sm">ReactJS</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="pl-2 pr-4 lg:w-[352px] w-full text-white border-none rounded-[20px]"
        >
          <div className="flex items-center gap-3">
            <Image src={tailwindIcon} alt="" width={70} height={70} />
            <span className="text-sm">Tailwind CSS</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="pl-2 pr-4 w-full text-white border-none rounded-[20px] mb-2"
        >
          <div className="flex items-center gap-3">
            <Image src={patternsIcons} alt="" width={70} height={70} />
            <span className="text-sm">Patterns</span>
          </div>
        </DropdownMenuItem>

        <Link href="/learn/catalog" onClick={() => setOpen(false)}>
          <div className="flex text-white gap-1 items-center justify-center py-3 hover:bg-[#25252A] border-t border-[#25252A] cursor-pointer">
            <Plus />
            Adicionar curso
          </div>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

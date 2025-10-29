"use client";

// import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import icon from "../../../../../public/react-course-icon.svg";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Certificate,
  Files,
  Play,
  PlayCircleIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  PuzzlePiece,
  ThumbsUpIcon,
  TrendUp,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReactJSCourseBanner() {
  const pathName = usePathname();

  return (
    <>
      {/* Sticky Header - appears on scroll */}
      <div className="sticky top-0 z-50 bg-[#151518] border-b border-[#25252A] px-4 py-3 hidden lg:block">
        <div className="flex items-center justify-between">
          <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xl">
            ReactJS
          </span>
          <div className="flex items-center gap-3">
            <Button className="bg-blue-gradient-500 transition-all rounded-[12px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold px-6 py-2 h-[42px]">
              Visitar <PlayIcon weight="fill" />
            </Button>
            <button className="h-[42px] w-[42px] flex items-center justify-center border-[2px] rounded-full border-[#969291] hover:bg-[#424141]">
              <PlusIcon />
            </button>
            <button className="h-[42px] w-[42px] flex items-center justify-center border-[2px] rounded-full border-[#969291] hover:bg-[#424141]">
              <ThumbsUpIcon />
            </button>
          </div>
        </div>
      </div>

      <section className="relative bg-gray-gradient gap-16 border-b border-[#25252A] lg:p-14 px-4 pb-8 pt-4 flex flex-col lg:flex-row items-center">
        {/* Blur gradient overlay - Netflix style */}
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        <div className="flex-col flex-1 relative z-10">
          <div className="w-full lg:hidden block">
            <Link href="/learn/catalog" className="lg:hidden block">
              <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
                <ArrowLeft size={16} className="text-[#7e7e89]" />
                Voltar
              </div>
            </Link>
          </div>
          <Link href="/learn/catalog" className="lg:block hidden">
            <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89] hover:text-[#505055]">
              <ArrowLeft size={16} className="text-[#7e7e89]" />
              Voltar
            </div>
          </Link>
          <div className="lg:block lg:mr-6 mr-0 flex items-center justify-center">
            <Image src={icon} alt="ReactJS" width={120} height={120} />
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col">
              {/* <div
                className="py-1 mb-4 w-full flex lg:items-start items-center lg:justify-start justify-center max-w-[120px]
              "
              >
                <Image src={codeLegendsLogo} alt="Code Legends" />
              </div> */}
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent lg:text-4xl text-xl lg:text-left text-center">
                ReactJS
              </span>
              <p className="lg:text-base text-sm mt-2 text-center lg:text-left max-w-[620px] text-muted-foreground">
                In this React course, you’ll build powerful interactive
                applications with one of the most popular JavaScript libraries.
              </p>
            </div>

            <div className="flex-col items-center gap-4 justify-center pb-6 mt-6 w-full">
              <div className="flex items-center gap-4">
                <Progress value={46} className="w-full bg-[#00C8FF]" />
                <Trophy size={32} weight="fill" className="text-[#25252A]" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-center mt-3">46% completo</p>
                <button className="hover:bg-[#25252A] rounded-lg p-2">
                  Resetar curso
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button className="w-[220px] h-[50px] bg-blue-gradient-500 transition-all rounded-[12px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold">
                Visitar <PlayIcon weight="fill" />
              </Button>
              <button className="h-[50px] w-[50px] flex items-center justify-center border-[2px] rounded-full border-[#969291] hover:bg-[#424141]">
                <PlusIcon />
              </button>
              <button className="h-[50px] w-[50px] flex items-center justify-center border-[2px] rounded-full border-[#969291] hover:bg-[#424141]">
                <ThumbsUpIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          <ul>
            <li className="flex w-full items-center gap-3 py-4 border-b border-[#25252A]">
              <Certificate size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap">
                Ganhe um certificado de conclusão
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <PuzzlePiece size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap">
                <strong>7</strong> Projetos
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <Files size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap">
                <strong>11</strong> Lições
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <TrendUp size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap">Intermediario</p>
            </li>
          </ul>
          <div className="mt-4">
            <p className="text-[12px] text-muted-foreground">INSTRUTOR</p>
            <div className="flex items-center gap-3 mt-4">
              <Avatar className="h-[42px] w-[42px]">
                <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?v=4" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <p>João Victor</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

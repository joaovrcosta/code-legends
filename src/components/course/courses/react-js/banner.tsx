"use client";

// import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import icon from "../../../../../public/react-course-icon.svg";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowClockwise,
  Certificate,
  Files,
  Play,
  PlayCircleIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  PuzzlePiece,
  ThumbsUpIcon,
  ThumbsDown,
  TrendUp,
  Trophy,
  VideoCameraIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  ArrowLeft,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesColumnIncreasingIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ReactJSCourseBanner() {
  const pathName = usePathname();

  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '[class*="overflow-y-auto"]'
    ) as HTMLElement;
    if (!scrollContainer) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowSticky(scrollContainer.scrollTop > 440);
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // initial state

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "sticky lg:top-[0px] top-[-1px] z-50 transition-all shadow-2xl duration-300 border-b border-[#25252A] bg-[#151518] p-3 px-4",
          showSticky
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden p-0"
        )}
      >
        <div className="flex items-center justify-between lg:px-4 px-0">
          <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-xl">
            ReactJS
          </span>
          <div className="flex items-center gap-3">
            <button className="h-[42px] w-[42px] flex items-center justify-center border-[2px] rounded-full border-[#515155] hover:bg-[#424141]">
              <PlusIcon />
            </button>
            <button className="h-[42px] w-[42px] flex items-center justify-center border-[2px] rounded-full border-[#515155] hover:bg-[#424141]">
              <ThumbsUpIcon />
            </button>
            <Button className="bg-blue-gradient-500 transition-all rounded-[12px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold px-6 py-2 h-[42px]">
              <PlayIcon weight="fill" /> Continuar
            </Button>
          </div>
        </div>
      </div>

      <section className="relative bg-gray-gradient lg:gap-20 gap-8 border-b border-[#25252A] lg:py-12 lg:px-12 px-4 pb-8 pt-4 flex flex-col lg:flex-row items-center">
        {/* Blur gradient overlay - Netflix style */}
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        <div className="flex-col flex-1 relative z-10 w-full">
          <div className="w-full lg:hidden block">
            <Link href="/learn/catalog" className="lg:hidden block ">
              <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
                <ArrowLeft size={16} className="text-[#7e7e89]" />
                Voltar
              </div>
            </Link>
          </div>
          <Link
            href="/learn/catalog"
            className="lg:block hidden hover:bg-[#25252A] max-w-[80px] p-1 flex items-start rounded-lg justify-center mb-4 text-[#7e7e89] hover:text-white"
          >
            <div className="flex items-center justify-center gap-3">
              <ArrowLeft size={16} className="" />
              <p className="text-[12px] ">Voltar</p>
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
              <p className="lg:text-base text-sm mt-2 text-center lg:text-left max-w-[620px] text-[#a5a5a6]">
                Neste curso de React, você criará aplicativos interativos
                poderosos com uma das bibliotecas JavaScript mais populares.
              </p>
            </div>

            <div className="flex-col items-center gap-4 justify-center pb-6 mt-6 w-full">
              <div className="flex items-center gap-4">
                <Progress value={46} className="w-full bg-[#25252A] h-[2px]" />
                <p className="text-sm text-center">46%</p>
                <Trophy size={32} weight="fill" className="text-[#25252A]" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div></div>
                <button className="hover:bg-[#25252A] text-[#a5a5a6] rounded-lg p-2 mt-2 flex gap-3 items-center group transition-colors duration-300">
                  <ArrowClockwise
                    size={24}
                    weight="fill"
                    className="text-[#a5a5a6] group-hover:text-[#00C8FF] transition-colors duration-300"
                  />
                  Resetar curso
                </button>
              </div>
            </div>

            <div className="flex items-start lg:justify-start justify-between gap-4 w-full">
              <Button className="max-w-[220px] w-full h-[50px] text-lg bg-blue-gradient-500 transition-all rounded-[12px] duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold">
                <PlayIcon weight="fill" /> Continuar
              </Button>
              <div className="flex gap-4">
                <button className="h-[50px] w-[50px] flex items-center justify-center border-[2px] rounded-full border-[#515155] hover:bg-[#424141]">
                  <PlusIcon className="" />
                </button>
                {/* Dropdown shadcn para reações */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-[50px] w-[50px] flex items-center justify-center border-[2px] rounded-full border-[#515155] hover:bg-[#424141]">
                      <ThumbsUpIcon />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="center"
                    sideOffset={10}
                    className="rounded-full px-2 py-1 bg-[#1e1e22] border border-[#2a2a2f] flex items-center gap-2 shadow-[0_0_16px_#000]"
                  >
                    <DropdownMenuItem className="rounded-full flex items-center justify-center h-[50px] w-[50px] px-2 py-1 hover:bg-[#2a2a2f] text-white">
                      <ThumbsDown className="w-8 h-8" />{" "}
                      {/* ou w-full h-full */}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-full flex items-center justify-center h-[50px] w-[50px] px-2 py-1 hover:bg-[#2a2a2f] text-white">
                      <ThumbsUpIcon className="w-8 h-8" />{" "}
                      {/* ou w-full h-full */}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          <ul>
            <li className="flex w-full items-center gap-3 py-4 border-b border-[#25252A]">
              <Certificate size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap text-[#a5a5a6] text-sm">
                Ganhe um certificado de conclusão
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <PuzzlePiece size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap text-[#a5a5a6] text-sm">
                <strong className="text-[#c0c0d1]">7</strong> Projetos
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <VideoCameraIcon size={24} className="text-[#00C8FF]" />
              <p className="whitespace-nowrap text-[#a5a5a6] text-sm">
                <strong className="text-[#c0c0d1]">+19h</strong> de contéudo
              </p>
            </li>
            <li className="flex w-full items-center gap-3 py-4  border-b border-[#25252A]">
              <ChartNoAxesColumnIncreasingIcon
                size={24}
                className="text-orange-500"
              />
              <p className="whitespace-nowrap text-[#a5a5a6] text-sm font-light">
                INTERMEDIARIO
              </p>
            </li>
          </ul>
          <div className="mt-4 h-full">
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

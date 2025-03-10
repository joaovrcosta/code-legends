"use client";

// import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import icon from "../../../../../public/react-course-icon.svg";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { ArrowLeft } from "lucide-react";

export function ReactJSCourseBanner() {
  const pathName = usePathname();

  return (
    <>
      <section className="bg-gray-gradient border border-[#25252A] lg:p-14 px-4 pb-8 pt-4 flex flex-col lg:flex-row items-center rounded-lg">
        <div className="w-full lg:hidden block">
          <Link href="/learn/catalog" className="lg:hidden block">
            <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
              <ArrowLeft size={16} className="text-[#7e7e89]" />
              Voltar
            </div>
          </Link>
        </div>
        <div className="lg:block lg:mr-6 mr-0">
          <Image src={icon} alt="ReactJS" width={120} height={120} />
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col">
            <Link href="/learn/catalog" className="lg:block hidden">
              <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89] hover:text-[#505055]">
                <ArrowLeft size={16} className="text-[#7e7e89]" />
                Voltar
              </div>
            </Link>
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent lg:text-3xl text-xl lg:text-left text-center">
              ReactJS
            </span>
            <p className="lg:text-base text-sm mt-2 text-center lg:text-left">
              Aprenda os conceitos básicos de desenvolvimento web para criar seu
              próprio site.
            </p>
          </div>

          <Button className="w-full max-w-[220px] h-[46px] bg-blue-gradient-500 mt-4 transition-all duration-300 hover:shadow-[0_0_12px_#00C8FF] font-semibold">
            Continuar curso <Play />
          </Button>
        </div>
      </section>
      <section className="flex items-center justify-between mt-4 mb-4">
        <ul className="flex gap-3 mt-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { href: "/courses/react-js", label: "Contéudo" },
            { href: "/courses/react-js/about", label: "Sobre" },
          ].map(({ href, label }) => (
            <li
              key={href}
              className={`flex items-center justify-center p-3 h-[42px] min-w-[110px] text-lg ${
                pathName === href ? "border-b-[2px] border-[#00C8FF]" : ""
              }`}
            >
              <Link href={href}>
                <p>{label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 md:block hidden w-full max-w-[512px] space-y-2">
          {/* <div className="flex items-center gap-4"> */}
          <Progress value={46} className="h-[24px] bg-[#00C8FF]" />

          {/* <div className="flex items-center justify-center gap-2">
            <Trophy size={24} />
          </div> */}
          <p className="text-sm text-center">46% completo</p>
          {/* </div> */}
        </div>
      </section>
      <div className="flex-col items-center gap-4 md:hidden justify-center pb-6">
        <Progress value={46} className="w-full bg-[#00C8FF]" />
        <p className="text-sm text-center mt-3">46% completo</p>
      </div>
    </>
  );
}

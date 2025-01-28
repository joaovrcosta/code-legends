import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-[1216px]">
        <div className="flex flex-col items-center space-y-8 mt-14">
          <h1 className="text-5xl/[65px] text-center">
            Se especialize como desenvolvedor Front-end e{" "}
            <span className="font-bold bg-blue-gradient-second bg-clip-text text-transparent">
              conquiste vagas nacionais e internacionais
            </span>
          </h1>
          <div className="max-w-[756px] text-center">
            <p>
              A plataforma completa pra você aprender programação do zero no seu
              ritmo, se tornar Full Stack e se especializar em diversas
              tecnologias.
            </p>
          </div>
          <button className="bg-blue-gradient h-[52px] rounded-full border border-[#25252A] text-sm flex items-center justify-center px-6">
            INSCREVA-SE AGORA
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

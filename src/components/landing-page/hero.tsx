// import { ChevronRight } from "lucide-react";
import { PrimaryButton } from "../ui/primary-button";

export default function Hero() {
  return (
    <div className="relative w-full lg:min-h-[80vh] min-h-[90vh] overflow-hidden">
      {/* 🎥 Vídeo de fundo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-25"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/intro-code-legends.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      {/* 📄 Conteúdo centralizado vertical e horizontalmente */}
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="relative flex flex-col items-center text-white text-center space-y-12 z-10 max-w-[1000px] lg:mt-0 mt-12">
          <h1 className="lg:text-6xl/[65px] md:text-5xl text-3xl">
            Impossível não ser{" "}
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
              lendário
            </span>
          </h1>
          <div className="max-w-[756px]">
            <p className="lg:text-xl text-md text-[#c4c4cc]">
              A plataforma completa pra você aprender programação do zero no seu
              ritmo, se tornar Full Stack e se especializar em diversas
              tecnologias.
            </p>
          </div>
          <PrimaryButton
            className="lg:max-w-[240px] h-[52px]"
            variant="callToAction"
          >
            PRÉ-VENDA
            {/* <ChevronRight /> */}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

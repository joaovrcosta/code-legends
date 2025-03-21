import { ChevronRight } from "lucide-react";
import { PrimaryButton } from "../ui/primary-button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center space-y-8 mt-[10vh] w-full">
      <h1 className="text-5xl/[65px] text-center">
        Impossivel não ser{""}
        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
          lendario
        </span>
      </h1>
      <div className="max-w-[756px] text-center">
        <p>
          A plataforma completa pra você aprender programação do zero no seu
          ritmo, se tornar Full Stack e se especializar em diversas tecnologias.
        </p>
      </div>
      <PrimaryButton>
        INSCREVA-SE AGORA
        <ChevronRight />
      </PrimaryButton>
    </section>
  );
}

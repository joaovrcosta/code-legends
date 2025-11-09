"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOnboarding, completeOnboarding } from "@/actions/user";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import codeLogo from "../../../../../public/code-legends-logo.svg";
import {
  ArrowLeft,
  Briefcase,
  Code,
  ComputerTowerIcon,
  PaintBrush,
} from "@phosphor-icons/react/dist/ssr";

const CAREERS = [
  {
    id: "software-engineer",
    label: "Quero ser um software Engineer",
    icon: Code,
    description: "Desenvolva sistemas completos e soluções de software",
  },
  {
    id: "front-end-developer",
    label: "Quero ser um frontend Developer",
    icon: Code,
    description: "Crie interfaces incríveis e experiências de usuário",
  },
  {
    id: "back-end-developer",
    label: "Quero ser um backend Developer",
    icon: Code,
    description: "Construa APIs robustas e arquiteturas de servidor",
  },
  {
    id: "fullstack-developer",
    label: "Quero ser um fullstack Developer",
    icon: Code,
    description: "Domine tanto frontend quanto backend",
  },
  {
    id: "designer",
    label: "Quero ser um designer",
    icon: PaintBrush,
    description: "Designe interfaces e experiências visuais",
  },
  {
    id: "entrepreneur",
    label: "Quero ser um empreendedor",
    icon: Briefcase,
    description: "Construa seu próprio negócio e produtos",
  },
];

export default function CareersPage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!selectedCareer) return;

    try {
      setIsLoading(true);
      setError("");

      // Atualizar a carreira escolhida
      await updateOnboarding({ career: selectedCareer });

      // Completar o onboarding
      await completeOnboarding();

      // Aguardar um pouco para garantir que a API processou a atualização
      // e que o NextAuth tenha tempo de atualizar o token na próxima requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Forçar reload completo para atualizar o token JWT
      // Isso garante que o middleware veja o onboarding como completo
      window.location.href = "/learn";
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao completar onboarding. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 lg:p-20">
      <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] top-0 left-0 rounded-full bg-[#00b3ffa9] opacity-40 blur-[100px] md:blur-[150px] lg:blur-[200px] pointer-events-none" />
      <div className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] top-[10%] left-[20%] md:top-[15%] md:left-[25%] lg:top-[20%] lg:left-[30%] rounded-full bg-[#00b3ff5b] opacity-30 blur-[100px] md:blur-[150px] lg:blur-[200px] pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bottom-0 right-0 rounded-full bg-[#00b3ffb6] opacity-40 blur-[120px] md:blur-[180px] lg:blur-[220px] pointer-events-none" />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-16">
          <Image src={codeLogo} alt="" quality={100} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-sm font-medium">1</span>
          <Progress value={66} className="flex-1" />
          <span className="text-white/60 text-sm">3</span>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        <div className="mb-12">
          <h1 className="text-[24px] lg:text-[28px] font-semibold text-white mb-3">
            Qual sua meta com a programação?
          </h1>
          <p className="text-white/70 text-base">
            Conhecer seu objetivo nos ajuda a guiar melhor sua jornada de
            aprendizado(Não se preocupe, você pode alterar novamente seus
            objetivos)
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
            {error}
          </div>
        )}

        {/* Opções de Metas */}
        <div className="flex-1 space-y-3 mb-8 z-50">
          {CAREERS.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedCareer === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedCareer(goal.id)}
                disabled={isLoading}
                className={`
                      w-full p-2 rounded-full px-4 border transition-all text-left
                      flex items-center gap-4
                      ${
                        isSelected
                          ? "border-[#00C8FF] bg-[#00C8FF]-500/10 shadow-[0_0_12px_#00C8FF]"
                          : "border-[#25252A] bg-[#1A1A1E] hover:border-[#3A3A3F]"
                      }
                      ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    `}
              >
                <div className="p-2">
                  <Icon
                    className={isSelected ? "text-[#00C8FF]" : "text-white"}
                    size={20}
                  />
                </div>
                <span className="text-white text-sm flex-1">{goal.label}</span>
              </button>
            );
          })}
        </div>

        {/* Botões de Navegação */}
        <div className="flex items-center justify-between pt-4 z-50">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#25252A] border border-[#3A3A3F] flex items-center justify-center hover:bg-[#3A3A3F] transition-colors"
            disabled={isLoading}
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          <PrimaryButton
            onClick={handleContinue}
            disabled={!selectedCareer || isLoading}
            className="min-w-[200px] max-w-[200px] z-50"
          >
            {isLoading ? "Salvando..." : "Finalizar"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

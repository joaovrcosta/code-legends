"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOnboarding, completeOnboarding } from "@/actions/user";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ArrowRight, Check } from "lucide-react";

const CAREERS = [
  {
    id: "software-engineer",
    label: "Software Engineer",
    icon: "💻",
    description: "Desenvolva sistemas completos e soluções de software",
  },
  {
    id: "front-end-developer",
    label: "Frontend Developer",
    icon: "🎨",
    description: "Crie interfaces incríveis e experiências de usuário",
  },
  {
    id: "back-end-developer",
    label: "Backend Developer",
    icon: "⚙️",
    description: "Construa APIs robustas e arquiteturas de servidor",
  },
  {
    id: "designer",
    label: "Designer",
    icon: "✨",
    description: "Designe interfaces e experiências visuais",
  },
  {
    id: "fullstack-developer",
    label: "Fullstack Developer",
    icon: "🚀",
    description: "Domine tanto frontend quanto backend",
  },
  {
    id: "entrepreneur",
    label: "Empreendedor",
    icon: "💡",
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
    <div className="min-h-screen relative overflow-hidden bg-[#0D0D12]">
      <div className="absolute w-[400px] h-[400px] top-0 left-0 rounded-full bg-[#00b3ffa9] opacity-40 blur-[200px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] top-[20%] left-[30%] rounded-full bg-[#00b3ff5b] opacity-30 blur-[200px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bottom-0 right-0 rounded-full bg-[#00b3ffb6] opacity-40 blur-[220px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              O que você quer se tornar?
            </h1>
            <p className="text-muted-foreground text-lg">
              Escolha a carreira que você deseja seguir
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAREERS.map((career) => (
              <button
                key={career.id}
                onClick={() => setSelectedCareer(career.id)}
                disabled={isLoading}
                className={`
                  p-6 rounded-[20px] border-2 transition-all text-left
                  ${
                    selectedCareer === career.id
                      ? "border-[#00C8FF] bg-[#00C8FF]/10 shadow-lg shadow-[#00C8FF]/20"
                      : "border-[#25252A] bg-gray-gradient hover:border-[#3A3A3F] hover:bg-gray-gradient-second"
                  }
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{career.icon}</span>
                    <span className="text-white font-semibold text-lg">
                      {career.label}
                    </span>
                    {selectedCareer === career.id && (
                      <Check className="ml-auto text-[#00C8FF]" size={24} />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {career.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <PrimaryButton
              onClick={handleContinue}
              disabled={!selectedCareer || isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? "Criando plano de estudos..." : "Finalizar"}
              {!isLoading && <ArrowRight className="ml-2" size={20} />}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

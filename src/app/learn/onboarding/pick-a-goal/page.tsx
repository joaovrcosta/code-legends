"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOnboarding } from "@/actions/user";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ArrowRight } from "lucide-react";

const GOALS = [
  { id: "change-career", label: "Mudar de Carreira", icon: "🔄" },
  { id: "learn-skill", label: "Aprender uma Nova Habilidade", icon: "📚" },
  { id: "side-project", label: "Construir um Projeto Pessoal", icon: "💻" },
  { id: "get-job", label: "Conseguir um Emprego", icon: "💼" },
  { id: "build-portfolio", label: "Construir um Portfólio", icon: "🎨" },
];

export default function PickAGoalPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!selectedGoal) return;

    try {
      setIsLoading(true);
      setError("");
      await updateOnboarding({ goal: selectedGoal });
      router.push("/learn/onboarding/careers");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao salvar progresso"
      );
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
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              O que você quer construir?
            </h1>
            <p className="text-muted-foreground text-lg">
              Escolha o objetivo que melhor descreve o que você quer alcançar
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                disabled={isLoading}
                className={`
                  p-6 rounded-[20px] border-2 transition-all text-left
                  ${
                    selectedGoal === goal.id
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
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{goal.icon}</span>
                  <span className="text-white font-semibold text-lg">
                    {goal.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <PrimaryButton
              onClick={handleContinue}
              disabled={!selectedGoal || isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? "Salvando..." : "Continuar"}
              {!isLoading && <ArrowRight className="ml-2" size={20} />}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

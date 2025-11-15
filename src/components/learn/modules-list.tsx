"use client";

import { useState } from "react";
import type { ModuleWithProgress } from "@/types/roadmap";
import { PrimaryButton } from "@/components/ui/primary-button";
import { setCurrentModule } from "@/actions/course";
import { Lock } from "@phosphor-icons/react/dist/ssr";

interface ModulesListProps {
  modules: ModuleWithProgress[];
  courseId: string;
  onToggle: () => void;
  onModuleChange?: () => void;
}

export function ModulesList({
  modules,
  courseId,
  onToggle,
  onModuleChange,
}: ModulesListProps) {
  const [loadingModuleId, setLoadingModuleId] = useState<string | null>(null);

  const handleModuleClick = async (module: ModuleWithProgress) => {
    if (module.locked) return;

    setLoadingModuleId(module.id);
    try {
      const result = await setCurrentModule(courseId, module.id);
      if (result.success) {
        onToggle();
        if (onModuleChange) {
          onModuleChange();
        }
      } else {
        console.error("Erro ao atualizar módulo:", result.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar módulo:", error);
    } finally {
      setLoadingModuleId(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center lg:mt-16 mt-2">
      {modules.map((module) => {
        const isLoading = loadingModuleId === module.id;
        return (
          <div
            key={module.id}
            className="w-full max-w-[713px] lg:mb-4 mb-0 px-4 md:pt-2 pt-4 lg:pt-0"
          >
            <section className="bg-gray-gradient border border-[#25252A] px-4 py-4 flex items-center shadow-lg rounded-lg w-full max-w-[713px] justify-between sticky top-0 z-10 bg-[#1a1a1e]">
              <div className="flex flex-col lg:ml-4">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
                      {module.totalLessons}{" "}
                      {module.totalLessons === 1 ? "aula" : "aulas"}
                    </span>
                    <p className="text-xl ">{module.title}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {module.locked ? (
                  <PrimaryButton
                    variant="secondary"
                    className="px-4 h-[40px] w-[140px]"
                    disabled
                  >
                    Bloqueado <Lock size={20} />
                  </PrimaryButton>
                ) : module.isCurrent ? (
                  <PrimaryButton
                    className="px-4 w-[140px] h-[40px]"
                    onClick={() => handleModuleClick(module)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Carregando..." : "Continuar"}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    variant="secondary"
                    className="px-4 h-[40px] w-[140px]"
                    onClick={() => handleModuleClick(module)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Carregando..." : "Revisar"}
                  </PrimaryButton>
                )}
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

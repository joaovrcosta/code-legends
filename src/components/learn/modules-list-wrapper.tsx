"use client";

import { ModulesList } from "@/components/learn/modules-list";
import type { ModuleWithProgress } from "@/types/roadmap";

interface ModulesListWrapperProps {
  modules: ModuleWithProgress[];
  courseId: string;
}

export function ModulesListWrapper({
  modules,
  courseId,
}: ModulesListWrapperProps) {
  const handleToggle = () => {
    // Função vazia, pois nesta página sempre mostramos os módulos
  };

  const handleModuleChange = () => {
    // Função vazia, pois não há necessidade de atualizar roadmap nesta página
  };

  return (
    <ModulesList
      modules={modules}
      courseId={courseId}
      onToggle={handleToggle}
      onModuleChange={handleModuleChange}
    />
  );
}

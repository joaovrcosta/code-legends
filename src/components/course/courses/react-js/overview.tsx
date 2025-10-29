"use client";

import { Card, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export function CourseOverview() {
  const curriculum = [
    {
      id: "1",
      title: "Primeiros passos com React",
      description:
        "Entenda o que é React e configure o ambiente para iniciar seu projeto.",
    },
    {
      id: "2",
      title: "Componentes, props e estado",
      description:
        "Aprenda a criar componentes reutilizáveis, controlar estado e passar props.",
    },
    {
      id: "3",
      title: "Roteamento e requisições",
      description:
        "Implemente rotas e faça requisições HTTP para buscar e enviar dados.",
    },
  ];

  return (
    <Card className="max-w-[802px] p-0 text-white mt-4">
      <CardHeader className="px-4 py-6 border-b border-[#25252A]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Programa de Estudos</h3>
            <p className="text-xs text-muted-foreground">
              {curriculum.length} módulos
            </p>
          </div>
          <button
            type="button"
            className="text-[12px] text-[#7e7e89] hover:text-white"
            onClick={() => {
              const details = document.querySelectorAll<HTMLDivElement>(
                "[data-accordion][data-state]"
              );
              details.forEach((d) => d.click());
            }}
          >
            Expandir todas as seções
          </button>
        </div>
      </CardHeader>

      <Accordion type="multiple" className="divide-y divide-[#25252A]">
        {curriculum.map((section, index) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="px-3 py-4"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left w-full">
                <div className="h-8 w-8 rounded-full bg-[#0F0F10] border border-[#25252A] flex items-center justify-center text-[12px] text-[#C4C4CC]">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {section.title}
                  </p>
                  <p className="text-xs text-[#C4C4CC] line-clamp-1">
                    {section.description}
                  </p>
                </div>
                <CaretDown
                  size={18}
                  className="text-[#7e7e89] data-[state=open]:rotate-180 transition-transform"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pl-14 text-sm text-[#C4C4CC]">
              <ul className="space-y-2">
                <li>- Aula 1 • Introdução e setup</li>
                <li>- Aula 2 • Conceitos base</li>
                <li>- Quiz • Revisão do módulo</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

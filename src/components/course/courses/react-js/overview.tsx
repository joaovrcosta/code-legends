"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";

export function CourseOverview() {
  const [showMore, setShowMore] = useState(false);

  const learningTopics = [
    "JavaScript e ES6+ fundamentals",
    "Componentes funcionais e hooks",
    "Gerenciamento de estado com Context API",
    "Roteamento com React Router",
    "Consumo de APIs REST",
    "Testes com Jest e React Testing Library",
    "Otimização de performance",
    "Deploy de aplicações React",
  ];
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
    <div className="max-w-[802px] space-y-4">
      {/* Section 1: O que você aprenderá */}
      <Card className="p-0 text-white">
        <CardHeader className="px-4 py-6 border-b border-[#25252A]">
          <h3 className="text-lg font-semibold">O que você aprenderá</h3>
        </CardHeader>
        <div className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {(showMore ? learningTopics : learningTopics.slice(0, 4)).map(
              (topic, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check
                    size={20}
                    className="text-[#00C8FF] flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-[#C4C4CC]">{topic}</p>
                </div>
              )
            )}
          </div>
          {learningTopics.length > 4 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-4 text-sm text-[#00C8FF] hover:text-[#00a8d4] flex items-center gap-1"
            >
              {showMore ? "Mostrar menos" : "Mostrar mais"}
              <CaretDown
                size={16}
                className={`transition-transform ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </Card>

      {/* Section 2: Programa de Estudos */}
      <Card className="p-0 text-white">
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
    </div>
  );
}

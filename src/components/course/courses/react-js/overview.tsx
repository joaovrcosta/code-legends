"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CaretDown,
  Check,
  GithubLogo,
  LinkedinLogo,
  Clock,
  VideoCamera,
  GraduationCap,
  Calendar,
  Question,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const [showMoreBio, setShowMoreBio] = useState(false);

  return (
    <div className="max-w-[920px] space-y-4">
      {/* Section 1: O que você aprenderá */}
      <Card className="p-0 text-white bg-gray-gradient rounded-[20px]">
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
      <Card className="p-0 text-white bg-gray-gradient rounded-[20px]">
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

      {/* Section 3: Educador */}
      <Card className="p-0 text-white bg-gray-gradient rounded-[20px]">
        <CardHeader className="px-4 py-6 border-b border-[#25252A]">
          <h3 className="text-lg font-semibold">Educador</h3>
        </CardHeader>
        <div className="px-4 py-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?v=4" />
              <AvatarFallback>JG</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    João Victor
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Software Engineer • TypeScript • ReactJS • NodeJS
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-[36px] w-[36px] flex items-center justify-center rounded-lg border border-[#25252A] hover:bg-[#25252A] transition-colors">
                    <GithubLogo size={20} className="text-[#C4C4CC]" />
                  </button>
                  <button className="h-[36px] w-[36px] flex items-center justify-center rounded-lg border border-[#25252A] hover:bg-[#25252A] transition-colors">
                    <LinkedinLogo size={20} className="text-[#C4C4CC]" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#C4C4CC] leading-relaxed">
                {showMoreBio
                  ? "Sou desenvolvedor web com experiência em JavaScript, TypeScript, Node.js e React.js. Ao longo da minha carreira, colaborei com diversos setores, incluindo agências de publicidade, consultorias, startups e escolas de programação."
                  : "Sou desenvolvedor web com experiência em JavaScript, TypeScript..."}
              </p>
              <button
                onClick={() => setShowMoreBio(!showMoreBio)}
                className="mt-2 text-sm text-[#00C8FF] hover:text-[#00a8d4] flex items-center gap-1"
              >
                {showMoreBio ? "Ler menos" : "Ler mais"}
                <CaretDown
                  size={16}
                  className={`transition-transform ${
                    showMoreBio ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 4: Detalhes */}
      <Card className="p-0 text-white bg-gray-gradient rounded-[20px]">
        <CardHeader className="px-4 py-6 border-b border-[#25252A]">
          <h3 className="text-lg font-semibold">Detalhes</h3>
        </CardHeader>
        <div className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horas de estudo */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#1A1A1E] flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#00C8FF]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-[#C4C4CC]">Horas de estudo</p>
                  <Question size={12} className="text-[#7e7e89] cursor-help" />
                </div>
                <p className="text-base font-semibold text-white">Aprox. 2h</p>
              </div>
            </div>

            {/* Aulas */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#1A1A1E] flex items-center justify-center flex-shrink-0">
                <VideoCamera size={20} className="text-[#00C8FF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#C4C4CC] mb-1">Aulas</p>
                <p className="text-base font-semibold text-white">
                  13 aulas em 1h 14min
                </p>
              </div>
            </div>

            {/* Alunos desta trilha */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#1A1A1E] flex items-center justify-center flex-shrink-0">
                <GraduationCap size={20} className="text-[#00C8FF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#C4C4CC] mb-1">
                  Alunos desta trilha
                </p>
                <p className="text-base font-semibold text-white">1.888</p>
              </div>
            </div>

            {/* Fim do acesso */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#1A1A1E] flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-[#00C8FF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#C4C4CC] mb-1">Fim do acesso</p>
                <p className="text-base font-semibold text-white">03/11/2025</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

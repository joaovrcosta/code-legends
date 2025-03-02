import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  CheckCircle,
  PuzzlePiece,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { Lock, Play } from "lucide-react";
import Link from "next/link";

const courseData = [
  {
    level: "Terra - Nível 1",
    title: "HTML Iniciante",
    infos: ["6 aulas", "2 quizzes", "5h 30m"],
    session: "Sessão 1",
    completed: "0% completo",
    progress: 0,
    locked: false,
    classes: [
      { title: "Introdução ao ReactJS", duration: "00:01:31", complete: false },
      { title: "Fundamentos do JSX", duration: "00:02:15", complete: false },
      {
        title: "Projeto: Animal Fun Facts",
        duration: "",
        isQuiz: false,
        isProject: true,
        complete: false,
      },
      { title: "Componentes e Props", duration: "00:03:00", complete: false },
      {
        title: "Estado e Ciclo de Vida",
        duration: "00:04:00",
        complete: false,
      },
      {
        title: "Quiz - Fundamentos",
        duration: "",
        isQuiz: true,
        complete: false,
      },
      {
        title: "Projeto: Authorization Form",
        duration: "",
        isQuiz: false,
        isProject: true,
        complete: false,
      },
    ],
  },
  {
    level: "Troposfera - Nível 2",
    title: "CSS Iniciante",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 2",
    lessons: "31 aulas",
    completed: "Concluído",
    progress: 0,
    locked: true,
    classes: [
      { title: "Introdução ao Hooks", duration: "00:01:45", complete: true },
      { title: "UseState e UseEffect", duration: "00:02:30", complete: true },
      { title: "Hooks Personalizados", duration: "00:03:15", complete: true },
      { title: "Desempenho e Hooks", duration: "00:03:50", complete: true },
      { title: "Quiz - Hooks", duration: "", isQuiz: true, complete: true },
      {
        title: "Projeto",
        duration: "",
        isQuiz: false,
        isProject: true,
        complete: true,
      },
    ],
  },
  {
    level: "Estratosfera - Nível 3",
    title: "Como Criar Sites no Seu Próprio Computador",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 3",
    lessons: "31 aulas",
    completed: "27% completo",
    progress: 0,
    locked: true,
    classes: [
      { title: "Fundamentos de HTTP", duration: "00:01:30", complete: true },
      {
        title: "Requisições HTTP com Fetch",
        duration: "00:02:00",
        complete: true,
      },
      {
        title: "Melhorando a Performance no React",
        duration: "00:02:45",
        complete: false,
      },
      {
        title: "Lazy Loading e Suspense",
        duration: "00:03:00",
        complete: false,
      },
      { title: "Quiz - HTTP", duration: "N/A", isQuiz: true, complete: false },
      {
        title: "Projeto",
        duration: "N/A",
        isQuiz: false,
        isProject: true,
        complete: false,
      },
    ],
  },
  {
    level: "Mesosfera - Nível 4",
    title: "CSS Intermediário: Cores e Tipografia",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 3",
    lessons: "31 aulas",
    progress: 0,
    locked: true,
    classes: [
      {
        title: "Autenticação no Frontend",
        duration: "00:01:40",
        complete: false,
      },
      {
        title: "Integração com APIs externas",
        duration: "00:02:20",
        complete: false,
      },
      {
        title: "Gerenciamento de Sessões",
        duration: "00:02:50",
        complete: false,
      },
      {
        title: "Deploy de Aplicações React",
        duration: "00:03:30",
        complete: false,
      },
      {
        title: "Quiz - Integração Frontend",
        duration: "N/A",
        isQuiz: true,
        complete: false,
      },
      {
        title: "Projeto",
        duration: "N/A",
        isQuiz: false,
        isProject: true,
        complete: false,
      },
    ],
  },
  {
    level: "Termosfera - Nível 5",
    title: "CSS Intermediário: Layout e Posicionamento",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 3",
    lessons: "31 aulas",
    progress: 0,
    locked: true,
    classes: [
      {
        title: "Introdução ao Framework",
        duration: "00:02:00",
        complete: false,
      },
      {
        title: "Configuração do Ambiente",
        duration: "00:02:40",
        complete: false,
      },
      {
        title: "Estrutura do Framework",
        duration: "00:03:10",
        complete: false,
      },
      {
        title: "Componentes no Framework",
        duration: "00:03:50",
        complete: false,
      },
      {
        title: "Quiz - Framework",
        duration: "N/A",
        isQuiz: true,
        complete: false,
      },
      {
        title: "Projeto",
        duration: "N/A",
        isQuiz: false,
        isProject: false,
        complete: true,
      },
    ],
  },
  {
    level: "Termosfera - Nível 5",
    title: "Design Responsivo e Acessibilidade",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 3",
    lessons: "31 aulas",
    progress: 0,
    locked: true,
    classes: [
      {
        title: "Introdução ao Framework",
        duration: "00:02:00",
        complete: false,
      },
      {
        title: "Configuração do Ambiente",
        duration: "00:02:40",
        complete: false,
      },
      {
        title: "Estrutura do Framework",
        duration: "00:03:10",
        complete: false,
      },
      {
        title: "Componentes no Framework",
        duration: "00:03:50",
        complete: false,
      },
      {
        title: "Quiz - Framework",
        duration: "N/A",
        isQuiz: true,
        complete: false,
      },
      {
        title: "Projeto",
        duration: "N/A",
        isQuiz: false,
        isProject: false,
        complete: true,
      },
    ],
  },
  {
    level: "Termosfera - Nível 5",
    title: "CSS Avançado: Flexbox e CSS Transitions",
    infos: ["6 aulas", "4 quizzes", "5h 30m"],
    session: "Sessão 3",
    lessons: "31 aulas",
    progress: 0,
    locked: true,
    classes: [
      {
        title: "Introdução ao Framework",
        duration: "00:02:00",
        complete: false,
      },
      {
        title: "Configuração do Ambiente",
        duration: "00:02:40",
        complete: false,
      },
      {
        title: "Estrutura do Framework",
        duration: "00:03:10",
        complete: false,
      },
      {
        title: "Componentes no Framework",
        duration: "00:03:50",
        complete: false,
      },
      {
        title: "Quiz - Framework",
        duration: "N/A",
        isQuiz: true,
        complete: false,
      },
      {
        title: "Projeto",
        duration: "N/A",
        isQuiz: false,
        isProject: false,
        complete: true,
      },
    ],
  },
];

export default function ReactJsPage() {
  return (
    <div>
      {courseData.map((course, index) => (
        <section
          key={index}
          className={`mb-4 ${
            course.locked ? "opacity-50 pointer-events-none select-none" : ""
          }`}
        >
          <span
            className={
              course.locked
                ? "text-gray-500"
                : "bg-orange-gradient-500 bg-clip-text text-transparent"
            }
          >
            {course.level}
          </span>

          <Accordion type="single" collapsible>
            <AccordionItem
              value="course"
              className="border border-[#25252A] rounded-3xl p-4 mt-4 gap-4 hover:bg-[#17171a] transition-all ease-in-out duration-150 shadow-lg relative overflow-hidden"
            >
              {/* Barra de progresso inferior */}
              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#25252A] rounded-b-3xl">
                <div
                  className="h-full bg-[#f34200] rounded-b-3xl transition-all ease-in-out duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <AccordionTrigger>
                <div className="flex items-center gap-4 w-full">
                  <Link
                    href="/classroom/react-js/chapter-1"
                    className={`flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] ${
                      course.locked
                        ? "border-gray-600 cursor-not-allowed"
                        : "border-[#f34200] cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-center h-[70px] w-[70px] hover:bg-[#f34200] rounded-full hover:text-[#17171a] transition-all duration-300 hover:shadow-[0_0_12px_#00C8FF]">
                      <Play className={course.locked ? "text-gray-500" : ""} />
                    </div>
                  </Link>
                  <div className="flex flex-col justify-between space-y-4 w-full">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-bold text-2xl ${
                          course.locked
                            ? "text-gray-600"
                            : "bg-orange-gradient-500 bg-clip-text text-transparent text-lg"
                        }`}
                      >
                        {course.title}
                      </span>
                      <div
                        className={`lg:block hidden flex flex-col justify-start items-start ${
                          course.locked ? "text-gray-500" : ""
                        }`}
                      >
                        <div className="flex space-x-2 items-center">
                          {course.infos.map((info, index) => (
                            <div
                              key={index}
                              className="px-2 border border-[#25252A] rounded-lg hover:bg-[#25252A] cursor-pointer"
                            >
                              <p className="text-sm text-[#c4c4cc]">{info}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {course.locked ? (
                        <Lock className="text-gray-500" />
                      ) : course.progress === 100 ? (
                        <>
                          <CheckCircle
                            size={28}
                            weight="fill"
                            className="text-[#00A277]"
                          />
                          <p>Concluido</p>
                        </>
                      ) : (
                        <p>{course.completed}</p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-[#25252A] py-4">
                <div className="flex flex-col gap-2">
                  {course.classes.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center gap-4 p-2 hover:bg-[#25252A] rounded-lg hover:text-[#00C8FF] cursor-pointer"
                    >
                      {lesson.complete ? (
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-[#00C8FF]"
                        />
                      ) : lesson.isQuiz ? (
                        <Brain size={20} />
                      ) : lesson.isProject ? (
                        <PuzzlePiece size={20} />
                      ) : (
                        <VideoCamera size={20} />
                      )}
                      <p>{lesson.title}</p>
                      {lesson.duration && (
                        <p className="text-[#949499]">{lesson.duration}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      ))}
    </div>
  );
}

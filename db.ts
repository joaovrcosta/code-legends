import completeTaskRight from "./public/complete-task-right.svg";
import completeTaskLeft from "./public/complete-task-left.svg";
import incompleteTaskRight from "./public/incomplete-task-right.svg";
import incompleteTaskLeft from "./public/incomplete-task-left.svg";
import quizTest from "./public/question-task-left.svg";
import { StaticImageData } from "next/image";

interface Module {
  moduleName: string;
  submodules: Submodule[];
  level: string;
  locked: boolean;
  tags: string[];
  progress: number;
  completed: boolean;
}

interface Submodule {
  submoduleName: string;
  tasks: Task[];
}

export type Task = {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
  completed: boolean;
  locked?: boolean;
  url?: string;
  type: string;
};

export interface ReactCourse {
  title: string;
  description: string;
  courseModules: Module[];
}

export const reactCourseData: ReactCourse = {
  title: "ReactJS",
  description:
    "Aprenda os conceitos básicos de desenvolvimento web para criar seu próprio site.",

  courseModules: [
    {
      moduleName: "Fundamentos do React",
      level: "Terra - Nível 1",
      locked: false,
      progress: 56,
      tags: ["ReactJS", "Front-end"],
      completed: false,
      submodules: [
        {
          submoduleName: "Iniciando com ReactJS",
          tasks: [
            {
              id: 1,
              title: "Introdução",
              category: "ReactJS",
              image: completeTaskRight,
              type: "video",
              completed: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/introducao",
            },
            {
              id: 2,
              title: "Fundamentos do ReactJS",
              category: "ReactJS",
              image: completeTaskLeft,
              type: "video",
              completed: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/fundamentos-do-react",
            },
            {
              id: 3,
              title: "Bundlers & Compilers",
              category: "ReactJS",
              image: incompleteTaskLeft,
              type: "video",
              completed: false,
              url: "/classroom/reactjs/chapter/iniciando-com-react/bundles-compilers",
            },
            {
              id: 4,
              title: "Criando um projeto React",
              category: "ReactJS",
              image: incompleteTaskRight,
              type: "video",
              completed: false,
              locked: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/criando-projeto-react",
            },
            {
              id: 5,
              title: "Componentes",
              category: "ReactJS",
              image: incompleteTaskLeft,
              type: "video",
              completed: false,
              locked: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/criando-projeto-react",
            },
            {
              id: 6,
              title: "Propriedades",
              category: "ReactJS",
              image: incompleteTaskRight,
              type: "video",
              completed: false,
              locked: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/criando-projeto-react",
            },
            {
              id: 7,
              title: "Colors",
              category: "ReactJS",
              image: incompleteTaskLeft,
              type: "video",
              completed: false,
              locked: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/criando-projeto-react",
            },
            {
              id: 8,
              title: "Quiz - Fundamentos ReactJS",
              category: "ReactJS",
              image: quizTest,
              completed: false,
              type: "quiz",
              locked: true,
              url: "/classroom/reactjs/chapter/iniciando-com-react/criando-projeto-react",
            },
          ],
        },
        {
          submoduleName: "Esrututura da aplicação",
          tasks: [
            {
              id: 9,
              title: "CSS Modules",
              category: "ReactJS",
              image: incompleteTaskRight,
              completed: false,
              type: "video",
              locked: true,
              url: "/learn/catalog",
            },
            {
              id: 10,
              title: "CSS Global",
              category: "ReactJS",
              image: incompleteTaskLeft,
              completed: false,
              type: "video",
              locked: true,
              url: "/learn/catalog",
            },
            {
              id: 11,
              title: "Componentes: Header",
              category: "ReactJS",
              image: incompleteTaskLeft,
              completed: false,
              type: "video",
              locked: true,
              url: "/learn/catalog",
            },
            {
              id: 12,
              title: "Quiz",
              category: "Componentes: Sidebar",
              image: quizTest,
              type: "quiz",
              completed: false,
              locked: true,
              url: "/learn/catalog",
            },
          ],
        },
      ],
    },
    {
      moduleName: "Aprofundando em Hooks",
      level: "Terra - Nível 2",
      locked: true,
      progress: 35,
      tags: ["ReactJS", "Front-end"],
      completed: false,
      submodules: [
        {
          submoduleName: "Desbravando os Hooks",
          tasks: [
            {
              id: 1,
              title: "CSS Modules",
              category: "ReactJS",
              image: completeTaskRight,
              completed: true,
              type: "video",
              url: "/learn/catalog",
            },
            {
              id: 2,
              title: "CSS Global",
              category: "ReactJS",
              image: completeTaskLeft,
              completed: true,
              type: "video",
              url: "/learn/catalog",
            },
            {
              id: 3,
              title: "Componentes: Header",
              category: "ReactJS",
              image: incompleteTaskLeft,
              completed: false,
              type: "video",
              url: "/learn/catalog",
            },
            {
              id: 4,
              title: "Componentes: Sidebar",
              category: "ReactJS",
              image: quizTest,
              type: "quiz",
              completed: false,
              locked: true,
              url: "/learn/catalog",
            },
          ],
        },
      ],
    },
  ],
};

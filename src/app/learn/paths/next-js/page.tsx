import { CircleCheckBig, Lock, Play } from "lucide-react";

// Marcar como dinâmica pois usa cookies() no header
export const dynamic = "force-dynamic";

const courseData = [
  {
    level: "Terra - Nível 1",
    title: "Fundamentos do ReactJS",
    session: "Sessão 1",
    lessons: "31 aulas",
    completed: "Concluído",
    progress: 100,
    locked: false,
  },
  {
    level: "Troposfera - Nível 2",
    title: "Aprofundando com hooks",
    session: "Sessão 1",
    lessons: "31 aulas",
    completed: "Concluído",
    progress: 100,
    locked: false,
  },
  {
    level: "Estratosfera - Nível 3",
    title: "HTTP e Performance",
    session: "Sessão 3",
    lessons: "31 aulas",
    completed: "27% completo",
    progress: 27,
    locked: false,
  },
  {
    level: "Mesosfera - Nível 4",
    title: "Integrando Frontend",
    session: "Sessão 3",
    lessons: "31 aulas",
    locked: true,
  },
  {
    level: "Termosfera - Nível 5",
    title: "Primeiro framework",
    session: "Sessão 3",
    lessons: "31 aulas",
    locked: true,
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
          <span className={course.locked ? "text-gray-500" : ""}>
            {course.level}
          </span>
          <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold text-2xl ${
                    course.locked
                      ? "text-gray-600"
                      : "bg-blue-gradient-500 bg-clip-text text-transparent"
                  }`}
                >
                  {course.title}
                </span>
                <div
                  className={`flex lg:block hidden ${
                    course.locked ? "text-gray-500" : ""
                  }`}
                >
                  <div>
                    <p>{course.session}</p>
                  </div>
                  <div>
                    <p>{course.lessons}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {course.locked ? (
                  <Lock className="text-gray-500" />
                ) : course.progress === 100 ? (
                  <>
                    <CircleCheckBig className="text-[#00A277]" />
                    <p>{course.completed}</p>
                  </>
                ) : (
                  <p>{course.completed}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div
                className={`flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] ${
                  course.locked
                    ? "border-gray-600 cursor-not-allowed"
                    : "border-[#00C8FF] cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-center h-full w-full">
                  <Play className={course.locked ? "text-gray-500" : ""} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

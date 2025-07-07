import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { htmlCourseData } from "@/mocks/htmlCourse";
import {
  Brain,
  CheckCircle,
  // PuzzlePiece,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { Lock, Play } from "lucide-react";
import Link from "next/link";

export default function ReactJsPage() {
  return (
    <div>
      {htmlCourseData.map((course, index) => (
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
                          <p>{course.progress}% Concluido</p>
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
                      className="flex items-center gap-4 p-2 hover:bg-[#25252A] rounded-lg hover:text-[#f34200] cursor-pointer"
                    >
                      {lesson.complete ? (
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="text-[#f34200]"
                        />
                      ) : lesson.isQuiz ? (
                        <Brain size={20} />
                      ) : (
                        // ) : lesson?. ? (
                        //   <PuzzlePiece size={20} />
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

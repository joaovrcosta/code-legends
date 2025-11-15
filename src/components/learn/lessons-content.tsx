"use client";

import { PrimaryButton } from "@/components/ui/primary-button";
import DividerWithText from "@/components/divider-with-text";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import type { RoadmapResponse } from "@/types/roadmap";
import type { ActiveCourse } from "@/types/user-course.ts";
import { LessonPopover } from "@/components/learn/lesson-popover";
import type { Lesson } from "@/types/roadmap";

interface LessonsContentProps {
  roadmap: RoadmapResponse;
  activeCourse: ActiveCourse;
  openPopover: number | null;
  togglePopover: (id: number) => void;
  showContinue: boolean;
  setShowContinue: (show: boolean) => void;
  firstIncompleteLesson: Lesson | undefined;
  allLessons: Lesson[];
  taskRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
}

export function LessonsContent({
  roadmap,
  activeCourse,
  openPopover,
  togglePopover,
  showContinue,
  setShowContinue,
  firstIncompleteLesson,
  allLessons,
  taskRefs,
}: LessonsContentProps) {
  const isLessonCompleted = (status: string) => status === "completed";
  const isLessonLocked = (status: string) => status === "locked";

  return (
    <div className="lg:pb-14 pb-20 w-full lg:mt-0 md:mt-0 mt-40">
      <section className="mt-0 space-y-12 px-4 mb-12">
        {roadmap?.modules?.map((module, moduleIndex) => (
          <div key={module.id}>
            {module?.groups?.map(
              (group, groupIndex) =>
                group?.lessons &&
                group.lessons.length > 0 && (
                  <div
                    key={group.id}
                    className="flex flex-col items-center justify-center"
                  >
                    <DividerWithText text={group.title} />
                    {group.lessons?.map((lesson, lessonIndex) => {
                      const isLeft = lessonIndex % 2 === 0;
                      const completed = isLessonCompleted(lesson.status);
                      const locked = isLessonLocked(lesson.status);
                      // Verifica se é a primeira lição do módulo (primeira do primeiro grupo do módulo)
                      const isFirstInModule =
                        groupIndex === 0 && lessonIndex === 0;

                      return (
                        <div
                          key={lesson.id}
                          className="max-w-[384px]"
                          ref={(el) => {
                            taskRefs.current[lesson.id] = el;
                          }}
                        >
                          <div className="flex items-center justify-center space-x-4 mb-6 pt-7 max-w-[384px]">
                            {isLeft && (
                              <div
                                className={`h-[42px] lg:w-[256px] w-[212px] rounded-tl-[55px] border-t border-l ${
                                  completed
                                    ? "border-[#00C8FF]"
                                    : "border-[#25252A]"
                                }`}
                              ></div>
                            )}
                            <LessonPopover
                              lesson={lesson}
                              openPopover={openPopover}
                              togglePopover={togglePopover}
                              showContinue={
                                showContinue &&
                                firstIncompleteLesson?.id === lesson.id
                              }
                              setShowContinue={setShowContinue}
                              completed={completed}
                              locked={locked}
                              currentCourseSlug={activeCourse.slug}
                              allLessons={allLessons}
                              isFirstInModule={isFirstInModule}
                            />
                            {!isLeft && (
                              <div
                                className={`h-[42px] lg:w-[256px] w-[212px] rounded-tr-[55px] border-t border-r ${
                                  completed
                                    ? "border-[#00C8FF]"
                                    : "border-[#25252A]"
                                }`}
                              ></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
            )}
            {/* Mostra seção bloqueada se o módulo não estiver completo */}
            {roadmap?.modules &&
              moduleIndex < roadmap.modules.length - 1 &&
              !module.isCompleted && (
                <div className="w-full flex items-center justify-center mt-12">
                  <section className="flex items-center justify-center p-8 border border-[#25252A] rounded-[20px] flex-col space-y-3 max-w-[384px] w-full">
                    <p className="text-sm text-center text-muted-foreground">
                      Módulo {roadmap.modules.length}
                    </p>
                    <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-center">
                      {roadmap.modules[moduleIndex + 1]?.title}
                    </span>
                    <PrimaryButton disabled>
                      Módulo bloqueado <Lock />
                    </PrimaryButton>
                  </section>
                </div>
              )}
          </div>
        ))}
      </section>
    </div>
  );
}

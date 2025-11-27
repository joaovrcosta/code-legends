"use client";

import VideoComponent from "@/components/classroom/video";
import { ComponentsArticle } from "@/components/classroom/article/components";
import { LessonHeader } from "@/components/classroom/lesson-header";
import type { Lesson } from "@/types/roadmap";

interface LessonContentProps {
  lesson: Lesson;
  courseTitle?: string;
  moduleTitle?: string;
  groupTitle?: string;
  courseIcon?: string;
}

export function LessonContent({
  lesson,
  courseTitle,
  moduleTitle,
  groupTitle,
  courseIcon,
}: LessonContentProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header do conteúdo - sticky apenas no scroll do container principal */}
      <div className="sticky top-0 z-50 lg:px-4 px-0 lg:pt-2 pt-0">
        <LessonHeader
          courseTitle={courseTitle}
          moduleTitle={moduleTitle}
          groupTitle={groupTitle}
          courseIcon={courseIcon}
        />
      </div>
      
      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto lg:px-4 px-0 min-h-0 pb-[142px] lg:pb-[84px]">
        <div className="p-4">
          {lesson?.type === "video" && (
            <VideoComponent
              description={lesson.description}
              title={lesson.title}
              src={lesson.video_url}
            />
          )}
          {lesson?.type === "article" && <ComponentsArticle />}
          {lesson?.type === "quiz" && <p>Quiz bb</p>}
          {lesson?.type === "project" && <p>Projeto</p>}
        </div>
      </div>
    </div>
  );
}


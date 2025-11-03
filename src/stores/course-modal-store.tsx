// store/courseModalStore.ts
import { create } from "zustand";
import type { Lesson, LessonStatus } from "@/types/roadmap";

interface CourseModalStore {
  isOpen: boolean;
  lessons: Lesson[];
  currentIndex: number;
  openModalWithLessons: (lessons: Lesson[], startIndex?: number) => void;
  closeModal: () => void;
  goToNextLesson: () => void;
  goToPreviousLesson: () => void;
  openModalWithLesson: (lesson: Lesson) => void;
  currentLesson: Lesson | null;
  updateCurrentLessonStatus: (status: LessonStatus) => void;
  lessonCompletedTimestamp: number | null;
}

export const useCourseModalStore = create<CourseModalStore>((set, get) => ({
  isOpen: false,
  lessons: [],
  currentIndex: 0,
  currentLesson: null,
  lessonCompletedTimestamp: null,

  openModalWithLessons: (lessons, startIndex = 0) =>
    set({
      isOpen: true,
      lessons,
      currentIndex: startIndex,
      currentLesson: lessons[startIndex],
    }),

  closeModal: () =>
    set({
      isOpen: false,
      lessons: [],
      currentIndex: 0,
      currentLesson: null,
    }),

  goToNextLesson: () => {
    const { currentIndex, lessons } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < lessons.length) {
      set({
        currentIndex: nextIndex,
        currentLesson: lessons[nextIndex],
      });
    }
  },

  goToPreviousLesson: () => {
    const { currentIndex, lessons } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentLesson: lessons[prevIndex],
      });
    }
  },

  openModalWithLesson: (lesson: Lesson) =>
    set({
      isOpen: true,
      lessons: [lesson],
      currentIndex: 0,
      currentLesson: lesson,
    }),

  updateCurrentLessonStatus: (status: LessonStatus) => {
    const { currentLesson, lessons, currentIndex } = get();
    if (currentLesson) {
      const updatedLesson = { ...currentLesson, status };
      const updatedLessons = [...lessons];
      updatedLessons[currentIndex] = updatedLesson;
      const updates: Partial<CourseModalStore> = {
        currentLesson: updatedLesson,
        lessons: updatedLessons,
      };

      // Se a lição foi marcada como concluída, atualiza o timestamp
      if (status === "completed" && currentLesson.status !== "completed") {
        updates.lessonCompletedTimestamp = Date.now();

        // Desbloqueia a próxima lição se estiver locked
        const nextIndex = currentIndex + 1;
        if (nextIndex < updatedLessons.length) {
          const nextLesson = updatedLessons[nextIndex];
          if (nextLesson.status === "locked") {
            updatedLessons[nextIndex] = { ...nextLesson, status: "unlocked" };
            updates.lessons = updatedLessons;
          }
        }
      }

      set(updates);
    }
  },
}));

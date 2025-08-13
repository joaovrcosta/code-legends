// store/courseModalStore.ts
import { create } from "zustand";
import { Task } from "../../db";

interface CourseModalStore {
  isOpen: boolean;
  tasks: Task[];
  currentIndex: number;
  openModalWithTasks: (tasks: Task[], startIndex?: number) => void;
  closeModal: () => void;
  goToNextTask: () => void;
  goToPreviousTask: () => void;
  openModalWithTask: (task: Task) => void;
  currentTask: Task | null;
}

export const useCourseModalStore = create<CourseModalStore>((set, get) => ({
  isOpen: false,
  tasks: [],
  currentIndex: 0,
  currentTask: null,

  openModalWithTasks: (tasks, startIndex = 0) =>
    set({
      isOpen: true,
      tasks,
      currentIndex: startIndex,
      currentTask: tasks[startIndex],
    }),

  closeModal: () =>
    set({
      isOpen: false,
      tasks: [],
      currentIndex: 0,
      currentTask: null,
    }),

  goToNextTask: () => {
    const { currentIndex, tasks } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < tasks.length) {
      set({
        currentIndex: nextIndex,
        currentTask: tasks[nextIndex],
      });
    }
  },

  goToPreviousTask: () => {
    const { currentIndex, tasks } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentTask: tasks[prevIndex],
      });
    }
  },

  openModalWithTask: (task: Task) =>
    set({
      isOpen: true,
      tasks: [task],
      currentIndex: 0,
      currentTask: task,
    }),
}));

interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  slug: string;
  url: string | null;
  video_url: string | null;
  video_duration: string | null;
  locked: boolean;
  completed: boolean;
  submoduleId: number;
  order: number;
  createdAt: Date;
}

interface Submodule {
  id: number;
  name: string;
  moduleId: number;
  tasks: Task[];
}

interface Module {
  id: number;
  nivel: string;
  name: string;
  courseId: number;
  submodules: Submodule[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  modules: Module[];
}

export interface SidebarContentProps {
  course: Course;
}

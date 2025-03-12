interface Task {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  type: string;
  url: string | null;
  video_url: string | null;
  locked: boolean;
  completed: boolean;
  submoduleId: number;
  video_duration: string | null;
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

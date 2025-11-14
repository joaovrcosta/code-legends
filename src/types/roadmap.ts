export type LessonStatus = "completed" | "unlocked" | "locked";

export type LessonType = "video" | "article" | "quiz" | "project";

export type Lesson = {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: LessonType;
  video_url: string;
  video_duration: string;
  order: number;
  status: LessonStatus;
  isCurrent: boolean;
  canReview: boolean;
};

export type Group = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type Module = {
  id: string;
  title: string;
  slug: string;
  groups: Group[];
  progress: number;
  isCompleted: boolean;
};

export type CourseAuthor = {
  name: string;
  id?: number;
  avatar?: string;
  role?: string;
};

export type CourseRoadmap = {
  id: string;
  title: string;
  slug: string;
  progress: number;
  isCompleted: boolean;
  author?: CourseAuthor;
  currentModule?: number;
  currentClass?: number;
};

export type RoadmapResponse = {
  course: CourseRoadmap;
  modules: Module[];
};

export type ModuleWithProgress = {
  id: string;
  title: string;
  slug: string;
  courseId: string;
  progress: number;
  isCurrent: boolean;
  totalLessons: number;
  completedLessons: number;
  locked: boolean;
};

export type ModulesWithProgressResponse = {
  modules: ModuleWithProgress[];
};

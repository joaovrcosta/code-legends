export type Instructor = {
  id: string;
  name: string;
  avatar: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  releaseAt: string;
  isFree: boolean;
  subscriptions: number;
  level: "beginner" | "intermediate" | "advanced";
  icon: string;
  tags: string[];
  description: string;
  instructorId: string;
  categoryId: string | null;
  instructor: Instructor;
  category: unknown | null;
};

export type FavoriteCourse = {
  id: string;
  userId: string;
  courseId: string;
  createdAt: string;
  course: Course;
};

export type UserCoursesResponse = {
  favoriteCourses: FavoriteCourse[];
};

import { NextCourseBanner } from "@/components/course/courses/next-js/banner";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main className="w-full">
          <NextCourseBanner />
          {children}
        </main>
      </div>
    </>
  );
}

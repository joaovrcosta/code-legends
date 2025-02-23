import { ReactCourseBanner } from "@/components/course/courses/react-js/banner";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main className="w-full">
          <ReactCourseBanner />
          {children}
        </main>
      </div>
    </>
  );
}

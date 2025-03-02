import { HTMLCSSCourseBanner } from "@/components/course/courses/html-css/banner";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main className="w-full">
          <HTMLCSSCourseBanner />
          {children}
        </main>
      </div>
    </>
  );
}

import CourseHeader from "@/components/course/header";
import { FooterFixed } from "@/components/learn/footer-fixed";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CourseHeader />
      <div className="max-w-[1560px] mx-auto flex lg:mt-[6vh] mt-4 gap-10 lg:flex flex-col lg:flex-row px-4 pb-20">
        <main className="w-full">{children}</main>
      </div>
      <FooterFixed />
    </>
  );
}

import CourseHeader from "@/components/course/header";
import { FooterFixed } from "@/components/learn/footer-fixed";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <CourseHeader />
      </div>
      <div className="max-w-[1560px] mx-auto flex lg:mt-[12vh] mt-20 gap-10 lg:flex flex-col lg:flex-row px-4 pb-20">
        <main className="w-full">{children}</main>
      </div>
      <FooterFixed />
    </>
  );
}

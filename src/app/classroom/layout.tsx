// src/layouts/LearnLayout.tsx
import { Content } from "@/components/classroom/content";
import ClassroomHeader from "@/components/classroom/header";
import ClassroomSidebar from "@/components/classroom/sidebar";
import { FooterFixed } from "@/components/learn/footer-fixed";
import { prisma } from "@/lib/prisma";

export default async function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const course = await prisma.course.findUnique({
    where: { slug: "react-js" },
    include: {
      modules: {
        include: {
          submodules: {
            include: {
              tasks: {
                orderBy: {
                  order: "asc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <ClassroomHeader />
      </div>

      <div className="flex flex-1 lg:pt-[74px] pt-[57px]">
        <div className="lg:block hidden max-w-64 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
          <ClassroomSidebar course={course} />
        </div>

        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <main className="w-full">{children}</main>
          <Content course={course} />
          <FooterFixed />
        </div>
      </div>
    </div>
  );
}

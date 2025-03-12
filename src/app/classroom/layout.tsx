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
      <ClassroomHeader />
      <div className="flex flex-1 lg:pt-[74px] pt-[57px]">
        <ClassroomSidebar course={course} />

        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <main className="w-full">{children}</main>
          <Content course={course} />
          <FooterFixed />
        </div>
      </div>
    </div>
  );
}

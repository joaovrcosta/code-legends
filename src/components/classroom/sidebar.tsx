import { prisma } from "@/lib/prisma";
import SidebarContent from "./sidebar-content";

export default async function ClassroomSidebar() {
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
    return <div className="text-white p-4">Curso não encontrado.</div>;
  }

  return (
    <div>
      <SidebarContent course={course} />
    </div>
  );
}

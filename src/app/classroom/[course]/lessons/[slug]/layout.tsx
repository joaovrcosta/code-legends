import { getCourse } from "@/actions/getCourse";
import ClassroomSidebar from "@/components/classroom/sidebar";
import { prisma } from "@/lib/prisma";

interface DashboardProps {
  children: React.ReactNode;
  params: Promise<{ slug: string; course: string }>;
}

export default async function TaskLayout({ children, params }: DashboardProps) {
  const courseData = await getCourse((await params).course);

  const course = await prisma.course.findUnique({
    where: { slug: (await params).course },
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
      <div className="flex flex-1 lg:pt-[62px] pt-[57px]">
        <ClassroomSidebar course={courseData} />
        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <main className="w-full">{children}</main>
          {/* <Content course={course} taskData={taskData} /> */}
        </div>
      </div>
    </div>
  );
}

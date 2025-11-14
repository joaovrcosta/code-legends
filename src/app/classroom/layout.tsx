import ClassroomHeader from "@/components/classroom/header";
import { FooterFixed } from "@/components/learn/footer-fixed";
import { getUserEnrolledList } from "@/actions";
import { getActiveCourse } from "@/actions/user/get-active-course";

interface DashboardProps {
  children: React.ReactNode;
}

export default async function ClassroomLayout({ children }: DashboardProps) {
  // Busca os dados no servidor
  const [enrolledCoursesData, activeCourse] = await Promise.all([
    getUserEnrolledList(),
    getActiveCourse(),
  ]);

  return (
    <div className="h-screen w-full flex flex-col">
      <ClassroomHeader
        initialUserCourses={enrolledCoursesData.userCourses || []}
        initialActiveCourse={activeCourse}
      />
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
        <main className="w-full lg:mb-0 mb-[67px]">{children}</main>
        <FooterFixed />
      </div>
    </div>
  );
}

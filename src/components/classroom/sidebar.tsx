import SidebarContent from "./sidebar-content";
import { SidebarContentProps } from "@/types/course-types";

export default async function ClassroomSidebar({
  course,
}: SidebarContentProps) {
  return (
    <div className="lg:block hidden max-w-64 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
      <SidebarContent course={course} />
    </div>
  );
}

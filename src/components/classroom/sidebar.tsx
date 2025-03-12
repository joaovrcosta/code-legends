import SidebarContent from "./sidebar-content";
import { SidebarContentProps } from "@/types/course-types";

export default async function ClassroomSidebar({
  course,
}: SidebarContentProps) {
  return (
    <div>
      <SidebarContent course={course} />
    </div>
  );
}

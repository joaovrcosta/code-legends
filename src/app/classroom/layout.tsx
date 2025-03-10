// src/layouts/LearnLayout.tsx
import ClassroomHeader from "@/components/classroom/header";
import ClassroomSidebar from "@/components/classroom/sidebar";
import { FooterFixed } from "@/components/learn/footer-fixed";

export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <ClassroomHeader />
      </div>

      <div className="flex flex-1 lg:pt-[74px] pt-[57px]">
        {/* Sidebar agora respeita o topo com a altura do header */}
        <div className="lg:block hidden max-w-64 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
          <ClassroomSidebar />
        </div>

        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <main className="w-full">{children}</main>
          <FooterFixed />
        </div>
      </div>
    </div>
  );
}

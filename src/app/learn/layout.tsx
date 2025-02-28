// src/layouts/LearnLayout.tsx
import { FooterFixed } from "@/components/learn/footer-fixed";
import LearnHeader from "@/components/learn/header";
import Sidebar from "@/components/learn/sidebar";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <LearnHeader />
      </div>

      <div className="flex flex-1 lg:pt-[74px] pt-[64px]">
        <div className="lg:block hidden max-w-64">
          <Sidebar />
        </div>

        <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto pt-0 pl-4 pr-4 pb-4">
          <main className="w-full">{children}</main>
          <FooterFixed />
        </div>
      </div>
    </div>
  );
}

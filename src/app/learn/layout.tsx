import { FooterFixed } from "@/components/learn/footer-fixed";
import LearnHeader from "@/components/learn/header";
import { SkillBoard } from "@/components/learn/skill-board";
import { Tabs } from "@/components/learn/tabs";
import { UseCasesBoard } from "@/components/learn/use-cases-board";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LearnHeader />
      <div className="max-w-[1560px] mx-auto flex flex-col lg:flex-row lg:mt-[6vh] mt-4 gap-4 lg:gap-20 px-4 pb-16">
        <div className="w-full lg:w-1/4 space-y-6">
          <SkillBoard />
          <UseCasesBoard />
        </div>
        <div className="w-full lg:w-3/4 pb-12 lg:pb-0">
          <Tabs />
          <main className="w-full mt-[6vh]">{children}</main>
        </div>
      </div>
      <FooterFixed />
    </>
  );
}

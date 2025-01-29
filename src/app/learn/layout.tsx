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
      <div className="max-w-7xl mx-auto flex mt-[8vh] space-x-2">
        <div className="w-1/4 space-y-6">
          <SkillBoard />
          <UseCasesBoard />
        </div>
        <div className="w-3/4">
          <Tabs />
          <main className="w-full mt-[4vh]">{children}</main>
        </div>
      </div>
    </>
  );
}

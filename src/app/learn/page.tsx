import { SkillBoard } from "@/components/learn/skill-board";
import { Tabs } from "@/components/learn/tabs";
import { UseCasesBoard } from "@/components/learn/use-cases-board";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function LearnPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full">
          <div className="border border-[#25252A] w-full py-8 rounded-2xl flex items-center justify-center">
            <PrimaryButton className="max-w-[400px]">
              Começar um curso
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

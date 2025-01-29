import { PrimaryButton } from "@/components/ui/primary-button";

export default function LearnPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full space-y-4">
          <div className="border border-[#25252A] w-full py-10 rounded-2xl flex items-center justify-center">
            <PrimaryButton className="max-w-[400px]">
              Começar um curso
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

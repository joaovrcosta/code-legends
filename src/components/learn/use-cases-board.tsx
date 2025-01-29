import { Lock } from "lucide-react";
import { PrimaryButton } from "../ui/primary-button";

export function UseCasesBoard() {
  return (
    <div className="border border-[#25252A] rounded-2xl p-4 bg-transparent text-whit">
      <p>Casos de uso</p>
      <div className="w-full space-y-3 mt-4">
        <PrimaryButton
          className="text-sm flex items-center justify-between"
          variant="secondary"
        >
          Clothes E-commerce
          <Lock />
        </PrimaryButton>
        <PrimaryButton
          className="text-sm flex items-center justify-between"
          variant="secondary"
        >
          Gambling Administration <Lock />
        </PrimaryButton>
        <PrimaryButton
          className="text-sm flex items-center justify-between"
          variant="secondary"
        >
          Soundify - Music Stream <Lock />
        </PrimaryButton>
      </div>
    </div>
  );
}

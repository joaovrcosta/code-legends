import { Lock } from "lucide-react";
import { PrimaryButton } from "../ui/primary-button";

export function UseCasesBoard() {
  return (
    <div className="border border-[#25252A] rounded-2xl p-4 bg-transparent text-whit">
      <p>Casos de uso</p>
      <div className="w-full space-y-3 mt-4">
        <PrimaryButton
          className="text-sm flex items-center justify-between text-[#525252] h-[52px] px-3"
          variant="secondary"
        >
          Clothes E-commerce
          <div className="bg-[#3D3D40] h-[32px] w-[32px] flex items-center justify-center rounded-full">
            <Lock className="text-white" />
          </div>
        </PrimaryButton>
        <PrimaryButton
          className="text-sm flex items-center justify-between text-[#525252] h-[52px] px-3"
          variant="secondary"
        >
          Gambling Administration{" "}
          <div className="bg-[#3D3D40] h-[32px] w-[32px] flex items-center justify-center rounded-full">
            <Lock className="text-white" />
          </div>
        </PrimaryButton>
        <PrimaryButton
          className="text-sm flex items-center justify-between text-[#525252] h-[52px] px-3"
          variant="secondary"
        >
          Soundify - Music Stream{" "}
          <div className="bg-[#3D3D40] h-[32px] w-[32px] flex items-center justify-center rounded-full">
            <Lock className="text-white" />
          </div>
        </PrimaryButton>
      </div>
    </div>
  );
}

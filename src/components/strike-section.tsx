import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Flame } from "@phosphor-icons/react/dist/ssr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function StrikeSection() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-3 border py-2 px-3 border-[#25252A] hover:bg-[#25252A] rounded-[20px] hover:border-[#FFB733]">
            <Flame size={24} weight="regular" />
            <span className="text-base text-[#fff]">0</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={8}
          className="
                   w-screen
                   sm:w-full
                   bg-[#1A1A1E] 
                   border-0
                   sm:border
                   border-[#25252A] 
                   rounded-none
                   sm:rounded-[20px] 
                   shadow-2xl 
                   z-50
                 "
        >
          <div className="p-4 text-sm w-full">
            <p>
              <span className="font-bold bg-yellow-lightning-500 bg-clip-text text-transparent">
                STREAK
              </span>
            </p>

            <p className="text-sm text-[#C4C4CC]">
              Assista uma aula para aumentar seu streak
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4 w-full">
              <div className="flex flex-col items-center justify-center border border-[#25252A] rounded-[20px] p-4 min-w-0">
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-[11px] text-[#C4C4CC] text-center">
                  Streak atual
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#25252A] rounded-[20px] p-4 min-w-0">
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-[11px] text-[#C4C4CC] text-center whitespace-nowrap">
                  Melhor streak
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#25252A] rounded-[20px] p-4 min-w-0">
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-[11px] text-[#C4C4CC] text-center">
                  Total de dias
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

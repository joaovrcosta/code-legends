import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import fireIcon from "../../public/hot-flame-icon.svg";

export function StrikeSection() {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <div className="flex items-center space-x-3 border py-2 px-3 border-[#25252A] hover:bg-[#25252A] rounded-[20px] hover:border-[#FFB733]">
              <Image
                src={fireIcon}
                alt=""
                height={20}
                width={20}
                className="h-4 w-4"
              />
              <span className="text-base text-[#FFB733]">21</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px] bg-[#1A1A1E] border border-[#25252A] rounded-[20px] shadow-lg p-4 text-sm">
            <p>
              Seu{" "}
              <span className="font-bold bg-yellow-lightning-500 bg-clip-text text-transparent">
                STREAK
              </span>
              ele representa quantos dias seguidos você se dedicou dentro da
              plataforma estudando, e se tornando uma{" "}
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent">
                lenda
              </span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-course-icon.svg";
import { Play } from "lucide-react";

interface CatalogCardProps {
  name: string;
  image?: string | StaticImageData;
  url: string;
  color: string;
  className?: string;
  isCurrent?: boolean;
  isFavorite?: boolean;
  status?: "in-progress" | "completed" | "not-started" | "career" | "continue";
  progress?: number;
}

export function PersonalCatalog({
  name,
  image,
  url,
  color,
  className,
  isCurrent,
  progress,
}: CatalogCardProps) {
  const imageSrc = image || reactIcon;

  const colorClass =
    {
      white: "text-[#c4c4cc]",
      blue: "bg-blue-gradient-500 bg-clip-text text-transparent",
      "dark-blue": "text-blue-600",
      green: "text-green-400",
      orange: "bg-orange-gradient-500 bg-clip-text text-transparent",
      red: "bg-red-gradient-500 bg-clip-text text-transparent",
      yellow: "text-yellow-400",
      pink: "text-pink-400",
      gray: "text-gray-400",
      lime: "bg-lime-gradient-500 bg-clip-text text-transparent",
      purple: "bg-purple-gradient-500 bg-clip-text text-transparent",
    }[color] || "text-gray-400";

  return (
    <div
      className={`relative w-full lg:max-w-[416px] w-full  rounded-[16px] transition-all duration-300 hover:scale-105 hover:backdrop-blur-lg cursor-pointer
    ${
      isCurrent
        ? "bg-blue-gradient-second border-[#35BED5]"
        : "bg-gray-gradient border-[#25252A]"
    }
    border overflow-hidden ${className}`} // <-- aqui o overflow-hidden
    >
      {/* Conteúdo principal */}
      <div className="p-4 flex items-center">
        <Image src={imageSrc} alt={name} width={80} height={80} />
        <div className="px-4">
          <p className="font-light text-[12px] text-[#C2C2C2]">CURSO – 12h</p>
          <div className="flex items-center space-x-1">
            <span className={`font-bold bg-clip-text text-lg ${colorClass}`}>
              {name}
            </span>
          </div>
          {/* <span className="text-xs">{progress}%</span> */}
        </div>
        <div className="flex items-center justify-end w-full">
          {url && (
            <Link href="/learn">
              <div className="border-2 border-[#35BED5] p-3 flex items-center justify-center hover:bg-[#35BED5] rounded-full cursor-pointer hover:text-[#35BED5]">
                <Play size={24} className="text-white" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {typeof progress === "number" && (
        <div className="w-full h-[4px] bg-[#1f1f1f] rounded-b-[16px] overflow-hidden">
          <div
            className="h-full bg-[#35BED5] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {/* Barra de progresso - Fora do conteúdo com padding */}
    </div>
  );
}

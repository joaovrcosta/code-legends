import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-course-icon.svg";
import { CirclePlay } from "lucide-react";

interface CatalogCardProps {
  name: string;
  image?: string | StaticImageData;
  url: string;
  color: string;
  className?: string;
  isCurrent?: boolean;
  isFavorite?: boolean;
  status?: "in-progress" | "completed" | "not-started" | "career" | "continue";
}

export function PersonalCatalog({
  name,
  image,
  url,
  color,
  className,
  isCurrent,
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
      className={`relative w-full 2xl:w-[312px] rounded-[20px] transition-all duration-300 hover:scale-105 hover:backdrop-blur-lg cursor-pointer
    ${
      isCurrent
        ? "bg-blue-gradient-second border-[#35BED5]"
        : "bg-gray-gradient border-[#25252A]"
    }
    border ${className}`}
    >
      <div className="p-4 flex items-center">
        <Image src={imageSrc} alt={name} width={80} height={80} />
        <div className="px-4">
          <p className="font-light text-[12px] text-[#C2C2C2]">CURSO - 12h</p>
          <div className="flex items-center space-x-1">
            <span className={`font-bold bg-clip-text text-lg ${colorClass}`}>
              {name}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end w-full">
          {url && (
            <Link href="/learn">
              <div className="flex items-center justify-center  hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
                <CirclePlay
                  size={40}
                  className="text-white hover:text-[#35BED5]"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

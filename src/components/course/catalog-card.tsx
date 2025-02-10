import Image from "next/image";
import reactIcon from "../../../public/react-icon.png"; // Imagem padrão
import { CirclePlay, ScrollText, Star } from "lucide-react";

interface CatalogCardProps {
  className?: string;
  name?: string;
  image?: string;
}

export function CatalogCard({ className, name, image }: CatalogCardProps) {
  const imageSrc = image ? image : reactIcon;

  return (
    <div
      className={`w-full h-52 lg:max-w-[316px] bg-[#1A1A1E] border border-[#25252A] pb-6 pt-4 px-4 rounded-[20px] transition-all duration-300 hover:backdrop-blur-lg ${className} hover:bg-[#1A1A1E]/40`}
    >
      <div className="flex items-center justify-end">
        <Star />
      </div>
      <div>
        <Image
          src={imageSrc}
          alt={name || "Curso"}
          width={80}
          height={80}
          className=""
        />
        <div className="px-4">
          <p className="font-light text-[12px] text-[#C2C2C2]">CURSO - 12h</p>
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center justify-center w-8 h-8 hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
          <ScrollText size={20} className="text-[#858585]" />
        </div>
        <div className="flex items-center justify-center w-8 h-8 hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
          <CirclePlay size={28} className="text-white hover:text-[#35BED5]" />
        </div>
      </div>
    </div>
  );
}

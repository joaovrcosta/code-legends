import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-icon.png"; // Imagem padrão
import { ArrowUpRight, CirclePlay, ScrollText, Star } from "lucide-react";

const courses = [
  {
    name: "ReactJS",
    image: reactIcon,
    url: "/courses/react-js",
    color: "blue",
  },
  {
    name: "Tailwind CSS",
    image: "",
    url: "/courses/tailwind-css",
    color: "blue",
  },
  { name: "Patterns", image: "", url: "/courses/patterns", color: "lime" },
  { name: "HTML & CSS", image: "", url: "/courses/html-css", color: "blue" },
  { name: "UI/UX", image: "", url: "/courses/performance", color: "purple" },
  { name: "Inglês", image: "", url: "/courses/english", color: "red" },
  {
    name: "Design System",
    image: "",
    url: "/courses/design-system",
    color: "purple",
  },
  { name: "Clean Code", image: "", url: "/courses/clean-code", color: "blue" },
];

export function Catalog() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-6">
      {courses.map((course, index) => (
        <CatalogCard
          key={index}
          name={course.name}
          image={course.image}
          url={course.url}
          color={course.color || "gray"}
        />
      ))}
    </div>
  );
}

interface CatalogCardProps {
  name: string;
  image?: string | StaticImageData;
  url: string;
  color: string;
}

export function CatalogCard({ name, image, url, color }: CatalogCardProps) {
  const imageSrc = image || reactIcon;

  // Classe de cor dinâmica
  const colorClass =
    {
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
    <div className="w-full h-52 xl:w-[312px] bg-gray-gradient border border-[#25252A] pb-6 pt-4 px-4 rounded-[20px] transition-all duration-300 hover:backdrop-blur-lg hover:bg-[#1A1A1E]/40 cursor-pointer">
      <div className="flex items-center justify-end">
        <Star />
      </div>
      <div>
        <Image src={imageSrc} alt={name} width={80} height={80} />
        <div className="px-4">
          <p className="font-light text-[12px] text-[#C2C2C2]">CURSO - 12h</p>
          <div className="flex items-center space-x-1">
            <span className={`font-bold bg-clip-text text-lg ${colorClass}`}>
              {name}
            </span>
            <ArrowUpRight />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center justify-center w-8 h-8 hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
          <ScrollText size={20} className="text-[#858585]" />
        </div>
        {url && (
          <Link href={url}>
            <div className="flex items-center justify-center w-8 h-8 hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
              <CirclePlay
                size={28}
                className="text-white hover:text-[#35BED5]"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

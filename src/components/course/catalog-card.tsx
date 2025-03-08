import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-course-icon.svg";
import htmlcssIcon from "../../../public/html-course-icon.svg";
import nextjsIcon from "../../../public/nextjs-course-icon.svg";
import tailwindIcon from "../../../public/tailwind-course-icon.svg";
import patternIcon from "../../../public/patterns-course-icon.svg";
import { ArrowUpRight, CirclePlay, ScrollText } from "lucide-react";
import { Star } from "@phosphor-icons/react/dist/ssr";

const courses = [
  {
    name: "ReactJS",
    image: reactIcon,
    url: "/courses/react-js",
    color: "blue",
  },
  {
    name: "NextJS",
    image: nextjsIcon,
    url: "/courses/next-js",
    color: "white",
  },
  {
    name: "Tailwind CSS",
    image: tailwindIcon,
    url: "/courses/next-js",
    color: "blue",
  },
  {
    name: "Patterns",
    image: patternIcon,
    url: "/courses/patterns",
    color: "lime",
  },
  {
    name: "HTML & CSS",
    image: htmlcssIcon,
    url: "/courses/html-css",
    color: "orange",
  },
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
  className?: string;
}

export function CatalogCard({
  name,
  image,
  url,
  color,
  className,
}: CatalogCardProps & { className?: string }) {
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
      className={`relative w-full 2xl:w-[312px] bg-gray-gradient border border-[#25252A] pb-4 pt-4 px-4 rounded-[20px] transition-all duration-300 hover:scale-105 hover:backdrop-blur-lg hover:bg-[#1A1A1E]/40 cursor-pointer ${className}`}
    >
      <div className="flex items-center justify-end">
        <Star size={28} />
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

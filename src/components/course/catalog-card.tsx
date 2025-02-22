import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-icon.png"; // Imagem padrão
import { CirclePlay, ScrollText, Star } from "lucide-react";

const courses = [
  { name: "ReactJS", image: reactIcon, url: "/courses/react-js" },
  { name: "Tailwind CSS Pro", image: "", url: "/courses/tailwind-css" },
  { name: "Patterns", image: "", url: "/courses/patterns" },
  { name: "HTML & CSS", image: "", url: "/courses/html-css" },
  { name: "Perfomance", image: "", url: "/courses/performance" },
  { name: "Inglês", image: "", url: "/courses/english" },
  { name: "Design System", image: "", url: "/courses/design-system" },
  { name: "Clean Code", image: "", url: "/courses/clean-code" },
];

export function Catalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CatalogCard
          key={index}
          name={course.name}
          image={course.image}
          url={course.url}
        />
      ))}
    </div>
  );
}

interface CatalogCardProps {
  name: string;
  image?: string | StaticImageData;
  url: string;
}

export function CatalogCard({ name, image, url }: CatalogCardProps) {
  const imageSrc = image || reactIcon;

  return (
    <div className="w-full h-52 lg:w-[312px] bg-[#1A1A1E] border border-[#25252A] pb-6 pt-4 px-4 rounded-[20px] transition-all duration-300 hover:backdrop-blur-lg hover:bg-[#1A1A1E]/40 cursor-pointer">
      <div className="flex items-center justify-end">
        <Star />
      </div>
      <div>
        <Image src={imageSrc} alt={name} width={80} height={80} />
        <div className="px-4">
          <p className="font-light text-[12px] text-[#C2C2C2]">CURSO - 12h</p>
          <h3 className="font-bold text-lg">{name}</h3>
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

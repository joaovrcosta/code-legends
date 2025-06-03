import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import reactIcon from "../../../public/react-course-icon.svg";
import htmlcssIcon from "../../../public/html-course-icon.svg";
import nextjsIcon from "../../../public/nextjs-course-icon.svg";
import tailwindIcon from "../../../public/tailwind-course-icon.svg";
import patternIcon from "../../../public/patterns-course-icon.svg";
import { ArrowUpRight, CirclePlay, Medal, ScrollText } from "lucide-react";
import { Star } from "@phosphor-icons/react/dist/ssr";

const courses: CatalogCardProps[] = [
  {
    name: "ReactJS",
    image: reactIcon,
    url: "/courses/react-js",
    color: "blue",
    status: "not-started",
  },
  {
    name: "NextJS",
    image: nextjsIcon,
    url: "/courses/next-js",
    color: "white",
    status: "not-started",
  },
  {
    name: "Tailwind CSS",
    image: tailwindIcon,
    url: "/courses/next-js",
    color: "blue",
    status: "completed",
  },
  {
    name: "Patterns",
    image: patternIcon,
    url: "/courses/patterns",
    color: "lime",
    status: "not-started",
  },
  {
    name: "HTML & CSS",
    image: htmlcssIcon,
    url: "/courses/html-css",
    color: "orange",
    status: "not-started",
  },
  {
    name: "UI/UX",
    image: "",
    url: "/courses/performance",
    color: "purple",
    status: "not-started",
  },
  {
    name: "Inglês",
    image: "",
    url: "/courses/english",
    color: "red",
    status: "not-started",
  },
  {
    name: "Design System",
    image: "",
    url: "/courses/design-system",
    color: "purple",
    status: "not-started",
  },
  {
    name: "Clean Code",
    image: "",
    url: "/courses/clean-code",
    color: "blue",
    status: "not-started",
  },
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
          status={course.status}
          isCurrent={course.isCurrent}
        />
      ))}
    </div>
  );
}

function getStatusInfo(status?: CatalogCardProps["status"]) {
  switch (status) {
    case "in-progress":
      return {
        label: "Em progresso...",
        className: "text-[#007e97]",
        icon: (isFavorite?: boolean) => (
          <Star
            size={20}
            weight="fill"
            className={isFavorite ? "text-[#35BED5]" : "text-gray-600"}
          />
        ),
      };
    case "completed":
      return {
        label: "Concluído",
        className: "text-green-600",
        icon: (isFavorite?: boolean) => (
          <Star
            size={20}
            weight="fill"
            className={isFavorite ? "text-[#35BED5]" : "text-gray-600"}
          />
        ),
      };
    case "career":
    case "continue":
      return {
        label: "Curso atual",
        className: "text-white",
        icon: (isFavorite?: boolean) => (
          <Star
            size={20}
            weight="fill"
            className={isFavorite ? "text-[#35BED5]" : "text-gray-600"}
          />
        ),
      };
    case "not-started":
    default:
      return {
        label: "Curso",
        className: "text-gray-500",
        icon: (isFavorite?: boolean) => (
          <Star
            size={20}
            weight="fill"
            className={isFavorite ? "text-[#35BED5]" : "text-gray-600"}
          />
        ),
      };
  }
}

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

export function CatalogCard({
  name,
  image,
  url,
  color,
  status,
  className,
  isCurrent,
  isFavorite,
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

  const { label, className: statusClass, icon } = getStatusInfo(status);
  const iconElement = icon(isFavorite);
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
      {label && (
        <div className="flex items-center justify-between rounded-t-[20px] pr-4 pl-4 pt-4 pb-0">
          <div
            className={`text-white ${statusClass} rounded-full px-2 border ${
              isCurrent ? "border-white" : "border-[#25252A]"
            }`}
          >
            <p className="text-sm">{label}</p>
          </div>
          {iconElement}
        </div>
      )}

      <div className="p-4">
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

      <div className="flex items-center justify-between pr-4 pl-4 pb-4">
        <div className="flex items-center gap-2 px-4">
          <Medal size={16} className="text-gray-600" />
          <p className="text-xs text-gray-600">Com certificado</p>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center w-8 h-8 hover:bg-[#25252A] rounded-full cursor-pointer hover:text-[#35BED5]">
            <Link href={url}>
              <ScrollText size={20} className="text-gray-600" />
            </Link>
          </div>
          {url && (
            <Link href="/learn">
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
    </div>
  );
}

"use client";

import {
  Blocks,
  BookOpenText,
  ChartNetwork,
  House,
  Shield,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "Home",
    path: "/learn",
    icon: <House size={34} strokeWidth={1} />,
  },
  {
    name: "Cursos",
    path: "/learn/courses",
    icon: <BookOpenText size={34} strokeWidth={1} />,
  },
  { name: "HQ", path: "/learn/hq", icon: <Shield size={34} strokeWidth={1} /> },
  {
    name: "Estatisticas",
    path: "/learn/statiscs",
    icon: <ChartNetwork size={34} strokeWidth={1} />,
  },
  {
    name: "Casos de uso",
    path: "/learn/usecases",
    icon: <Blocks size={34} strokeWidth={1} />,
  },
  {
    name: "Insights",
    path: "/learn/insights",
    icon: <Sparkle size={34} strokeWidth={1} />,
  },
];

export function FooterFixed() {
  const pathname = usePathname(); // Obtém a rota atual

  return (
    <footer className="w-full bg-[#121214] border-t-[1px] border-[#25252a] text-white text-center p-4 fixed bottom-0 left-0 lg:hidden">
      <ul className="flex justify-around">
        {links.map((link, index) => {
          const isActive = pathname === link.path; // Verifica se o link está ativo

          return (
            <li key={index}>
              <Link href={link.path} className="flex flex-col items-center">
                {React.cloneElement(link.icon, {
                  color: isActive ? "#008ab0" : "white", // Altera a cor se for ativo
                })}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

"use client";

import {
  BookOpenText,
  ChartDonut,
  House,
  Lego,
  Shield,
  Sparkle,
  Sticker,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type LinkItem = {
  name: string;
  path: string;
  icon: (isActive: boolean) => ReactNode;
};

const links: LinkItem[] = [
  {
    name: "Home",
    path: "/learn",
    icon: (isActive) => (
      <House
        size={34}
        strokeWidth={1}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
  {
    name: "Cursos",
    path: "/learn/catalog",
    icon: (isActive) => (
      <BookOpenText
        size={34}
        strokeWidth={1}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
  {
    name: "HQ",
    path: "/learn/hq",
    icon: (isActive) => (
      <Shield
        size={34}
        strokeWidth={1}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
  {
    name: "Estatísticas",
    path: "/learn/statiscs",
    icon: (isActive) => (
      <ChartDonut
        size={32}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
  {
    name: "Casos de uso",
    path: "/learn/use-cases",
    icon: (isActive) => (
      <Lego
        size={32}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
  {
    name: "Insights",
    path: "/learn/badges",
    icon: (isActive) => (
      <Sticker
        size={34}
        strokeWidth={1}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-[#00c8ff]" : "text-white"}`}
      />
    ),
  },
];

export function FooterFixed() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-[#121214] border-t-[1px] border-[#25252a] text-white text-center p-4 fixed bottom-0 left-0 lg:hidden">
      <ul className="flex justify-around">
        {links.map((link, index) => {
          const isActive = pathname === link.path;

          return (
            <li key={index}>
              <Link href={link.path} className="flex flex-col items-center">
                {link.icon(isActive)}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

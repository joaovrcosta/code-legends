"use client";

import { usePathname } from "next/navigation";
import useSidebarStore from "@/stores/sidebarStore";
import {
  PuzzlePiece,
  BookOpenText,
  ChartPieSlice,
  CaretRight,
  Sticker,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Path } from "@phosphor-icons/react/dist/ssr";

const links = [
  { name: "Aprender", path: "/learn", icon: Path },
  { name: "Cursos", path: "/learn/catalog", icon: BookOpenText },
  // { name: "Quartel General", path: "/learn/hq", icon: Shield },
  { name: "Estatísticas", path: "/learn/statistcs", icon: ChartPieSlice },
  { name: "Projetos", path: "/learn/use-cases", icon: PuzzlePiece },
  { name: "Emblemas", path: "/learn/badges", icon: Sticker },
];

const Sidebar = () => {
  const pathName = usePathname();
  const { isOpen } = useSidebarStore();

  return (
    <section
      className={`flex h-full flex-col gap-2 bg-[#1A1A1E] text-white py-4 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex-1">
        <nav className="w-full max-h-[326px] bg-transparent py-4 px-0 rounded-lg border border-none">
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = pathName === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`relative flex items-center h-[52px] px-4 space-x-3 transition-colors overflow-hidden ${
                      isActive
                        ? "bg-blue-gradient-500 text-white font-semibold"
                        : "text-[#C4C4CC] hover:bg-[#2E2E32]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-center">
                        <span className="mr-3">
                          <link.icon
                            size={28}
                            weight={isActive ? "fill" : "regular"}
                          />
                        </span>
                        <span className="whitespace-nowrap">
                          {isOpen && link.name}
                        </span>
                      </div>
                      {isActive && <CaretRight size={28} />}
                    </div>
                    {isActive && (
                      <div className="absolute right-0 top-0 h-full w-10 bg-blue-500 blur-xl opacity-50 z-50"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Sidebar;

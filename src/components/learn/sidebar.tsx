"use client";

import {
  Lego,
  BookOpenText,
  ChartPieSlice,
  CaretRight,
  House,
  Shield,
  Sticker,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Aprender", path: "/learn", icon: House },
  { name: "Cursos", path: "/learn/catalog", icon: BookOpenText },
  { name: "Quartel General", path: "/learn/hq", icon: Shield },
  { name: "Estatísticas", path: "/learn/statistcs", icon: ChartPieSlice },
  { name: "Casos de uso", path: "/learn/use-cases", icon: Lego },
  { name: "Flashcards", path: "/learn/badges", icon: Sticker },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section className="flex h-full flex-col gap-2 bg-[#1A1A1E] text-white py-4">
      <div className="flex-1">
        <nav className="w-full max-h-[326px] bg-transparent py-4 px-0 rounded-lg border border-none">
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = pathName === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center h-[52px] px-4 space-x-3 transition-colors ${
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
                        {link.name}
                      </div>
                      {isActive && (
                        <div>
                          <CaretRight size={28} />
                        </div>
                      )}
                    </div>
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

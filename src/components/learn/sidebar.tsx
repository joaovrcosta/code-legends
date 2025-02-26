"use client";

import {
  Blocks,
  BookOpenText,
  ChartNetwork,
  ChevronRight,
  House,
  Shield,
  Sticker,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Aprender", path: "/learn", icon: <House /> },
  {
    name: "Cursos",
    path: "/learn/catalog",
    icon: <BookOpenText />,
  },
  { name: "Quartel General", path: "/learn/hq", icon: <Shield /> },
  { name: "Estatisticas", path: "/learn/statistcs", icon: <ChartNetwork /> },
  { name: "Casos de uso", path: "/account/access", icon: <Blocks /> },
  { name: "Emblemas", path: "/", icon: <Sticker /> },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section className="flex h-full flex-col gap-2 bg-[#1A1A1E] text-white py-4">
      <div className="flex-1">
        <nav className="w-full max-h-[326px] bg-transparent py-4 px-0 rounded-lg  border border-none">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`flex items-center h-[52px] px-4 space-x-3 transition-colors ${
                    pathName === link.path
                      ? "bg-blue-gradient-500 text-white font-semibold"
                      : "text-[#C4C4CC] hover:bg-[#2E2E32]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                    </div>
                    <div>
                      <span>
                        <ChevronRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Sidebar;

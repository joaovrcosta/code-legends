"use client";

import {
  Album,
  ChevronRight,
  Crown,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Medal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Visão Geral", path: "/account", icon: <LayoutDashboard /> },
  {
    name: "Meus Cursos",
    path: "/account/mycourses",
    icon: <Album />,
  },
  {
    name: "Certificados",
    path: "/account/certificates",
    icon: <Medal />,
  },
  { name: "Pedidos", path: "/account/purchases", icon: <Crown /> },
  { name: "Dados", path: "/account/access", icon: <KeyRound /> },
  { name: "Sair", path: "/", icon: <LogOut /> },
];

export function AccountAsideMenu() {
  const pathName = usePathname();

  return (
    <nav className="w-full h-auto bg-transparent py-4 px-0 rounded-lg shadow-md border border-[#25252A] lg:sticky lg:top-[12vh] lg:w-[338px]">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`flex items-center h-[52px] px-4 space-x-3 transition-colors ${
                pathName === link.path
                  ? "bg-blue-gradient-500 text-white font-semibold"
                  : "text-[#C4C4CC]"
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
  );
}

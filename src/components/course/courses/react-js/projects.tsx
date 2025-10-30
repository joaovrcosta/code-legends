import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Design System",
    image: "/68c999c44066a839808820.png",
    description:
      "Um sistema de design moderno para acelerar o desenvolvimento front-end.",
    url: "#",
  },
  {
    id: 2,
    title: "Tobiko",
    image: "/68766660977be365296330.png",
    description:
      "Tobiko is a modern transformation platform that helps data engineers cut waste, blind spots, and preventable errors in their workflows.",
    url: "#",
  },
  {
    id: 3,
    title: "Gaming Landing Page",
    image: "/htmlcss-banner.png",
    description: "Página inicial para games. Totalmente responsiva e estilosa.",
    url: "#",
  },
];

export function CourseProjects() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 grid-cols-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative rounded-2xl overflow-hidden min-h-[340px] border border-[#27272A] shadow-lg flex flex-col justify-end"
          style={{ minHeight: 340 }}
        >
          {/* Imagem de fundo como background absoluto */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover select-none pointer-events-none"
              priority={true}
            />
            {/* Gradiente escuro para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181c] via-black/80 to-transparent" />
          </div>
          {/* Conteúdo do card por cima */}
          <div className="relative z-10 p-7 flex flex-col justify-end h-full min-h-[340px]">
            <h3 className="font-semibold text-[22px] text-white mb-3 drop-shadow-[0_0_4px_#000C]">
              {project.title}
            </h3>
            <p className="text-zinc-200 text-sm mb-8 line-clamp-2">
              {project.description}
            </p>
            <div className="mt-auto">
              <Link
                href={project.url}
                className="text-[#00C8FF] font-semibold text-base hover:underline flex items-center gap-2 group"
              >
                Ver estudo de caso{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

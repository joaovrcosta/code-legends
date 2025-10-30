import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Design System",
    image: "/code-genesis-image.png",
    description:
      "Um sistema de design moderno para acelerar o desenvolvimento front-end.",
    url: "#",
  },
  {
    id: 2,
    title: "Front-End Dashboard",
    image: "/react-banner.png",
    description:
      "Dashboard interativo com gráficos, tabelas e autenticação integrada.",
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
          className="group relative rounded-2xl overflow-hidden bg-[#19191C] shadow-lg flex flex-col justify-end min-h-[340px] border border-[#27272A]"
        >
          {/* Imagem/banner no topo */}
          <div className="h-full w-full relative">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          {/* Conteúdo do card */}
          <div className="bg-gradient-to-t from-black/80 via-black/60 to-[#151517] p-4 px-6">
            <h3 className="font-semibold text-[20px] text-white mb-2 drop-shadow-[0_0_4px_#000C]">
              {project.title}
            </h3>
            <div className="mt-6">
              <Link
                href={project.url}
                className="text-[#00C8FF] font-semibold text-sm text-base hover:underline flex items-center gap-2 group"
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

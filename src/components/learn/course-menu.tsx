import Image from "next/image";
import reactImg from "../../../public/react-course-icon.svg";
import tailwindIcon from "../../../public/tailwind-course-icon.svg";
import patternsIcons from "../../../public/pattern-icon.png";
import { Plus } from "lucide-react";
import Link from "next/link";

export function CourseMenu() {
  return (
    <div>
      <div className="p-4 border-b border-[#25252A]">
        <p className="text-lg">Meus Cursos</p>
      </div>
      <div className="border-b border-[#25252A] p-2">
        <div className="flex items-center gap-3 px-3 py-0 w-[352px] text-white border-none rounded-[20px] hover:bg-[#25252A]">
          <Image src={reactImg} alt="" width={70} height={70} />
          <span className="text-base">ReactJS</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-0 w-[352px] text-white border-none rounded-[20px] hover:bg-[#25252A]">
          <Image src={tailwindIcon} alt="" width={70} height={70} />
          <span className="text-base">Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-0 w-[352px] text-white border-none rounded-[20px] hover:bg-[#25252A]">
          <Image src={patternsIcons} alt="" width={70} height={70} />
          <span className="text-base">Patterns</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 p-3 hover:bg-[#25252A] cursor-pointer">
        <Link href="/learn/catalog" className="flex items-center gap-2">
          <Plus />
          <span className="text-md">Adicionar curso</span>
        </Link>
      </div>
    </div>
  );
}

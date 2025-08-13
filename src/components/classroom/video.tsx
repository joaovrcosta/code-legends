import Image from "next/image";
import notFoundImg from "../../../public/not-found.png";
import { TitleAccordion } from "../learn/title-accordion";
import { LevelAccordion } from "../learn/level-accordion";

interface VideoComponentProps {
  src?: string | null;
  title: string | undefined;
  description?: string;
}

export default function VideoComponent({ src, title }: VideoComponentProps) {
  return (
    <div className="flex flex-col lg:px-0 px-4 h-full">
      <div className="lg:hidden flex items-center justify-center py-6 ">
        <div className="flex flex-col items-center">
          <p className="text-sm font-light text-[#787878]">Chapter 1</p>
          <h3 className="text-[20px]">Iniciando com ReactJS</h3>
        </div>
      </div>
      <div className="relative w-full max-h-[570px] rounded-lg aspect-[16/9]">
        {src ? (
          <iframe
            allow="fullscreen"
            className="absolute top-0 left-0 w-full h-full border-none"
            src={src}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm font-semibold">
            <Image src={notFoundImg} alt="Not Found" width={500} height={500} />
          </div>
        )}
      </div>

      <TitleAccordion title={title} />
      <LevelAccordion />
    </div>
  );
}

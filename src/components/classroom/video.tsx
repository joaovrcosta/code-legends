import Image from "next/image";
import notFoundImg from "../../../public/not-found.png";

interface VideoComponentProps {
  src?: string | null;
  title: string | undefined;
  description: string | null | undefined;
}

export default function VideoComponent({
  description,
  src,
  title,
}: VideoComponentProps) {
  return (
    <div>
      <div className="relative w-full pb-[56.25%] h-0">
        {src ? (
          <iframe
            allow="fullscreen"
            className="absolute top-0 left-0 w-full h-full border-none"
            src={src}
          ></iframe>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center  text-white text-sm font-semibold">
            <Image src={notFoundImg} alt="Not Found" width={500} height={500} />
          </div>
        )}
      </div>
      <div className="p-4 lg:p-7 lg:block hidden">
        <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-[20px] font-bold">
          {title}
        </span>
        <p className="text-[14px] mt-4 max-w-[800px]">{description}</p>
      </div>
    </div>
  );
}

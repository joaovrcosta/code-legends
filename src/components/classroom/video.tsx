import Image from "next/image";
import notFoundImg from "../../../public/not-found.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface VideoComponentProps {
  src?: string | null;
  title: string | undefined;
  description: string;
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
      <div className="p-4 lg:p-7 pb-0 lg:block hidden">
        <span className="bg-blue-gradient-500 bg-clip-text text-transparent text-[20px] font-bold">
          {title}
        </span>
        <p className="text-[14px] mt-4 max-w-[800px]">{description}</p>
      </div>
      <div className="flex items-center space-x-3 lg:pt-0 lg:pr-7 lg:pl-7 lg:pb-7 lg:flex hidden">
        <Avatar className="h-[52px] w-[52px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?s=400&u=415dc8fde593b5dcbdef181e6186a8d80daf72fc&v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-[14px]">João Victor</h3>
          <p className="text-[12px] text-[#c4c4c4]">Educator</p>
        </div>
      </div>
    </div>
  );
}

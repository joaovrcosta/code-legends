import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { SheetHeader } from "./sheet-header";

export default function LearnHeader() {
  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214]">
      <ul className="flex justify-between items-center lg:pt-8 pt-4 pb-1 max-w-[1560px] mx-auto px-4">
        <li className="flex space-x-3">
          <SheetHeader />
          <Image src={codeLegendsLogo} alt="Code Legends" />
        </li>
        <li className="flex space-x-12 items-center hidden lg:block">
          <a href="" className="border px-2 py-2 border-[#25252A] rounded-lg">
            João Victor Ribeiro Costa
          </a>
        </li>
      </ul>
    </div>
  );
}

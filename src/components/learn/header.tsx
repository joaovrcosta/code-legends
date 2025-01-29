import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";

export default function LearnHeader() {
  return (
    <div className="relative fixed top-0 left-0 w-full z-50 bg-[#121214]">
      <ul className="flex justify-between items-center py-6 px-16">
        <li>
          <Image src={codeLegendsLogo} alt="Code Legends" />
        </li>
        <li className="flex space-x-12 items-center">Oi</li>
      </ul>
    </div>
  );
}

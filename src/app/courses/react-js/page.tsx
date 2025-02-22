import Image from "next/image";
import reactIcon from "../../../../public/react-icon.png";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

export default function ReactJsPage() {
  return (
    <div className="">
      <div className="bg-[#1A1A1E] p-14 flex items-center rounded-3xl">
        <div>
          <Image src={reactIcon} alt="ReactJS" width={120} height={120} />
        </div>
        <div className="flex flex-col ml-8">
          <h1 className="text-4xl font-bold">ReactJS</h1>
          <p>
            Desenvolva interfaces modernas e reativas na web utilizando uma
            biblioteca modular e escalável.
          </p>
        </div>
      </div>
      <div className="">
        <ul className="flex gap-3 mt-4 mb-4">
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg">
            <Link href="/courses/react-js" className="">
              <p>Visão Geral</p>
            </Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg">
            <Link href="/courses/react-js/quizes">Quizes</Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg">
            <Link href="/courses/react-js/quizes">Material</Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg">
            <Link href="/courses/react-js/quizes">Projetos</Link>
          </li>
        </ul>
      </div>
      <div>
        <span>TERRA - NIVEL 1</span>
        <div className="border border-[#25252A] rounded-3xl p-4 mt-4 gap-4">
          <div className="gap-4 flex-col">
            <h3 className="text-2xl">Fundamentos do ReactJS</h3>
            <div className="flex">
              <div>
                <p>Sessão 1</p>
              </div>
              <div>
                <p>31 aulas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig />
              <p>Concluido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

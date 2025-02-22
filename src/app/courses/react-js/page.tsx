import Image from "next/image";
import reactIcon from "../../../../public/react-icon.svg";
import Link from "next/link";
import { ArrowLeft, CircleCheckBig, Lock, Play } from "lucide-react";

export default function ReactJsPage() {
  return (
    <div className="">
      <div className="bg-gray-gradient border border-[#25252A] lg:p-14 xl:p-14 px-4 py-4 flex items-center rounded-lg">
        <div className="lg:block hidden">
          <Image src={reactIcon} alt="ReactJS" width={120} height={120} />
        </div>
        <div className="flex flex-col lg:ml-4">
          <Link href="/learn/courses">
            <div className="flex items-center gap-2 cursor-pointer mb-2 text-sm text-[#7e7e89]">
              <ArrowLeft size={16} className="text-[#7e7e89]" />
              Voltar
            </div>
          </Link>
          <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent lg:text-2xl text-xl">
            ReactJS
          </span>
          <p className="lg:text-base text-sm">
            Desenvolva interfaces modernas e reativas na web utilizando uma
            biblioteca modular e escalável.
          </p>
        </div>
      </div>
      <div className="">
        <ul className="flex gap-3 mt-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg h-[42px] min-w-[90px]">
            <Link href="/courses/react-js">
              <p>Curso</p>
            </Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg h-[42px] min-w-[90px]">
            <Link href="/courses/react-js">
              <p>Quizes</p>
            </Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg h-[42px] min-w-[90px]">
            <Link href="/courses/react-js">
              <p>Material</p>
            </Link>
          </li>
          <li className="border border-[#25252A] flex items-center justify-center p-3 rounded-lg h-[42px] min-w-[90px]">
            <Link href="/courses/react-js">
              <p>Projetos</p>
            </Link>
          </li>
        </ul>
      </div>
      <section className="mb-4">
        <span>Terra - Nível 1</span>
        <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-2xl">
                Fundamentos do ReactJS
              </span>
              <div className="flex lg:block hidden">
                <div>
                  <p>Sessão 1</p>
                </div>
                <div>
                  <p>31 aulas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="text-[#00A277]" />
              <p>Concluido</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] border-[#00C8FF] cursor-pointer">
              <div className="flex items-center justify-center h-full w-full">
                <Play />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <span>Troposfera - Nível 2</span>
        <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-2xl">
                Aprofundando com hooks
              </span>
              <div className="flex lg:block hidden">
                <div>
                  <p>Sessão 1</p>
                </div>
                <div>
                  <p>31 aulas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="text-[#00A277]" />
              <p>Concluido</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] border-[#00C8FF] cursor-pointer">
              <div className="flex items-center justify-center h-full w-full">
                <Play />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <span>Estratosfera - Nível 3</span>
        <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-2xl">
                HTTP e Performance
              </span>
              <div className="flex lg:block hidden">
                <div>
                  <p>Sessão 3</p>
                </div>
                <div>
                  <p>31 aulas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>27% completo</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] border-[#00C8FF] cursor-pointer">
              <div className="flex items-center justify-center h-full w-full">
                <Play />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4 opacity-50 pointer-events-none select-none">
        <span className="text-gray-500">Mesosfera - Nível 4</span>
        <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-600 text-2xl">
                Integrando Frontend
              </span>
              <div className="flex lg:block hidden text-gray-500">
                <div>
                  <p>Sessão 3</p>
                </div>
                <div>
                  <p>31 aulas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Lock />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] border-gray-600 cursor-not-allowed">
              <div className="flex items-center justify-center h-full w-full">
                <Play className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4 opacity-50 pointer-events-none select-none">
        <span className="text-gray-500">Termosfera - Nível 5</span>
        <div className="border border-[#25252A] rounded-3xl p-4 h-[136px] mt-4 flex gap-4">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-600 text-2xl">
                Primeiro framework
              </span>
              <div className="flex lg:block hidden text-gray-500">
                <div>
                  <p>Sessão 3</p>
                </div>
                <div>
                  <p>31 aulas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Lock />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full h-[70px] w-[70px] border-[3px] border-gray-600 cursor-not-allowed">
              <div className="flex items-center justify-center h-full w-full">
                <Play className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

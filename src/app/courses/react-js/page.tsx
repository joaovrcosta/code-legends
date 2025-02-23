import { CircleCheckBig, Lock, Play } from "lucide-react";

export default function ReactJsPage() {
  return (
    <div className="">
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

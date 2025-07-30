import Header from "@/components/header";
import Hero from "@/components/landing-page/hero";
import reactBanner from "../../public/react-banner.png";
import htmlCss from "../../public/htmlcss-banner.png";
import nextjsBanner from "../../public/nextjs banner.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <section className="bg-[#121214] w-full lg:py-16 py-12 text-white">
        <div className="max-w-[1344px] mx-auto">
          <div className="lg:px-0 px-4">
            <div className="mb-1">
              <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-thin italic tracking-widest">
                NOSSOS CURSOS
              </span>
            </div>
            <div className="space-y-1">
              <span className="bg-silver-gradient bg-clip-text text-transparent font-medium text-3xl">
                Construa sistemas complexos
              </span>
              <p className="text-muted-foreground text-[16px]">
                Acesso imediato a todo conteúdo disponível na plataforma para
                assistir no seu ritmo. Com atualizações inclusas na assinatura.
              </p>
            </div>
          </div>
          <div className="flex lg:space-x-6 space-x-0 lg:space-y-0 space-y-6 mt-6 lg:flex-row flex-col lg:px-0 px-4">
            <div className="bg-[#0c0c0c] border border-[#333333] w-full rounded-xl">
              <div className="p-8 space-y-3">
                <h4 className="text-2xl">ReactJS</h4>
                <p className="text-sm text-muted-foreground">
                  React é uma biblioteca JavaScript poderosa para construir
                  interfaces modernas e reativas. Ideal para quem deseja criar
                  aplicações web rápidas, dinâmicas e escaláveis.
                </p>
              </div>
              <div className="rounded-xl">
                <Image
                  src={reactBanner}
                  alt="react banner"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="bg-[#0c0c0c] border border-[#333333] w-full rounded-xl">
              <div className="p-8 space-y-3">
                <h4 className="text-2xl">HTML&CSS</h4>
                <p className="text-sm text-muted-foreground">
                  React é uma biblioteca JavaScript poderosa para construir
                  interfaces modernas e reativas. Ideal para quem deseja criar
                  aplicações web rápidas, dinâmicas e escaláveis.
                </p>
              </div>
              <div className="rounded-xl">
                <Image
                  src={htmlCss}
                  alt="react banner"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="bg-[#0c0c0c] border border-[#333333] w-full rounded-xl">
              <div className="p-8 space-y-3">
                <h4 className="text-2xl">NextJS</h4>
                <p className="text-sm text-muted-foreground">
                  React é uma biblioteca JavaScript poderosa para construir
                  interfaces modernas e reativas. Ideal para quem deseja criar
                  aplicações web rápidas, dinâmicas e escaláveis.
                </p>
              </div>
              <div className="rounded-xl">
                <Image
                  src={nextjsBanner}
                  alt="react banner"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Header from "@/components/header";
import Hero from "@/components/landing-page/hero";

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="flex items-center justify-center ">
        <div className="max-w-[1216px] mx-auto">
          <Hero />
        </div>
      </div>
    </div>
  );
}

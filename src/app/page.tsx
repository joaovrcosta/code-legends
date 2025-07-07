import Header from "@/components/header";
import Hero from "@/components/landing-page/hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <section className="bg-[#121214] w-full py-20 text-white text-center">
        <p className="text-xl">The best course</p>
      </section>
    </>
  );
}

import { AccountAsideMenu } from "@/components/account/aside-menu";
import { FooterFixed } from "@/components/learn/footer-fixed";
import LearnHeader from "@/components/learn/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <LearnHeader />
      </div>

      <div className="max-w-[1560px] mx-auto flex mt-[12vh] gap-10 lg:flex flex-col lg:flex-row items-start px-4 pb-20">
        <AccountAsideMenu />
        <main className="w-full">{children}</main>
      </div>
      <FooterFixed />
    </>
  );
}

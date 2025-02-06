import { AccountAsideMenu } from "@/components/account/aside-menu";
import LearnHeader from "@/components/learn/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LearnHeader />
      <div className="max-w-[1560px] mx-auto flex mt-[6vh] gap-10">
        <AccountAsideMenu />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}

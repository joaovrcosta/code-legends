import HeaderLogin from "@/components/login/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Crown } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <HeaderLogin />
      <div className="px-4 mt-20">
        <Card className="max-w-[464px] mx-auto mt-8  bg-[#1A1A1E] border border-[#25252A] rounded-[20px]">
          <CardHeader className="flex flex-col items-center space-y-4 mb-6 mt-4">
            <h1 className="text-2xl text-white font-medium">Entrar na conta</h1>
            <Image src={codeLegendsLogo} alt="Login" width={149} height={16} />
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-5  border-b border-[#25252A] pb-6">
                <Input
                  className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                  placeholder="E-mail"
                />
                <Input
                  className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                  placeholder="Senha"
                />
                <PrimaryButton className="font-semibold h-[52px]">
                  Acessar conta
                </PrimaryButton>
              </div>
            </form>
            <div className="flex flex-col items-center space-y-4 mt-4 mb-3">
              <h3 className="text-white text-sm">REGISTRE-SE</h3>
              <PrimaryButton className="h-[52px]" variant="yellow">
                Escolher plano
                <Crown className="text-[#FF9D00]" size={24} />
              </PrimaryButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

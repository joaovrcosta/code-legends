"use client";

import HeaderLogin from "@/components/login/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0D0D12]">
      {/* Luz azul - topo esquerdo */}
      <div className="absolute w-[400px] h-[400px] top-0 left-0 rounded-full bg-[#00b3ffa9] opacity-40 blur-[200px] pointer-events-none" />

      {/* Luz rosa - centro esquerda */}
      <div className="absolute w-[300px] h-[300px] top-[20%] left-[30%] rounded-full bg-[#00b3ff5b] opacity-30 blur-[200px] pointer-events-none" />

      {/* Luz roxa - inferior direito */}
      <div className="absolute w-[500px] h-[500px] bottom-0 right-0 rounded-full bg-[#00b3ffb6] opacity-40 blur-[220px] pointer-events-none" />

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <HeaderLogin />
        <div className="px-4 lg:mt-16 mt-10">
          <Card className="max-w-[600px] mx-auto lg:mt-8 mt-0  border border-[#25252A] rounded-[20px]">
            <CardHeader className="flex flex-col items-center space-y-4 mb-6 mt-4">
              <h1 className="text-2xl text-white font-medium text-center">
                Cadastre-se gratuitamente
              </h1>
              <Image
                src={codeLegendsLogo}
                alt="Login"
                width={149}
                height={16}
              />
            </CardHeader>

            <CardContent>
              <form>
                <div className="space-y-5 pb-6">
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="Seu nome completo"
                  />
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="Seu e-mail"
                  />
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="Deve ter no minimo 7 caracteres"
                  />
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="Deve ter no minimo 7 caracteres"
                  />
                  <p className="text-[14px] text-muted-foreground text-center">
                    Ao se cadastrar, você aceita nossos{" "}
                    <span className="text-[#00C8FF]">termos de uso</span> e a
                    nossa{" "}
                    <span className="text-[#00C8FF]">
                      política de privacidade
                    </span>
                    .
                  </p>
                  <PrimaryButton className="font-semibold h-[52px]">
                    Criar conta
                  </PrimaryButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

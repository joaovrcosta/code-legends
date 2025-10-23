"use client";

import HeaderLogin from "@/components/login/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import codeLegendsLogo from "../../../public/code-legends-logo.svg";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Crown } from "lucide-react";
import DividerWithText from "@/components/divider-with-text";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await loginUser(formData);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0D0D12]">
      <div className="absolute w-[400px] h-[400px] top-0 left-0 rounded-full bg-[#00b3ffa9] opacity-40 blur-[200px] pointer-events-none" />

      <div className="absolute w-[300px] h-[300px] top-[20%] left-[30%] rounded-full bg-[#00b3ff5b] opacity-30 blur-[200px] pointer-events-none" />

      <div className="absolute w-[500px] h-[500px] bottom-0 right-0 rounded-full bg-[#00b3ffb6] opacity-40 blur-[220px] pointer-events-none" />

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <HeaderLogin />
        <div className="px-4 lg:mt-16 mt-10">
          <Card className="max-w-[600px] mx-auto lg:mt-8 mt-0  border border-[#25252A] rounded-[20px]">
            <CardHeader className="flex flex-col items-center space-y-4 mb-6 mt-4">
              <h1 className="text-2xl text-white font-medium text-center">
                Entrar na conta
              </h1>
              <Image
                src={codeLegendsLogo}
                alt="Login"
                width={149}
                height={16}
              />
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5 pb-6">
                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="E-mail"
                    type="email"
                    name="email"
                    required
                  />
                  <Input
                    className="h-[52px] rounded-full bg-[#121214] text-white border border-[#25252A] px-4"
                    placeholder="Senha"
                    type="password"
                    name="password"
                    required
                  />
                  <PrimaryButton
                    className="font-semibold h-[52px]"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Acessar conta"}
                  </PrimaryButton>
                </div>
              </form>

              <DividerWithText text="OU INSCREVA-SE COM" />

              <div className="flex flex-col items-center space-y-4 mt-4 mb-3">
                <Link href="/signup" className="w-full">
                  <PrimaryButton className="h-[52px]" variant="yellow">
                    Cadastre-se gratuitamente
                    <Crown className="text-[#FF9D00] ml-2" size={24} />
                  </PrimaryButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

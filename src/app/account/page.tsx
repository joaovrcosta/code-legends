import { CertificateCard } from "@/components/account/certificate-card";
import { MyCourses } from "@/components/account/my-courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Crown, KeyRound, Medal } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="space-y-4">
      <div className="lg:flex hidden items-center space-x-2 px-4 py-8 mt-8">
        <Avatar className="h-[52px] w-[52px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/70654718?s=400&u=415dc8fde593b5dcbdef181e6186a8d80daf72fc&v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p>João Victor</p>
          <p className="text-xs text-muted-foreground">
            Gerencie a sua conta e suas informações
          </p>
        </div>
      </div>
      <MyCourses />

      <Card className="bg-[#121214] border-[#25252a] lg:p-10 p-4">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <span className="text-blue-gradient-500">
              <Medal className="w-6 h-6 text-[#00c8ff]" />
            </span>
            <h1 className="text-lg font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
              Certificados
            </h1>
            <Link href="/account/certificates">
              <span className="text-sm text-muted-foreground">Ver todos</span>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage your certficates and preferences.
          </p>
        </CardHeader>
        <CardContent className="flex lg:flex-wrap flex-col lg:space-y-0 space-y-3 lg:gap-4 gap-0  px-0">
          <CertificateCard courseName="ReactJS" />
          <CertificateCard courseName="Performance" />
          <CertificateCard courseName="HTML" />
        </CardContent>
      </Card>

      <Card className="bg-[#121214] border-[#25252a] lg:p-10 p-4">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <span className="text-blue-gradient-500">
              <Crown className="w-6 h-6 text-[#00c8ff]" />
            </span>
            <h1 className="text-lg font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
              Assinatura
            </h1>
            <Link href="/account/purchases">
              <span className="text-sm text-muted-foreground">Gerenciar</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your certficates and preferences.
          </p>
        </CardHeader>
      </Card>

      <Card className="bg-[#121214] border-[#25252a] lg:p-10 p-4">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <span className="text-blue-gradient-500">
              <KeyRound className="w-6 h-6 text-[#00c8ff]" />
            </span>
            <h1 className="text-lg font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
              Meus dados
            </h1>
            <Link href="/account/access">
              <span className="text-sm text-muted-foreground">Alterar</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your certficates and preferences.
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}

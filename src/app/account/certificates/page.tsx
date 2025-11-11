import { CertificateCard } from "@/components/account/certificate-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserCertificates } from "@/actions/user/get-user-certificates";
import { Medal } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AccountCertificatesPage() {
  const certificates = await getUserCertificates();

  return (
    <div className="space-y-4 mt-9">
      <Card className="bg-[#121214] border-[#25252a] lg:p-10 p-4">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Medal className="w-6 h-6 text-[#00c8ff]" />
            <h1 className="text-2xl font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
              Meus Certificados
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Visualize e gerencie todos os seus certificados conquistados.
          </p>
        </CardHeader>

        <CardContent className="flex lg:flex-wrap flex-col lg:space-y-0 space-y-3 lg:gap-4 gap-0 px-0">
          {certificates.length > 0 ? (
            certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                courseName={certificate.course.title}
                completedAt={certificate.completedAt}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Medal className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">
                Você ainda não possui certificados
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Complete seus cursos para ganhar certificados incríveis!
              </p>
              <Link
                href="/learn/catalog"
                className="text-[#00c8ff] text-sm hover:underline inline-block"
              >
                Explorar cursos disponíveis
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

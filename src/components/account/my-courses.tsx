import { Album } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import Link from "next/link";

export function MyCourses() {
  return (
    <>
      <Card className="bg-[#121214] border-[#25252a] lg:p-10 py-4 px-2">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <span className="text-blue-gradient-500">
              <Album className="w-6 h-6 text-[#00c8ff]" />
            </span>
            <h1 className="text-lg font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
              Meus Cursos
            </h1>
            <Link href="/account/purchases">
              <span className="text-sm text-muted-foreground">Gerenciar</span>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage your certficates and preferences.
          </p>
        </CardHeader>
      </Card>
    </>
  );
}

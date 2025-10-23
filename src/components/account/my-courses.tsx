import { Album } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import Link from "next/link";
import { getUserCourses } from "@/actions/user/get-user-courses";
import { Badge } from "../ui/badge";

export async function MyCourses() {
  const userCourses = await getUserCourses();

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
            Gerencie seus cursos e progresso.
          </p>
        </CardHeader>
        <CardContent className="px-0">
          {userCourses.length > 0 ? (
            <div className="space-y-3">
              {userCourses.map((userCourse) => (
                <div
                  key={userCourse.id}
                  className="flex items-center justify-between p-3 bg-[#0c0c0c] border border-[#333333] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#00c8ff] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {userCourse.course.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {userCourse.course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {userCourse.course.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {userCourse.currentModule?.name || "Não iniciado"}
                    </Badge>
                    <Link
                      href={`/classroom/${userCourse.course.slug}`}
                      className="text-[#00c8ff] text-sm hover:underline"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                Você ainda não está inscrito em nenhum curso.
              </p>
              <Link
                href="/courses"
                className="text-[#00c8ff] text-sm hover:underline mt-2 inline-block"
              >
                Explorar cursos
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

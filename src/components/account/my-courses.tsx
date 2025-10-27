import { Album } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import Link from "next/link";
import { getUserCourses } from "@/actions/user/get-user-courses";
import { UserCoursesResponse } from "@/types/user-course.ts";
import Image from "next/image";

export async function MyCourses() {
  const userCourses: UserCoursesResponse = await getUserCourses();

  const favoriteCourses = userCourses.favoriteCourses;

  return (
    <Card className="bg-[#121214] border-[#25252a] lg:p-10 py-4 px-2">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Album className="w-6 h-6 text-[#00c8ff]" />
          <h1 className="text-lg font-semibold bg-blue-gradient-500 bg-clip-text text-transparent">
            Últimos Cursos
          </h1>
          <Link href="/account/purchases">
            <span className="text-sm text-muted-foreground">Gerenciar</span>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Gerencie seus cursos e progresso.
        </p>
      </CardHeader>

      <CardContent className="px-0 mt-4">
        {favoriteCourses.length > 0 ? (
          <div className="space-y-3">
            {favoriteCourses.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center justify-between p-3 bg-transparent border border-[#333333] rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={fav.course.icon}
                    alt={fav.course.title}
                    width={80}
                    height={80}
                  />
                  <div>
                    <h3 className="text-white font-medium">
                      {fav.course.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/classroom/${fav.course.slug}`}
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
              href="/learn/catalog"
              className="text-[#00c8ff] text-sm hover:underline mt-2 inline-block"
            >
              Explorar cursos
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

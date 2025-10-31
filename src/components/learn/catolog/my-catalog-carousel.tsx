"use client";

import { PersonalCatalog } from "@/components/course/personal-catalog-card";
import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { getUserEnrolledList } from "@/actions";
import type { EnrolledCourse } from "@/types/user-course.ts";
import Link from "next/link";

export function MyCatalogCarousel() {
  const [userCourses, setUserCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      try {
        const { userCourses: courses } = await getUserEnrolledList();
        setUserCourses(courses || []);
      } catch (error) {
        console.error("Erro ao buscar cursos inscritos:", error);
        setUserCourses([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEnrolledCourses();
  }, []);

  // Determina o curso atual (o mais recentemente acessado)
  const currentCourseId =
    userCourses.length > 0
      ? userCourses.reduce((latest, course) =>
          new Date(course.lastAccessedAt) > new Date(latest.lastAccessedAt)
            ? course
            : latest
        ).id
      : null;

  // Função para determinar o status do curso
  const getStatus = (progress: number, isCompleted: boolean) => {
    if (isCompleted || progress >= 1) return "completed";
    if (progress > 0) return "continue";
    return "not-started";
  };

  console.log(userCourses);

  return (
    <Carousel>
      <CarouselContent className="-ml-3">
        {/* Botão Adicionar */}
        <CarouselItem className="basis-auto">
          <Link href="/learn/catalog">
            <div className="flex items-center justify-center rounded-[20px] transition-all duration-300 hover:scale-105 hover:backdrop-blur-lg cursor-pointer border bg-transparent border-[#25252A] gap-3 border-dashed text-sm px-6 hover:bg-[#25252A] h-full">
              <Plus />
              <p>Adicionar</p>
            </div>
          </Link>
        </CarouselItem>

        {/* Cards dos cursos inscritos */}
        {!isLoading &&
          userCourses.map((enrolledCourse) => {
            const progressPercent = Math.round(enrolledCourse.progress * 100);
            const isCurrent = enrolledCourse.id === currentCourseId;

            return (
              <CarouselItem
                key={enrolledCourse.id}
                className="basis-auto w-[380px]"
              >
                <PersonalCatalog
                  name={enrolledCourse.course.title}
                  image={
                    enrolledCourse.course.icon ||
                    enrolledCourse.course.thumbnail
                  }
                  url={`/classroom/${enrolledCourse.course.slug}`}
                  color="blue"
                  status={getStatus(
                    enrolledCourse.progress,
                    enrolledCourse.isCompleted
                  )}
                  isCurrent={isCurrent}
                  isFavorite={true}
                  progress={progressPercent}
                />
              </CarouselItem>
            );
          })}
      </CarouselContent>

      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

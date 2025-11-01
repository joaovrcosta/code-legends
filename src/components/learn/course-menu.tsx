"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserEnrolledList } from "@/actions";
import type { EnrolledCourse } from "@/types/user-course.ts";
import { useActiveCourseStore } from "@/stores/active-course-store";

export function CourseDropdownMenu() {
  const [open, setOpen] = useState(false);
  const [userCourses, setUserCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { activeCourse, fetchActiveCourse } = useActiveCourseStore();

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
    fetchActiveCourse();
  }, [fetchActiveCourse]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`bg-gray-gradient-first items-center border py-3 px-4 gap-2 rounded-[12px] hover:bg-[#25252A] cursor-pointer flex max-h-[42px] transition-colors ${
            open ? "border-[#00C8FF]" : "border-[#25252A]"
          }`}
        >
          {activeCourse?.icon ? (
            <Image
              src={activeCourse.icon}
              alt={activeCourse.title || "Curso"}
              height={32}
              width={32}
              className="object-contain lg:h-[32px] lg:w-[32px] h-[40px] w-[40px]"
            />
          ) : (
            <div className="w-5 h-5 bg-[#25252A] rounded" />
          )}
          <p className="lg:block hidden">
            {activeCourse?.title || "Meus Cursos"}
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        side="bottom"
        className="w-screen max-w-none left-0 right-0 border-none bg-[#1A1A1E] shadow-2xl z-50 mt-1 p-0 
                  sm:w-auto sm:max-w-sm sm:rounded-[20px] sm:border sm:border-[#25252A] sm:left-auto sm:right-auto"
      >
        <DropdownMenuLabel className="p-4">
          <span className="bg-blue-gradient-500 bg-clip-text text-transparent font-bold text-sm">
            Trocar de curso
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="border border-[#25252A]" />

        {isLoading ? (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Carregando cursos...
          </div>
        ) : userCourses.length === 0 ? (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Nenhum curso inscrito
          </div>
        ) : (
          <>
            {userCourses.map((enrolledCourse) => (
              <DropdownMenuItem
                key={enrolledCourse.id}
                asChild
                className="pl-2 pr-4 w-full min-w-[352px] text-white border-none rounded-[20px]"
              >
                <Link
                  href={`/classroom/${enrolledCourse.course.slug}`}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        enrolledCourse.course.icon ||
                        enrolledCourse.course.thumbnail
                      }
                      alt={enrolledCourse.course.title}
                      width={70}
                      height={70}
                      className="object-contain h-[70px] w-[70px]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {enrolledCourse.course.title}
                      </span>
                      {/* {enrolledCourse.progress > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {Math.round(enrolledCourse.progress * 100)}% concluído
                        </span>
                      )} */}
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}

        <Link href="/learn/catalog" onClick={() => setOpen(false)}>
          <div className="flex text-white gap-1 items-center justify-center py-3 hover:bg-[#25252A] border-t border-[#25252A] cursor-pointer">
            <Plus />
            Adicionar curso
          </div>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

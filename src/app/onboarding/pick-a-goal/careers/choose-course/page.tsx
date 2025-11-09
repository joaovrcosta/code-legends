"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateOnboarding, completeOnboarding } from "@/actions/user";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import codeLogo from "../../../../../../public/code-legends-logo.svg";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { listCoursesByCategory } from "@/actions/course/list-courses-by-category";
import { CourseWithCount } from "@/types/user-course.ts";

export default function ChooseCoursePage() {
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("categorySlug");

  useEffect(() => {
    async function fetchCourses() {
      if (!categorySlug) {
        setError("Categoria não encontrada.");
        return;
      }

      try {
        const data = await listCoursesByCategory(categorySlug);
        setCourses(data.courses);
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
        setError("Não foi possível carregar os cursos.");
      }
    }
    fetchCourses();
  }, [categorySlug]);

  const handleContinue = async () => {
    if (!selectedCourse) return;

    try {
      setIsLoading(true);
      setError("");
      // Encontrar o curso selecionado para obter o ID
      const course = courses.find((c) => c.slug === selectedCourse);
      if (course) {
        // Inscrever o usuário no curso
        const { enrollInCourse } = await import("@/actions/course/enroll");
        await enrollInCourse(course.id);

        // Iniciar o curso selecionado
        const { startCourse } = await import("@/actions/course/start");
        await startCourse(course.id);
      }
      await completeOnboarding();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = "/learn";
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao completar onboarding. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!categorySlug) {
    return (
      <div className="flex-1 flex flex-col p-8 lg:p-20 items-center justify-center">
        <p className="text-white text-lg">Categoria não encontrada.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-[#00C8FF] hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 lg:p-20">
      <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] top-0 left-0 rounded-full bg-[#00b3ffa9] opacity-40 blur-[100px] md:blur-[150px] lg:blur-[200px] pointer-events-none" />
      <div className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] top-[10%] left-[20%] md:top-[15%] md:left-[25%] lg:top-[20%] lg:left-[30%] rounded-full bg-[#00b3ff5b] opacity-30 blur-[100px] md:blur-[150px] lg:blur-[200px] pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bottom-0 right-0 rounded-full bg-[#00b3ffb6] opacity-40 blur-[120px] md:blur-[180px] lg:blur-[220px] pointer-events-none" />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-16">
          <Image src={codeLogo} alt="" quality={100} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-sm font-medium">3</span>
          <Progress value={100} className="flex-1" />
          <span className="text-white/60 text-sm">3</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-12">
          <h1 className="text-[24px] lg:text-[28px] font-semibold text-white mb-3">
            Já que você quer ser um{" "}
            <span className="text-[#00C8FF]">
              {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
            </span>
            , escolha uma trilha para começar
          </h1>
          <p className="text-white/70 text-base">
            Essa será sua primeira trilha de aprendizado.
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
            {error}
          </div>
        )}

        <div className="flex-1 space-y-3 mb-8 z-50">
          {courses.length === 0 && !error && (
            <div className="text-white/60 text-sm text-center py-8">
              Carregando cursos...
            </div>
          )}
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.slug)}
              disabled={isLoading}
              className={`w-full p-3 rounded-full px-4 border flex justify-start items-center text-left gap-3 ${
                selectedCourse === course.slug
                  ? "border-[#00C8FF] shadow-[0_0_12px_#00C8FF]"
                  : "border-[#25252A] bg-[#1A1A1E] hover:border-[#3A3A3F]"
              }`}
            >
              <Image
                src={course.icon}
                alt={course.title}
                width={40}
                height={40}
              />
              <span className="text-white text-sm">{course.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 z-50">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#25252A] border border-[#3A3A3F] flex items-center justify-center hover:bg-[#3A3A3F] transition-colors"
            disabled={isLoading}
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          <PrimaryButton
            onClick={handleContinue}
            disabled={!selectedCourse || isLoading}
            className="min-w-[200px] max-w-[200px] z-50"
          >
            {isLoading ? "Salvando..." : "Finalizar"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

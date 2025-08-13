import { Catalog } from "@/components/course/catalog-card";
import { Filters } from "@/components/learn/filters";
import { Input } from "@/components/ui/input";
import tailwindIcon from "../../../../public/tailwind-course-icon.svg";
import { PersonalCatalog } from "@/components/course/personal-catalog-card";
import { NewContentCaroussel } from "@/components/learn/catolog/new-content-caroussel";

export default function CoursesPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start xl:mt-10 mt-6">
        {/* Novidades */}
        <div className="flex items-center space-x-2 mb-4 px-6 lg:px-[84px]">
          <span className="text-muted-foreground text-[14px] font-semibold">
            Novidades
          </span>
        </div>

        {/* Carrossel */}
        <div className="w-full relative px-4 lg:px-0">
          <NewContentCaroussel />
        </div>

        {/* Seus cursos e Catálogo */}
        <div className="lg:px-20 px-4 w-full">
          {/* Seus cursos */}
          <div className="flex items-center space-x-2 py-4">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Seus cursos
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-6">
            <PersonalCatalog
              name="ReactJS"
              url="/courses/react-js"
              color="blue"
              status="continue"
              isCurrent={true}
              isFavorite={true}
              progress={32}
            />
            <PersonalCatalog
              name="Tailwind CSS Pro"
              url="/courses/react-js"
              color="blue"
              status="completed"
              image={tailwindIcon}
              isFavorite={true}
              progress={100}
            />
          </div>

          {/* Catálogo */}
          <div className="flex items-center space-x-2 py-4 pt-8">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Catálogo
            </span>
          </div>
          <div className="mb-6">
            <Input
              className="rounded-full h-[52px] w-full lg:max-w-[312px] border-[#25252A] px-4 shadow-lg"
              placeholder="Pesquisar"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <Catalog />
            <Filters />
          </div>
        </div>
      </div>
    </div>
  );
}

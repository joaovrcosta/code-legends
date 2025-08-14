import { Input } from "@/components/ui/input";
import tailwindIcon from "../../../../public/tailwind-course-icon.svg";
import { PersonalCatalog } from "@/components/course/personal-catalog-card";
import { NewContentCaroussel } from "@/components/learn/catolog/new-content-caroussel";
import { RecommendationsCarousel } from "@/components/learn/catolog/recommendations-carousel";

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
        <div className="lg:pl-20 pl-4 w-full">
          {/* Seus cursos */}
          <div className="flex items-center space-x-2 py-4">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Seus cursos
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-6 lg:pr-0 pr-4">
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
              Pesquisar
            </span>
          </div>
          <div className="mb-6 lg:pr-0 pr-4">
            <Input
              className="rounded-full h-[52px] w-full lg:max-w-[312px] border-[#25252A] px-4 shadow-lg"
              placeholder="Pesquisar"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 py-4 pt-4">
              <span className="text-muted-foreground text-[14px] font-semibold">
                Recomendações
              </span>
            </div>
            <RecommendationsCarousel />
            <div className="flex items-center space-x-2 py-4 pt-4">
              <span className="text-muted-foreground text-[14px] font-semibold">
                Acesse gratuitamente
              </span>
            </div>
            <RecommendationsCarousel />
            {/* <Catalog /> */}
            {/* <Filters /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

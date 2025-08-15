import { NewContentCaroussel } from "@/components/learn/catolog/new-content-caroussel";
import { RecommendationsCarousel } from "@/components/learn/catolog/recommendations-carousel";
import { CategoriesCarousel } from "@/components/learn/catolog/categories-carousel";
import { MyCatalogCarousel } from "@/components/learn/catolog/my-catalog-carousel";

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
          <div className="flex items-center space-x-2 py-4">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Seus cursos
            </span>
          </div>
          <MyCatalogCarousel />

          {/* Seus cursos */}

          {/* Catálogo */}
          {/* <div className="flex items-center space-x-2 py-4 pt-4">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Pesquisar
            </span>
          </div>
          <div className="mb-6 lg:pr-0 pr-4">
            <Input
              className="rounded-full h-[52px] w-full lg:max-w-[312px] border-[#25252A] px-4 shadow-lg"
              placeholder="Pesquisar"
            />
          </div> */}
          <div>
            <div className="flex items-center space-x-2 py-4 pt-8">
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
          <div className="flex items-center space-x-2 py-4 mt-4">
            <span className="text-muted-foreground text-[14px] font-semibold">
              Categorias
            </span>
          </div>
          <div className="pb-4">
            <CategoriesCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

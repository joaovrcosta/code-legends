import { Catalog, CatalogCard } from "@/components/course/catalog-card";
import { Filters } from "@/components/learn/filters";
export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full lg:pt-6 pt-3">
        <div className="max-w-[1180px] w-full">
          <div className=" w-full px-4 pb-6">
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Meu catálogo
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-6">
            <CatalogCard name="ReactJS" url="/course/react-js" color="blue" />
            <CatalogCard
              name="Tailwind CSS Pro"
              url="/course/react-js"
              color="blue"
            />
          </div>
          <div className=" w-full px-4 pb-6 pt-6">
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Catálogo
            </span>
          </div>
          <div className="w-full xl:gap-10 flex">
            <Catalog />
            <main className="h-full">
              <Filters />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

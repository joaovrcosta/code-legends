import { Catalog, CatalogCard } from "@/components/course/catalog-card";
import { Filters } from "@/components/learn/filters";
import { Library, Store } from "lucide-react";
export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full lg:pt-6 pt-3">
        <div className="max-w-[1180px] w-full">
          <div className=" w-full px-0 py-6 flex space-x-2">
            <Library className="text-[#00C8FF]" />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Meu catálogo
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-6">
            <CatalogCard
              name="ReactJS"
              url="/courses/react-js"
              color="blue"
              // className="xl:h-[168px] p-0"
            />
            <CatalogCard
              name="Tailwind CSS Pro"
              url="/courses/react-js"
              color="blue"
            />
          </div>
          <div className=" w-full px-0 pb-6 pt-6 flex space-x-2">
            <Store className="text-[#00C8FF]" />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Catálogo
            </span>
          </div>
          <div className="w-full flex">
            <Catalog />
            <div className="h-full">
              <Filters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

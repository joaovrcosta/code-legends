import { Catalog, CatalogCard } from "@/components/course/catalog-card";
import { Filters } from "@/components/learn/filters";
import { Input } from "@/components/ui/input";
import { Footprints, Store } from "lucide-react";
import tailwindIcon from "../../../../public/tailwind-course-icon.svg";

export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full lg:pt-6 pt-3">
        <div className="max-w-[1180px] w-full">
          <div className=" w-full px-0 py-6 pb-4 flex space-x-2">
            <Footprints className="text-[#00C8FF]" />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Minhas trilhas
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-6">
            <CatalogCard
              name="ReactJS"
              url="/courses/react-js"
              color="blue"
              status="continue"
              isCurrent={true}
              isFavorite={true}

              // className="xl:h-[168px] p-0"
            />
            <CatalogCard
              name="Tailwind CSS Pro"
              url="/courses/react-js"
              color="blue"
              status="completed"
              image={tailwindIcon}
              isFavorite={true}
            />
          </div>
          <div className=" w-full px-0 pb-6 pt-6 flex space-x-2">
            <Store className="text-[#00C8FF]" />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
              Catálogo
            </span>
          </div>
          <div className="mb-6">
            <Input
              className="rounded-full h-[52px] lg:max-w-[312px] w-full border-[#25252A] px-4 shadow-lg"
              placeholder="Pesquisar"
            />
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

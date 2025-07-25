import { Catalog } from "@/components/course/catalog-card";
import { Filters } from "@/components/learn/filters";
import { Input } from "@/components/ui/input";
import tailwindIcon from "../../../../public/tailwind-course-icon.svg";
import { PersonalCatalog } from "@/components/course/personal-catalog-card";
import { Footprints, Store } from "lucide-react";

export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full lg:pt-6 pt-3 mt-3">
        <div className="max-w-[1180px] w-full">
          <div className=" w-full px-0 py-4 flex space-x-2 items-center">
            <Footprints className="text-[#00C8FF]" size={16} />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-sm">
              Continue de onde parou
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

              // className="xl:h-[168px] p-0"
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
          <div className=" w-full px-0 pb-4 pt-8 flex space-x-2 items-center">
            <Store className="text-[#00C8FF]" size={16} />
            <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-sm">
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

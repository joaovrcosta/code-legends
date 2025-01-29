import { CatalogCard } from "@/components/course/catalog-card";
import patternIcon from "../../../../public/pattern-icon.png";
import htmlcssIcon from "../../../../public/htmlcss-icon.svg";
import perfomanceIcon from "../../../../public/perfomance-icon.svg";

export default function CoursesPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-[1000px]">
        <div className=" w-full px-4 pb-6">
          <h4 className="text-base font-medium">Meu catálogo</h4>
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4">
          <CatalogCard name="ReactJS" />
          <CatalogCard name="Tailwind CSS Pro" />
        </div>
        <div className=" w-full px-4 pb-6 pt-6">
          <h4 className="text-base font-medium">Catálogo</h4>
        </div>
        <div className="w-full flex flex-wrap justify-start gap-4">
          <CatalogCard name="Patterns" image={patternIcon} />
          <CatalogCard name="HTML & CSS" image={htmlcssIcon} />
          <CatalogCard name="Perfomance" image={perfomanceIcon} />
          <CatalogCard className="bg-transparent" />
          <CatalogCard className="bg-transparent" />
          <CatalogCard className="bg-transparent" />
        </div>
      </div>
    </div>
  );
}

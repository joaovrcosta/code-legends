import { Catalog, CatalogCard } from "@/components/course/catalog-card";
export default function CoursesPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-[1000px]">
        <div className=" w-full px-4 pb-6">
          <h4 className="text-base font-medium">Meu catálogo</h4>
        </div>
        <div className="w-full flex flex-wrap justify-start gap-6">
          <CatalogCard name="ReactJS" url="/course/react-js" />
          <CatalogCard name="Tailwind CSS Pro" url="/course/react-js" />
        </div>
        <div className=" w-full px-4 pb-6 pt-6">
          <h4 className="text-base font-medium">Catálogo</h4>
        </div>
        <div className="w-full lg:gap-4">
          <Catalog />
        </div>
      </div>
    </div>
  );
}

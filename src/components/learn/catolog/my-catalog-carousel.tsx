import { PersonalCatalog } from "@/components/course/personal-catalog-card";
import { Plus } from "lucide-react";
import tailwindIcon from "../../../../public/tailwind-course-icon.svg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function MyCatalogCarousel() {
  return (
    <Carousel>
      <CarouselContent className="-ml-3">
        {/* Botão Adicionar */}
        <CarouselItem className="basis-auto">
          <div className="flex items-center justify-center rounded-[20px] transition-all duration-300 hover:scale-105 hover:backdrop-blur-lg cursor-pointer border bg-transparent border-[#25252A] gap-3 border-dashed text-sm px-6 hover:bg-[#25252A] h-full">
            <Plus />
            <p>Adicionar</p>
          </div>
        </CarouselItem>

        {/* Card ReactJS */}
        <CarouselItem className="basis-auto w-[380px]">
          <PersonalCatalog
            name="ReactJS"
            url="/paths/react-js"
            color="blue"
            status="continue"
            isCurrent={true}
            isFavorite={true}
            progress={32}
          />
        </CarouselItem>

        {/* Card Tailwind */}
        <CarouselItem className="basis-auto w-[380px]">
          <PersonalCatalog
            name="Tailwind CSS Pro"
            url="/paths/react-js"
            color="blue"
            status="completed"
            image={tailwindIcon}
            isFavorite={true}
            progress={100}
          />
        </CarouselItem>
      </CarouselContent>

      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

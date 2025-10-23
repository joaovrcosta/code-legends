import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CatalogCard, courses } from "@/components/course/catalog-card";

export function RecommendationsCarousel() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#121214] to-transparent z-10" />

      <Carousel>
        <CarouselContent className="w-full">
          {courses.map((course, index) => (
            <CarouselItem
              key={index}
              className="md:basis-[48%] basis-[85%] lg:basis-[28%]"
            >
              <CatalogCard
                name={course.name}
                image={course.image}
                url={course.url}
                color={course.color || "gray"}
                status={course.status}
                isCurrent={course.isCurrent}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

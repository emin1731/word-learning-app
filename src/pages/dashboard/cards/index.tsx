import { useParams } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useGetModuleById } from "@/api/queries/module.queries";
import { useGetTerms } from "@/api/queries/term.queries";
import { Button } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";
import { Flashcard } from "./flashcard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import NotFoundPage from "@/pages/not-found";
// import { useState } from "react";

export const CardsPage = () => {
  const { moduleId } = useParams();
  // const [sortBy, setSortBy] = useState<SortOptions>("date_desc");

  const { data: terms } = useGetTerms({
    moduleId: moduleId || "",
    sortBy: "date_asc",
    searchQuery: "",
  });
  const { data: module } = useGetModuleById(moduleId || "");

  if (module?.error) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center text-primary-foreground pb-4">
        {module?.data.name}
      </h1>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        keyboard={{
          enabled: true,
        }}
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper"
      >
        {terms?.data.map((item: TermDto, index: number) => (
          <SwiperSlide key={index} className="pt-14">
            <Flashcard
              item={item}
              index={index}
              numberOfTerms={terms?.data.length}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center gap-x-5">
        <Button className="arrow-left px-10">
          <ArrowBigLeft />
        </Button>
        <Button className="arrow-right px-10">
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
};

import { useParams } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useGetModuleById } from "@/api/queries/module.queries";
import { useGetTerms } from "@/api/queries/term.queries";
import { Button } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Keyboard, EffectCards } from "swiper/modules";
import NotFoundPage from "@/pages/not-found";
import { LearningCard } from "./learning-card";

export const LearningPage = () => {
  const { moduleId } = useParams();

  const { data: terms } = useGetTerms({ moduleId: moduleId || "" });
  const { data: module } = useGetModuleById(moduleId || "");

  if (module?.error) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center text-primary-foreground pb-1">
        {module?.data.name}
      </h1>
      <Swiper
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        keyboard={{
          enabled: true,
        }}
        modules={[Navigation, Keyboard, EffectCards]}
        effect="cards"
        cardsEffect={{
          slideShadows: false,
          rotate: false,
        }}
        className="mySwiper mb-8"
      >
        {terms?.data.map((item: TermDto, index: number) => (
          <SwiperSlide key={index} className="pt-6">
            <LearningCard
              item={item}
              index={index}
              numberOfTerms={terms?.data.length}
              allTerms={terms?.data}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center gap-x-5 mb-10">
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

import { useParams } from "react-router-dom";
import { useGetModuleById } from "@/api/queries/module.queries";
import { useGetTerms } from "@/api/queries/term.queries";
import { TermDto } from "@/lib/dto/term.dto";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Keyboard, EffectCards } from "swiper/modules";
import NotFoundPage from "@/pages/not-found";
import { LearningCard } from "./learning-card";
import { useRef } from "react";
import { type Swiper as SwiperRef } from "swiper";

export const LearningPage = () => {
  const swiperRef = useRef<SwiperRef>();
  const { moduleId } = useParams();

  const { data: terms } = useGetTerms({ moduleId: moduleId || "" });
  const { data: module } = useGetModuleById(moduleId || "");

  if (module?.error) {
    return <NotFoundPage />;
  }

  const nextSlide = () => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 1000);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center text-primary-foreground pb-1">
        {module?.data.name}
      </h1>
      <Swiper
        onSwiper={(swiper: SwiperRef) => {
          swiperRef.current = swiper;
        }}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        keyboard={{
          enabled: true,
        }}
        draggable={false}
        allowTouchMove={false}
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
              nextSlide={nextSlide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

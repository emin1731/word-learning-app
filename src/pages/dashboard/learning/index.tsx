import { useParams } from "react-router-dom";
import { useGetModuleById } from "@/api/queries/module.queries";
import { useGetTerms, useUpdateTerm } from "@/api/queries/term.queries";
import { TermDto } from "@/lib/dto/term.dto";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Keyboard, EffectCards } from "swiper/modules";
import NotFoundPage from "@/pages/not-found";
import { LearningCard } from "./learning-card";
import { useRef, useState } from "react";
import { type Swiper as SwiperRef } from "swiper";
import { LearningCompleted } from "./learning-completed";

export const LearningPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  // const [sortBy, setSortBy] = useState<SortOptions>("date_desc");
  const swiperRef = useRef<SwiperRef>();
  const { moduleId } = useParams();

  const { data: terms } = useGetTerms({
    moduleId: moduleId || "",
    sortBy: "date_desc",
    searchQuery: "",
  });
  const { data: module } = useGetModuleById(moduleId || "");
  const { mutateAsync: updateTerm } = useUpdateTerm();

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

  if (isComplete) {
    return <LearningCompleted terms={terms?.data} />;
  }

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
              setIsComplete={setIsComplete}
              updateTerm={updateTerm}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

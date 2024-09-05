import { useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useGetTerms } from "@/api/queries/term.queries";
import { Button } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";
import { Flashcard } from "./flashcard";

export const CardsPage = () => {
  const { moduleId } = useParams();
  const { data: terms } = useGetTerms({ moduleId: moduleId || "" });
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center text-primary-foreground pb-4">
        Name of the module
      </h1>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        keyboard={{
          enabled: true,
        }}
        // spaceBetween={10}
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
            {/* <div className="h-80 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl m-10 mb-16 mx-44 cursor-pointer">
              <div className="flex justify-between h-full">
                <div className="text-xl font-semibold block">term</div>
                <div className="text-3xl font-semibold block self-center">
                  {item.term}
                </div>
                <div className="text-xl font-semibold whitespace-nowrap">
                  {index + 1} of {terms?.data.length}
                </div>
              </div>
            </div> */}
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

// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// export const CardsPage = () => {
//   const { moduleId } = useParams();
//   return (
//     <div>
//       <h1>Cards</h1>
//       <p>Here is where you can view your cards</p>
//       <p>{moduleId}</p>
//       <div>
//         <Swiper
//           spaceBetween={50}
//           slidesPerView={3}
//           onSlideChange={() => console.log("slide change")}
//           onSwiper={(swiper) => console.log(swiper)}
//         >
//           <SwiperSlide>Slide 1</SwiperSlide>
//           <SwiperSlide>Slide 2</SwiperSlide>
//           <SwiperSlide>Slide 3</SwiperSlide>
//           <SwiperSlide>Slide 4</SwiperSlide>
//         </Swiper>
//       </div>
//     </div>
//   );
// };

import { useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useGetTerms } from "@/api/queries/term.queries";
import { TermDto } from "@/lib/dto/term.dto";

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
        keyboard={{
          enabled: true,
        }}
        spaceBetween={300}
        navigation={true}
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index} className="">
            <div className="h-48 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl m-10 mb-20 mx-14">
              {index + 1}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

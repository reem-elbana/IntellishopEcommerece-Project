import { useSwiper } from "swiper/react";

export const SwiperNavButton = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-center w-full gap-3 my-4">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-700 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
        onClick={() => swiper.slidePrev()}
        aria-label="Previous"
      >
        <i className="fa-solid fa-angle-left text-sm"></i>
      </button>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-700 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
        onClick={() => swiper.slideNext()}
        aria-label="Next"
      >
        <i className="fa-solid fa-angle-right text-sm"></i>
      </button>
    </div>
  );
};
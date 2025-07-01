import axios from "axios";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SwiperNavButton } from "./../SwiperNavButton/SwiperNavButton";

export default function Brand() {
  const { data, isLoading } = useQuery("brands", getBrand);

  async function getBrand() {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/brands");
    return response.data;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-6 px-2">
      <h2 className="text-gray-700 text-lg font-bold mb-4 tracking-wide">
        Our Brands
      </h2>
      <Swiper
        breakpoints={{
          300: { slidesPerView: 3, spaceBetween: 4 },
          640: { slidesPerView: 4, spaceBetween: 8 },
          768: { slidesPerView: 6, spaceBetween: 12 },
          1024: { slidesPerView: 8, spaceBetween: 16 },
        }}
        loop={true}
        keyboard={{ enabled: true }}
        className="pb-4"
      >
        <SwiperNavButton />
        {data?.data?.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Link to={`/BrandDetails/${brand.id}`}>
              <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full shadow-md border border-gray-200 bg-white">
                  <img
                    className="w-full h-full object-contain"
                    src={brand.logo_url} // Adjusted field from your API
                    alt={brand.name}
                  />
                </div>
                <h3 className="text-[12px] md:text-sm text-gray-800 mt-2 font-medium text-center truncate w-16 md:w-20">
                  {brand.name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SwiperNavButton } from "./../SwiperNavButton/SwiperNavButton";

export default function CategorySlider() {
  const { data, isLoading } = useQuery("Categories", getAllCategory);

  async function getAllCategory() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/categories/get-categories"
    );
    return response.data;
  }

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className="py-6 px-2">
      <h2 className="text-gray-700 text-lg font-bold mb-4 tracking-wide">
        Our Categories
      </h2>
      <Swiper
        modules={[Navigation, Keyboard]}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
        }}
        loop={true}
        keyboard={{ enabled: true }}
        navigation={false}
        className="pb-6"
      >
        <SwiperNavButton />
        {data?.data?.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/CategoryDetails/${category.id}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-60 md:h-72 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-gradient-to-b from-white via-white to-gray-100">
                  <h3 className="text-center font-semibold text-base md:text-lg text-gray-800">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

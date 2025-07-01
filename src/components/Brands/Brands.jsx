import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const navigate = useNavigate();

  // fetch all brands
  async function getAllBrands() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/brands"
    );
    return response.data.data;
  }

  const { isLoading, data } = useQuery("brands", getAllBrands);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#0ea5e9" size={50} speedMultiplier={1.5} />
      </div>
    );
  }

  return (
    <div className="md:w-[95%] mx-auto min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-wrap justify-center gap-5 px-6 mt-10 mb-10">
        {data?.map((brand) => (
          <div
            key={brand.id}
            className="w-full xs:w-[90%] sm:w-1/2 md:w-1/4 lg:w-1/5 p-3 flex justify-center"
          >
            <div
              className="w-full h-[250px] flex flex-col justify-between bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-800 transition duration-500 cursor-pointer"
              onClick={() => navigate(`/BrandDetails/${brand.id}`)}
            >
              <div className="w-full h-[200px] flex items-center justify-center p-4">
                <img
                  src={brand.logo_url || brand.image}
                  alt={brand.name}
                  className="w-full max-h-[85%] object-contain"
                />
              </div>
              <h2 className="text-lg font-medium text-center p-3 text-zinc-600 dark:text-white">
                {brand.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;


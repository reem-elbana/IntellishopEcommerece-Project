import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";

const BrandDetails = () => {
  const { id } = useParams(); // <-- use 'id' now

  const fetchBrandById = async () => {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/brands"
    );
    const brands = response.data.data;
    // find brand by id (id from URL is a string, convert to number)
    const brand = brands.find((b) => b.id === Number(id));
    if (!brand) throw new Error("Brand not found");
    return brand;
  };

  const { isLoading, error, data: brand } = useQuery(
    ["brand", id],
    fetchBrandById,
    { retry: false }
  );

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#0ea5e9" size={50} speedMultiplier={1.5} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 mt-20">
        Brand not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">{brand.name}</h1>
      <img
        src={brand.logo_url || brand.image}
        alt={brand.name}
        className="w-full max-h-96 object-contain mb-6 rounded"
      />
      <p className="text-gray-700 dark:text-gray-300">{brand.description}</p>
    </div>
  );
};

export default BrandDetails;

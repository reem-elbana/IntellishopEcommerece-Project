import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function CategoryDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(["category", id], () =>
    axios
      .get(`https://beige-alligator-527710.hostingersite.com/public/api/categories/categories/${id}`)
      .then((res) => res.data)
  );

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Something went wrong!</div>;

  const category = data?.data;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-72 md:h-80 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {category.name}
          </h2>
        </div>
      </div>
    </div>
  );
}

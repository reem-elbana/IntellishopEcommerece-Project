import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";
import { AuthContext } from "../../Context/AuthContext";

const Products = () => {
  const { addProductToCart } = useContext(cartContext);
  const { token } = useContext(AuthContext);

  const [isLoad, setisLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function addToCart(id) {
    setisLoad(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success('It has been successfully added.', {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    } else {
      toast.error("Error! Can't add product to cart", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    }
    setisLoad(false);
  }

  async function getAllProduct() {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/products");
    return response.data;
  }

  async function fetchSearchResults(searchTerm) {
    const response = await axios.get(
      `https://beige-alligator-527710.hostingersite.com/public/api/search?search=${encodeURIComponent(searchTerm)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async function fetchRecommendations() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/all-recommendations",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  const { data: allProductsData, isLoading: isLoadingAll } = useQuery("products", getAllProduct);

  const { data: searchData, isLoading: isSearching } = useQuery(
    ["search", searchTerm],
    () => fetchSearchResults(searchTerm),
    {
      enabled: !!token && searchTerm.length >= 3,
    }
  );

  const { data: recommendationsData, isLoading: isRecommending } = useQuery(
    "recommendations",
    fetchRecommendations,
    {
      enabled: !!token,
    }
  );

  const isLoading = isLoadingAll || isSearching || isRecommending;
   console.log("Recommendations response in product:", recommendationsData);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const products = searchTerm && searchTerm.length >= 3
    ? searchData?.data || []
    : allProductsData?.data || [];

  return (
    <div className="md:w-[90%] mx-auto bg-white dark:bg-gray-900">
      {/* Search Input */}
      <input
        type="search"
        className="bg-slate-50 dark:bg-gray-800 border text-base placeholder-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg block md:w-[80%] w-[70%] ms-16 mt-20 p-2.5"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Recommendations */}
      {!searchTerm && recommendationsData?.data?.length > 0 && (
        <div className="my-10">
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-yellow-400 mb-6">
            Recommended For You
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            {recommendationsData.data.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
                <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-yellow-400 transition-all duration-700 rounded-lg group bg-white dark:bg-gray-800">
                  <Link to={`/ProductDetails/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                    <h3 className="mt-3 text-blue-500">{product.category?.name}</h3>
                    <h3 className="mt-3 font-medium">{product.name}</h3>
                    <div className="mt-3 flex justify-between items-center">
                      <h3>{product.price} {product.currency}</h3>
                      <div><i className="fa-solid fa-star text-yellow-500"></i> {product.rating}</div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
            <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-blue-700 transition-all duration-700 rounded-lg group bg-white dark:bg-gray-800">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                <h3 className="mt-3 text-blue-500">{product.category?.name}</h3>
                <h3 className="mt-3 font-medium">{product.name}</h3>
                <div className="mt-3 flex justify-between items-center">
                  <h3>{product.price} {product.currency}</h3>
                  <div><i className="fa-solid fa-star text-yellow-500"></i> {product.rating}</div>
                </div>
              </Link>
              <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-700 border text-white font-medium rounded-lg px-6 py-2 md:w-[70%] sm:w-[70%] text-center sm:py-3 md:py-2 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoad}
                >
                  {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "+ Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

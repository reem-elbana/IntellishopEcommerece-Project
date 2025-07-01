import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import AllBrands from "./../AllBrands/AllBrands";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";
import { wishlistContext } from "../WishListContext/WishListContext";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const { token } = useContext(AuthContext);

  const [isLoad, setIsLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistItems, setWishlistItems] = useState(new Set());

  async function addToCart(id) {
    setIsLoad(true);
    const result = await addProductToCart(id);
    if (result.success) {
      toast.success(result.message, {
        style: { background: "#0A1172", color: "white", width: "500px", height: "60px" },
      });
    } else {
      toast.error(result.message, {
        style: { background: "#FF0000", color: "white", width: "500px", height: "60px" },
      });
    }
    setIsLoad(false);
  }

  async function addToWishList(id) {
    setIsLoad(true);
    try {
      const data = await addToWishlist(id);
      if (data?.message === "Product added to wishlist successfully.") {
        setWishlistItems((prev) => new Set([...prev, id]));
        toast.success("Added to Wishlist!", {
          style: { background: "#0A1172", color: "white" },
        });
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch {
      toast.error("Error adding to wishlist.");
    }
    setIsLoad(false);
  }

  async function getAllProduct() {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/products");
    return response.data;
  }

  async function fetchSearchResults(searchTerm) {
    const response = await axios.get(
      `https://beige-alligator-527710.hostingersite.com/public/api/search?search=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  async function fetchRecommendations() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/all-recommendations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  const { isLoading, data, isError, error } = useQuery("products", getAllProduct);
  

  const {
    data: searchData,
    isLoading: isSearching,
  } = useQuery(["search", searchTerm], () => fetchSearchResults(searchTerm), {
    enabled: token && searchTerm.length >= 3,
  });

  const {
    data: recommendationsData,
    isLoading: isRecommending,
  } = useQuery("recommendations", fetchRecommendations, {
    enabled: !!token,
  });
  console.log("Recommendations response:", recommendationsData);


  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 bg-gray-100">
        Error loading products: {error.message}
      </div>
    );
  }

  const products = searchTerm ? searchData?.data || [] : data?.data || [];

  return (
    <div className="md:w-[90%] mx-auto dark:bg-gray-900 dark:text-white">
      <HomeSlider />
      <hr />
      <CategorySlider />

      <input
        type="search"
        className="bg-slate-50 dark:bg-gray-800 dark:text-white border text-base placeholder-gray-700 rounded-lg block md:w-[80%] w-[70%] ms-16 mt-20 p-2.5"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!searchTerm && recommendationsData?.data?.length > 0 && (
        <div className="my-10">
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-yellow-400 mb-6">
            Recommended For You
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            {recommendationsData.data.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
                <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-yellow-400 transition-all duration-700 rounded-lg group dark:bg-gray-800">
                  <Link to={`/ProductDetails/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                    <h3 className="mt-3 text-blue-500">{product.category?.name}</h3>
                    <h3 className="mt-3 font-medium">{product.name}</h3>
                    <div className="mt-3 flex justify-between items-center">
                      <h3>{product.total_price} EGP</h3>
                      <div>
                        <i className="fa-solid fa-star text-yellow-500"></i>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => addToWishList(product.id)}
                    className="absolute top-4 right-4 text-xl"
                  >
                    <i className={`fa-heart ${wishlistItems.has(product.id)
                      ? "fa-solid text-red-500"
                      : "fa-regular text-gray-400"
                      } hover:text-red-500 transition-all duration-300`}></i>
                  </button>

                  <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-yellow-500 border text-white font-medium rounded-lg px-6 py-2 md:w-[70%] sm:w-[70%] text-center sm:py-3 md:py-2"
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
      )}

      <div className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
            <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-blue-800 transition-all duration-700 rounded-lg group dark:bg-gray-800">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full" />
                <h3 className="mt-3 text-blue-500">{product.category?.name}</h3>
                <h3 className="mt-3 font-medium">{product.name}</h3>
                <div className="mt-3 flex flex-wrap justify-between items-center">
                  <h3>{product.price} EGP</h3>
                  <div>
                    <i className="fa-solid fa-star text-yellow-500"></i>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => addToWishList(product.id)}
                className="absolute top-4 right-4 text-xl"
              >
                <i className={`fa-heart ${wishlistItems.has(product.id)
                  ? "fa-solid text-red-500"
                  : "fa-regular text-gray-400"
                  } hover:text-red-500 transition-all duration-300`}></i>
              </button>

              <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-700 border text-white font-medium rounded-lg px-6 py-2 md:w-[70%] sm:w-[70%] text-center sm:py-3 md:py-2"
                  disabled={isLoad}
                >
                  {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "+ Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AllBrands />
    </div>
  );
};

export default Home;

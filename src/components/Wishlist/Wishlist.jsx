import { useContext } from "react";
import { wishlistContext } from "../WishListContext/WishListContext";
import { CircleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, isLoad } = useContext(wishlistContext);
  const { addProductToCart } = useContext(cartContext);
  async function addToCart(id) {
    try {
      const data = await addProductToCart(id);

      // Log the entire response for debugging
      console.log(data);

      if (data?.success) {
        // Check if 'data' exists in the response and has a successful 'status'
        toast.success(data?.message || "Product has been successfully added.", {
          style: {
            background: "#0A1172",
            color: "white",
          },
        });
      } else {
        // If not successful, use the provided message or fallback to a default error message
        const errorMessage = data?.message || "Error! Can't add product to cart.";
        toast.error(errorMessage, {
          style: {
            background: "#D32F2F", // Red background for error
            color: "white",
          },
        });
      }
    } catch (error) {
      // If the API fails due to a network or other error
      toast.error("Network error! Please try again later.", {
        style: {
          background: "#D32F2F", // Red background for error
          color: "white",
        },
      });
      console.error("Error adding product to cart:", error); // Log for debugging
    }
  }


  if (isLoad) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  return (

    <div className="py-5 mx-auto md:w-[85%] mt-16 shadow-xl shadow-gray-500 dark:bg-gray-900 px-4 sm:px-6">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="font-semibold text-2xl sm:text-3xl text-gray-800 dark:text-white">
            Your Wishlist
          </h1>
          <p className="text-gray-500 mt-2 text-lg dark:text-gray-300">
            Your wishlist is empty.
          </p>
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-2xl sm:text-3xl mt-5 ms-3 text-center sm:text-left text-gray-800 dark:text-white">
            My Wishlist ({wishlist.length} items)
          </h1>

          {/* Wishlist Items */}
          <div className="mt-5 space-y-5">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-12 items-center border-b border-gray-200 dark:border-gray-700 pb-5"
              >
                {/* Product Image */}
                <div className="sm:col-span-2 flex justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-28 sm:w-32 rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="sm:col-span-6 p-4 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">
                    {item.product.name}
                  </h3>
                  <h3 className="text-md sm:text-lg font-medium mt-1 text-gray-600 dark:text-gray-400">
                    {item.product.total_price} EGP
                  </h3>

                  {/* Remove Button */}
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <i className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
                    <button
                      onClick={() => removeFromWishlist(item.product.id)}
                      className="text-red-600 font-normal ml-2 hover:underline transition duration-300 dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="sm:col-span-4 flex justify-center sm:justify-end p-4">
                  <button
                    onClick={() => addToCart(item.product.id)}
                    className="border border-blue-600 text-black font-normal hover:bg-blue-600 hover:text-white rounded-lg px-5 h-10 flex items-center justify-center text-lg transition duration-500 dark:border-blue-500 dark:text-white dark:hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Wishlist Button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={clearWishlist}
              className="border border-red-600 text-red-600 font-normal hover:bg-red-600 hover:text-white rounded-lg w-[50%] sm:w-[20%] h-10 flex items-center justify-center text-lg transition duration-500 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>

  );
};

export default Wishlist;
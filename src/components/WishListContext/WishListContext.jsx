import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../CartContext/CartContext";

export const wishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { addProductToCart } = useContext(cartContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  // ✅ Fetch Wishlist
  async function getUserWishlist() {
    setIsLoad(true);
    try {
      const { data } = await axios.get(
        "https://beige-alligator-527710.hostingersite.com/public/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setWishlist(data.data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching wishlist:", error.response || error);
    }
    setIsLoad(false);
  }

  // ✅ Add Product to Wishlist
  async function addToWishlist(id) {
    try {
      const { data } = await axios.post(
        "https://beige-alligator-527710.hostingersite.com/public/api/wishlist",
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUserWishlist();
      return data;
    } catch (error) {
      console.error("Error adding to wishlist:", error.response || error);
    }
  }

async function removeFromWishlist(id) {
     

  try {
    await axios.delete(
      `https://beige-alligator-527710.hostingersite.com/public/api/wishlist/${id}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
setWishlist((prev) => prev.filter(item => item.product.id !== id));
 } 
catch (error) {
    console.error("Backend failed to remove wishlist item:", error.response || error);
  }
}

async function clearWishlist() {
  if (wishlist.length === 0) {
    alert("Wishlist is already empty.");
    return;
  }

  const confirmed = window.confirm("Are you sure you want to clear your wishlist?");
  if (!confirmed) return;

  try {
    await axios.delete(
      "https://beige-alligator-527710.hostingersite.com/public/api/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWishlist([]);
    alert("Your wishlist has been cleared successfully.");
    console.log("Wishlist cleared.");
  } catch (error) {
    console.error("Error clearing wishlist:", error.response || error);
    alert("Something went wrong while clearing your wishlist. Please try again.");
  }
}



  // ✅ Move from Wishlist to Cart
  async function moveToCart(productId) {
    try {
      await addProductToCart(productId);
      const item = wishlist.find((item) => item.product_id === productId);
      if (item) {
        await removeFromWishlist(item.id);
      }
    } catch (error) {
      console.error("Error moving item to cart:", error.response || error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserWishlist();
    }
  }, [token]);

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
        isLoad,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export default WishlistContextProvider;

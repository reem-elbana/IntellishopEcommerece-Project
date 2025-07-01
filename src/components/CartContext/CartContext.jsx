import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";
import { AuthContext } from "./../../Context/AuthContext";


export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [product, setProduct] = useState([]);
    const [numOfItems, setNumOfItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [cartId, setCartId] = useState(null);

    async function addProductToCart(productId, quantity = 1) {
        try {
            const { data } = await axios.post(
                "https://beige-alligator-527710.hostingersite.com/public/api/cart/add",
                { product_id: productId, quantity },
                {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Add to Cart Response:", data); // Log the complete response

          
            getUserCart(); 
            return { success: true, message: data.message || "Product added to cart!", data };

        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error);
 
            return {
                success: false,
                message: error.response?.data?.message || "Error adding product to cart. Please try again.",
            };
        }
    }


    async function getUserCart() {
        setIsLoad(true);
        try {
            const { data } = await axios.get(
                "https://beige-alligator-527710.hostingersite.com/public/api/cart",
                {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
                        Accept: "application/json",
                    },
                }
            );

            const items = data.data.items || [];
            const total = items.reduce((acc, item) => acc + parseFloat(item.total), 0);

            setNumOfItems(items.length);
            setProduct(items);
            setTotalPrice(total.toFixed(2));
            setCartId(data.data.id);
            console.log(data)

        } catch (error) {
            console.error("Error fetching user cart:", error.response?.data || error);
        } finally {
            setIsLoad(false);
        }
    }

   
    
async function updateCount(id, count) {
  try {
    const { data } = await axios.put(
      `https://beige-alligator-527710.hostingersite.com/public/api/cart/${id}`, // assuming this is the correct endpoint
      {
        product_id: id,
        quantity: count,
      },
      {
        headers: {
        //   Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    
    //  const updatedItems = product.filter(item => item.product.id !== id);
    //  const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + parseFloat(item.total), 0);

    //         setProduct(updatedItems);
    //         setNumOfItems(updatedItems.length);
    //         setTotalPrice(updatedTotalPrice.toFixed(2));
       setNumOfItems(data[{}].product.id.length)
       setProduct(data[{}].product.id)
       setTotalPrice(data[{}].product.total_price.toFixed(2))

  } catch (error) {
    console.error("Error updating item count:", error.response?.data || error);
  }
}

// async function updateCount(id, count) {
//   try {
//     // Update the specific item quantity in the cart
//     const { data } = await axios.post(
//       `https://beige-alligator-527710.hostingersite.com/public/api/cart/add/${id}`,
//       {
//         product_id: id,
//         quantity: count,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Once the item is updated, fetch the updated cart data
//     setNumOfItems(data.data.items.length);
//     setProduct(data.data.items);
//     setTotalPrice(data.data.total);

//   } catch (error) {
//     console.error("Error updating item count:", error.response?.data || error);
//   }
// }


    async function clearItem(id) {
        try {

            const { data } = await axios.post(
                "https://beige-alligator-527710.hostingersite.com/public/api/cart/remove",
                { product_id: id },
                {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const updatedItems = product.filter(item => item.product.id !== id);
            const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + parseFloat(item.total), 0);

            setProduct(updatedItems);
            setNumOfItems(updatedItems.length);
            setTotalPrice(updatedTotalPrice.toFixed(2));

        } catch (error) {
            console.error("Error removing item from cart:", error.response?.data || error);
        }
    }
async function clearCart() {
  try {
    const { data } = await axios.delete(
      "https://beige-alligator-527710.hostingersite.com/public/api/cart/delete", // Use correct endpoint
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          Accept: "application/json",
        },
      }
    );

    // Refresh state only after success
    setNumOfItems(0);
    setProduct([]);
    setTotalPrice(0);

    console.log("Cart cleared:", data);
  } catch (error) {
    console.error("Error clearing cart:", error.response?.data || error);
  }
}

    useEffect(() => {
        if (token !== null) {getUserCart();}
    }, [token]);

    return (
        <cartContext.Provider
            value={{
                addProductToCart,
                product,
                numOfItems,
                totalPrice,
                isLoad,
                updateCount,
                clearItem,
                clearCart,
                cartId,
                setNumOfItems,
                setProduct,
                setTotalPrice,
            }}
        >
            {children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;

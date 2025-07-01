import { createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Wishlist from "./components/Wishlist/Wishlist";
import Products from "./components/Products/Products";
import AuthContextProvider from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from "./components/CartContext/CartContext";
import Payment from './components/Payment/Payment';
import AllOrders from "./components/AllOrders/AllOrders";
import OrderDetails from "./components/OrderDetails/OrderDetails.jsx";
import WishlistContextProvider from "./components/WishListContext/WishListContext";
import AboutUs from './components/AboutUs/AboutUs';
import BrandDetails from "./components/BrandDetails/BrandDetails.jsx"; 
import CategoryDetails from "./components/CategoryDetails/CategoryDetails.jsx" 
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { SearchProvider } from "./Context/SearchContext";


const App = () => {


  const x = new QueryClient()
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "ProductDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "OrderDetails/:id", element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "allOrders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "category", element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "product", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "/BrandDetails/:id", element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
        {path: "/CategoryDetails/:id" , element: <ProtectedRoute><CategoryDetails /></ProtectedRoute>},
        { path: "about", element: <ProtectedRoute><AboutUs /></ProtectedRoute> },
        { path: "/forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
   <SearchProvider>
    <QueryClientProvider client={x}>
      <AuthContextProvider>

        <CartContextProvider>
          <WishlistContextProvider>

            <Toaster position="top-right" />
            <RouterProvider router={router} />

          </WishlistContextProvider>
        </CartContextProvider>

      </AuthContextProvider>
    </QueryClientProvider>
    </SearchProvider>

    
  );
};

export default App;

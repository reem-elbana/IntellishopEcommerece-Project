
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from "yup";
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';



const Footer = () => {



  const Home = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),

  });

  async function Signin(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      toast.success(data.message);
      Home("/");

      setIsLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validYup,
    onSubmit: Signin,
  });


  return (
  

    // <div className="bg-[#004182] dark:bg-gray-900 w-full text-white dark:text-gray-300 shadow-md dark:shadow-2xl dark:shadow-gray-200">
    //   <div className="flex flex-row justify-start items-center mt-[6%] ">
    //     <div className="w-full pb-[3%] flex flex-row justify-start items-start ps-24 pt-16">
    //       {/* Intellishop Column */}
    //       <div className="w-1/5">
    //         <h1 className="text-xl font-semibold text-white dark:text-gray-100">Intellishop</h1>
    //         <h2 className="pt-3 text-lg dark:text-gray-200">Subscribe</h2>
    //         <h4 className="text-md pt-3 font-light dark:text-gray-300">
    //           Get 10% off your first order
    //         </h4>

    //         <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5 pt-5">
    //           <div>
    //             <input
    //               type="email"
    //               id="email"
    //               onChange={formik.handleChange}
    //               value={formik.values.email}
    //               placeholder="Enter your email"
    //               className="bg-[#004182] dark:bg-gray-900 py-2 border-b-2 border-b-zinc-400 dark:border-b-gray-600 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 ps-2 placeholder-gray-400 transition-transform duration-300 transform focus:scale-[104%]"
    //             />
    //             <button
    //               type="submit"
    //               className="bg-[#004182] dark:bg-gray-800  hover:bg-blue-800 dark:hover:bg-gray-800 text-white font-sm focus:outline-none text-base w-full sm:w-auto px-5 py-3 text-center transition duration-300  dark:focus:bg-gray-800 dark:text-white"
    //             >
    //               {isLoading ? (
    //                 <i className="fa-solid fa-spin fa-spinner text-white"></i>
    //               ) : (
    //                 <i className="fa-solid fa-paper-plane text-slate-300 dark:text-gray-00 "></i>
    //               )}
    //             </button>

    //             {formik.touched.email && formik.errors.email && (
    //               <div className="bg-red-100 dark:bg-red-800 p-3 rounded-lg mt-4 text-red-500 dark:text-white border-red-300 dark:border-red-600 border">
    //                 {formik.errors.email}
    //               </div>
    //             )}
    //           </div>
    //         </form>
    //       </div>

    //       {/* Support Column */}
    //       <div className="w-1/5">
    //         <h1 className="text-xl font-semibold dark:text-gray-100">Support</h1>
    //         <p className="pt-3 text-md font-light dark:text-gray-300">
    //           111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
    //         </p>
    //         <p className="pt-3 text-md font-light dark:text-gray-300">Intellishop@gmail.com</p>
    //         <p className="pt-3 text-md font-light dark:text-gray-300">+88015-88888-9999</p>
    //       </div>

    //       {/* Account Column */}
    //       <div className="w-1/5">
    //         <h1 className="text-xl font-semibold dark:text-gray-100">Account</h1>
    //         {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item) => (
    //           <p key={item} className="pt-3 text-md font-light dark:text-gray-300">
    //             {item}
    //           </p>
    //         ))}
    //       </div>

    //       {/* Quick Link Column */}
    //       <div className="w-1/5">
    //         <h1 className="text-xl font-semibold dark:text-gray-100">Quick Link</h1>
    //         {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
    //           <p key={item} className="pt-3 text-md font-light dark:text-gray-300">
    //             {item}
    //           </p>
    //         ))}
    //       </div>

    //       {/* Download App Column */}
    //       <div className="w-1/5">
    //         <h1 className="text-xl font-semibold dark:text-gray-100">Download App</h1>
    //         <p className="pt-3 text-md font-light dark:text-gray-300">
    //           Save $3 with App New User Only
    //         </p>
    //         <div className="flex flex-row justify-start items-center mt-5 space-x-5">
    //           <i className="fa-brands fa-facebook-f text-white dark:text-gray-300"></i>
    //           <i className="fa-brands fa-twitter text-white dark:text-gray-300"></i>
    //           <i className="fa-brands fa-instagram text-white dark:text-gray-300"></i>
    //           <i className="fa-brands fa-linkedin-in text-white dark:text-gray-300"></i>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Footer Bottom */}
    //   <div className="flex justify-center items-center pb-3">
    //     <div className="border-t-2 border-t-[#2058A7] dark:border-t-gray-700 w-full flex justify-center items-center pt-5 pb-3">
    //       <i className="fa-regular fa-copyright pt-[2.5px] text-[#2058A7] dark:text-gray-500"></i>
    //       <h1 className="text-[#2058A7] dark:text-gray-400 ps-2">
    //         Copyright Rimel 2022. All right reserved
    //       </h1>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-[#004182] dark:bg-gray-900 w-full text-white dark:text-gray-300 shadow-md dark:shadow-2xl dark:shadow-gray-200">
  <div className="flex flex-col md:flex-row justify-start items-start mt-[6%] px-5 sm:px-2 pt-14 pb-10 ms-14">
    {/* Intellishop Column */}
    <div className="w-full md:w-1/5 mb-5 md:mb-0">
      <h1 className="text-xl font-semibold text-white dark:text-gray-100">Intellishop</h1>
      <h2 className="pt-3 text-lg dark:text-gray-200">Subscribe</h2>
      <h4 className="text-md pt-3 font-light dark:text-gray-300">
        Get 10% off your first order
      </h4>

      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5 pt-5">
        <div>
          <input
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
            className="bg-[#004182] dark:bg-gray-900 py-2 border-b-2 border-b-zinc-400 dark:border-b-gray-600 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 ps-2 placeholder-gray-400 transition-transform duration-300 transform focus:scale-[104%]"
          />
          <button
            type="submit"
            className="bg-[#004182] dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-800 text-white font-sm focus:outline-none text-base sm:w-auto px-5 py-3 text-center transition duration-300 dark:focus:bg-gray-800 dark:text-white"
          >
            {isLoading ? (
              <i className="fa-solid fa-spin fa-spinner text-white"></i>
            ) : (
              <i className="fa-solid fa-paper-plane text-slate-300 dark:text-gray-00 "></i>
            )}
          </button>

          {formik.touched.email && formik.errors.email && (
            <div className="bg-red-100 dark:bg-red-800 p-3 rounded-lg mt-4 text-red-500 dark:text-white border-red-300 dark:border-red-600 border">
              {formik.errors.email}
            </div>
          )}
        </div>
      </form>
    </div>

    {/* Support Column */}
    <div className="w-full md:w-1/5 mb-5 md:mb-0">
      <h1 className="text-xl font-semibold dark:text-gray-100">Support</h1>
      <p className="pt-3 text-md font-light dark:text-gray-300">
        111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
      </p>
      <p className="pt-3 text-md font-light dark:text-gray-300">Intellishop@gmail.com</p>
      <p className="pt-3 text-md font-light dark:text-gray-300">+88015-88888-9999</p>
    </div>

    {/* Account Column */}
    <div className="w-full md:w-1/5 mb-5 md:mb-0">
      <h1 className="text-xl font-semibold dark:text-gray-100">Account</h1>
      {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item) => (
        <p key={item} className="pt-3 text-md font-light dark:text-gray-300">
          {item}
        </p>
      ))}
    </div>

    {/* Quick Link Column */}
    <div className="w-full md:w-1/5 mb-5 md:mb-0">
      <h1 className="text-xl font-semibold dark:text-gray-100">Quick Link</h1>
      {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
        <p key={item} className="pt-3 text-md font-light dark:text-gray-300">
          {item}
        </p>
      ))}
    </div>

    {/* Download App Column */}
    <div className="w-full md:w-1/5 mb-5 md:mb-0">
      <h1 className="text-xl font-semibold dark:text-gray-100">Download App</h1>
      <p className="pt-3 text-md font-light dark:text-gray-300">
        Save $3 with App New User Only
      </p>
      <div className="flex flex-row justify-start items-center mt-5 space-x-5">
        <i className="fa-brands fa-facebook-f text-white dark:text-gray-300"></i>
        <i className="fa-brands fa-twitter text-white dark:text-gray-300"></i>
        <i className="fa-brands fa-instagram text-white dark:text-gray-300"></i>
        <i className="fa-brands fa-linkedin-in text-white dark:text-gray-300"></i>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="flex justify-center items-center pb-3">
    <div className="border-t-2 border-t-[#2058A7] dark:border-t-gray-700 w-full flex justify-center items-center pt-5 pb-3">
      <i className="fa-regular fa-copyright pt-[2.5px] text-[#2058A7] dark:text-gray-500"></i>
      <h1 className="text-[#2058A7] dark:text-gray-400 ps-2">
        Copyright Rimel 2022. All right reserved
      </h1>
    </div>
  </div>
</div>


  )
}

export default Footer

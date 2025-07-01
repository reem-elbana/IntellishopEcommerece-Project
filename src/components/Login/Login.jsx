
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import phone from "../../assets/images/phoneimg.jpeg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 


const Login = () => {
  const home = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: "",
    password: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
      password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
  });

  async function Signin(values) {
    setIsLoading(true);
    try {
      // const { data } = await axios.post(
      //   "https://ecommerce.routemisr.com/api/v1/auth/signin",
      //   values
      // );
      const { data } = await axios.post(
        "https://beige-alligator-527710.hostingersite.com/public/api/auth/login",
        values
      );

      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      toast.success(data.message);
      home("/");
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

<div className="flex flex-col md:flex-row mt-10">
  {/* Left: Image Animation */}
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex justify-center md:justify-start items-center w-full md:w-1/2 mb-8 md:mb-0 "
  >
    <img
      src={phone}
      alt="Shopping Experience"
      className="w-full h-auto object-cover rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl"
    />
  </motion.div>

  {/* Right: Form Animation */}
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    className="flex flex-col justify-center items-start w-full md:w-1/2 px-8 md:px-16"
  >
    <h1 className="text-2xl font-semibold ">Login To Intellishop</h1>
    <h3 className="pt-3 text-lg">Enter your details below</h3>

    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5 pt-5 sm:w-[65%] w-full ">
      {/* Email Input */}
      <div className="w-full">
        <input
          type="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter your email"
          className="w-full py-3 px-4 border-b-2 border-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 dark:bg-gray-900 dark:placeholder-gray-400 placeholder-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-[102%] focus:scale-[104%]"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {formik.errors.email}
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="w-full">
        <input
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Enter your password"
          className="w-full py-3 px-4 border-b-2 border-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 dark:bg-gray-900 dark:placeholder-gray-400 placeholder-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-[102%] focus:scale-[104%]"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* Submit + Forget Password */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-3 w-full ">
        <button
          type="submit"
          className="bg-[#004182] w-full sm:w-auto text-white font-sm  focus:outline-none mt-3 hover:bg-blue-700 focus:bg-blue-800 focus:text-white rounded-md text-base px-5 py-3 text-center dark:bg-gray-700 dark:hover:bg-gray-800 transition duration-300 dark:border-gray-600 dark:focus:bg-gray-800 dark:text-white"
        >
          {isLoading ? (
            <i className="fa-solid fa-spin fa-spinner text-white"></i>
          ) : (
            "Login Now"
          )}
        </button>

        <Link
         to="/ForgetPassword"
         className="font-medium hover:text-red-800 transition duration-300 text-md text-red-600 ps-8 pt-3 dark:text-red-600 dark:hover:text-red-800 sm:mb-0 mb-2 ">
         Forget your password?
        </Link>
      </div>
    </form>
  </motion.div>
</div>



  );
};

export default Login;
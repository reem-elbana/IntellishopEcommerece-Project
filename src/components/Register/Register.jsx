import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import phone from "../../assets/images/phoneimg.jpeg";
import { motion } from "framer-motion";



const Register = () => {
  const login = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const user = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   rePassword: "",
  //   phone: "",
  // };
  const user = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // phone: "",
  };

  const validYup = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum chars is 3")
      .max(15, "Maximum chars is 15"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
      password_confirmation: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Repassword doesn't match password"),
    
  });

  async function Signup(values) {
    setIsLoading(true);
    try {
      // const { data } = await axios.post(
      //   "https://ecommerce.routemisr.com/api/v1/auth/signup",
      //   values
      // );
      const { data } = await axios.post(
        "https://beige-alligator-527710.hostingersite.com/public/api/auth/register",
        values
      );
      toast.success(data.message);
      login("/login");
      setIsLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validYup,
    onSubmit: Signup,
  });

  return (

<div className="flex flex-col md:flex-row mt-10">
  {/* Left Side Image Animation */}
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex justify-center md:justify-start items-center w-full md:w-1/2 mb-8 md:mb-0"
  >
    <img
      src={phone}
      alt="Shopping Experience"
      className="w-full h-auto object-cover rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl"
    />
  </motion.div>

  {/* Right Side Form Animation */}
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    className="flex flex-col justify-center items-start w-full md:w-1/2 px-8 md:px-16"
  >
    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Create an account</h1>
    <h3 className="pt-3 text-gray-600 dark:text-gray-400">Enter your details below</h3>

    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4  sm:w-[65%] w-full mt-6">
      {/* Name Input */}
      <div className="w-full">
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          id="name"
          placeholder="Enter your name"
          className="w-full py-3 px-4 border-b-2 border-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 dark:bg-gray-900 dark:placeholder-gray-400 placeholder-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-[102%] focus:scale-[104%]"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {formik.errors.name}
          </div>
        )}
      </div>

      {/* Email Input */}
      <div className="w-full">
        <input
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
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
          onChange={formik.handleChange}
          value={formik.values.password}
          id="password"
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

      {/* Re-enter Password Input */}
      <div className="w-full">
        <input
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password_confirmation}
          id="password_confirmation"
          placeholder="Re-enter password"
          className="w-full py-3 px-4 border-b-2 border-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 dark:bg-gray-900 dark:placeholder-gray-400 placeholder-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-[102%] focus:scale-[104%]"
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
          <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {formik.errors.password_confirmation}
          </div>
        )}
      </div>

      {/* Phone Input */}
      {/* <div className="w-full">
        <input
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.phone}
          id="phone"
          placeholder="Enter your phone"
          className="w-full py-3 px-4 border-b-2 border-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 dark:bg-gray-900 dark:placeholder-gray-400 placeholder-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-[102%] focus:scale-[104%]"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
            <i className="fa-solid fa-exclamation-circle mr-2"></i>
            {formik.errors.phone}
          </div>
        )}
      </div> */}

      {/* Submit Button */}


      <div className="w-full mt-6">
        <button
          type="submit"
          className="bg-[#2058A7] w-full text-white font-semibold rounded-lg py-3 focus:outline-none hover:bg-blue-700 focus:bg-blue-800 transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          {isLoading ? (
            <i className="fa-solid fa-spin fa-spinner text-white"></i>
          ) : (
            "Create Account"
          )}
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-5">
        Already have an account?
        <NavLink
          to="/login"
          className="hover:text-blue-600 dark:hover:text-blue-400 ps-2 font-semibold underline transition duration-300"
        >
          Login
        </NavLink>
      </div>
    </form>
  </motion.div>
</div>

);
}
export default Register;

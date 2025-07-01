// pages/ResetPassword.jsx
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum 8 characters, at least one letter and one number"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );
        toast.success("Password reset successfully");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error resetting password");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Reset Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="w-full py-2 px-4 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

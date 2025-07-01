
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        if (data.statusMsg === "success") {
          toast.success("Code sent to your email.");
          navigate("/VerifyCode", { state: { email: values.email } });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Forgot Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
          Send Code
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;

// pages/VerifyCode.jsx
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        if (data.status === "Success") {
          toast.success("Code verified successfully");
          navigate("/ResetPassword", { state: { email } });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid code");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Verify Code</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="resetCode"
          placeholder="Enter the code from your email"
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="w-full py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800">
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;

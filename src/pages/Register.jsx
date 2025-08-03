import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { manageUiSelector } from "../slices/manageUI/uiStateSelector";
import { updateLoading } from "../slices/manageUI/uiStateSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(manageUiSelector);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isEmailValid = formData.email.match(/^\S+@\S+\.\S+$/);
  const isPasswordValid = formData.password.length >= 6;
  const isNameValid = /^[A-Za-z\s]+$/.test(formData.name.trim());

  const isFormValid =
    formData.name.trim() && isEmailValid && isPasswordValid && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateLoading(true));

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      const userData = res?.data?.data;

      if (userData?.token) {
        localStorage.setItem("token", userData.token);
        toast.success(res?.data?.message || "Registration successful!");
        navigate("/");
      } else {
        toast.error("Invalid registration response");
      }
    } catch (err) {
      console.error("Register failed:", err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      dispatch(updateLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-[#EFA893] justify-center px-4">
      <div className="relative w-full max-w-sm bg-[#2C003E] text-white rounded-3xl overflow-hidden shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Register</h2>
        <p className="mb-6 text-gray-200">Let’s get you started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-4 py-2 rounded-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {!isNameValid && formData.name && (
              <p className="text-pink-300 text-sm mt-1">Enter a valid name</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {!isEmailValid && formData.email && (
              <p className="text-pink-300 text-sm mt-1">Enter a valid email</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-2.5 text-gray-500"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
            {!isPasswordValid && formData.password && (
              <p className="text-pink-300 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded-full font-semibold text-white transition-all duration-200 ${
              !isFormValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-300 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

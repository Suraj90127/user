// Signup.jsx
import React, { useEffect, useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaWhatsapp, FaEnvelope, FaPhone, FaGift, FaUserPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineLogin, MdLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, getWhatsappNumber } from "../redux/reducer/authReducer";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    promoCode: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { whatsappNumber, whatsappLoading, loading } = useSelector(
    (state) => state.auth
  );

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const result = await dispatch(registerUser({
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        promoCode: formData.promoCode || undefined,
      }));

      if (result?.payload?.success) {
        toast.success(result.payload.message || "Registration successful! Please login.");
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      } else {
        toast.error(result?.payload?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  // Fetch WhatsApp number
  useEffect(() => {
    // dispatch(getWhatsappNumber());
  }, [dispatch]);

  // Handle WhatsApp registration
  const handleWhatsapp = () => {
    if (!whatsappNumber) {
      toast.error("WhatsApp number not available");
      return;
    }
    // Pre-fill message with user details
    const message = `Hi! I want to register on REDDY platform.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPromo Code: ${formData.promoCode || "Not provided"}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-y-auto bg-black font-sans py-0">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/rGyRyRhk/cricket-bg-5f7754fd8ce52985a289.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

      {/* Signup Box */}
      <div className="relative z-10 sm:w-[100%] md:w-[500px] backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] my-4">
        {/* Close */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <IoMdClose size={24} />
        </Link>

        {/* Header */}
        <div className="flex flex-col items-center mb-2">
          <img
            src="https://i.ibb.co/8Dx8cb2f/REDDY111-LOGO.png"
            alt="logo"
            className="h-14 w-auto mb-0 drop-shadow-lg"
          />
          <h2 className="text-red-500 font-bold text-xl tracking-wider uppercase">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          {/* Email */}
          <div className="space-y-1">
            <label className="text-white text-[11px] font-bold uppercase ml-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-black bg-white rounded-md outline-none ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-white text-[11px] font-bold uppercase ml-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={`w-full px-4 py-2.5 text-black bg-white rounded-md outline-none ${
                  errors.phone ? "border-2 border-red-500" : ""
                }`}
                placeholder="Enter 10-digit mobile number"
              />
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-white text-[11px] font-bold uppercase ml-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-black bg-white rounded-md outline-none ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
            )}
            <p className="text-white/50 text-[10px] mt-1 ml-1">
              Must contain uppercase, lowercase & number (min 6 chars)
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-white text-[11px] font-bold uppercase ml-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-black bg-white rounded-md outline-none ${
                  errors.confirmPassword ? "border-2 border-red-500" : ""
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Promo Code (Optional) */}
          <div className="space-y-1">
            <label className="text-white text-[11px] font-bold uppercase ml-1">
              Promo Code <span className="text-white/50">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-black bg-white rounded-md outline-none"
                placeholder="Enter promo code if you have one"
              />
              <FaGift className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-2.5 rounded-full flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "SIGN UP"}
              <FaUserPlus size={18} />
            </button>

            <button
              type="button"
              onClick={handleWhatsapp}
              disabled={whatsappLoading}
              className="w-full bg-[#25D366] text-white font-bold py-2.5 rounded-full hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <FaWhatsapp size={20} />
              {whatsappLoading ? "Loading..." : "Register With WhatsApp"}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </form>

        {/* Terms and Conditions */}
        <div className="text-center mt-4 pt-2 border-t border-white/10">
          <p className="text-white/40 text-[10px]">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-red-400 hover:text-red-300">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-red-400 hover:text-red-300">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/slices/authSlice";
import Layout from "../Layout/Layout";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeUser = {
      name: "Dr. User",
      email: formData.email,
    };

    const fakeToken = "123456789";

    dispatch(login({ user: fakeUser, token: fakeToken }));
    navigate("/");
  };

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Login
        </h2>

        <p className="text-gray-500 text-center mt-2">
          AI Driven Healthcare System
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-200"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>
    </Layout>
  );
}

export default Login;
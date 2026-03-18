import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Layout from "../Layout/Layout";
import { register } from "../Redux/slices/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   async function handleSubmit(e) {
//      e.preventDefault();//prevent the form reloading the page
//     console.log(formData)

//     //Add validations for the form input
//     if(!formData.email || !formData.mobileNumber || !formData.password|| !formData.firstName){
//      toast.error("Missing value for the form")
//       return;
//     }
//     if(formData.firstName.length<5){
//       toast.error("First should be atleast 5 characters long and maximum 20 characters long")
//       return;
//     }

//     //check email 
//     if(!formData.email.includes('@') || !formData.email.includes('.')){
//       toast.error("Invalid email address")
//       return;
//     }

//     //check mobile number

//     if(formData.mobileNumber.length<10||formData.mobileNumber.length>12){
//       toast.error("Moblile number should between 10 and 12 characters long")
//       return
//     }
    
//     console.log("FORM DATA:", formData);

// try {
//   const apiResponse = await dispatch(register(formData));
//   console.log("API response:", apiResponse);

//   if (apiResponse?.payload?.data?.success) {
//     navigate("/auth/login");
//   } else {
//     toast.error(apiResponse?.payload?.data?.message || "Signup failed");
//   }

// } catch (error) {
//   console.log("ERROR:", error);
// }
//   };

async function handleSubmit(e) {
  e.preventDefault();

  console.log("FORM DATA:", formData);

  if (!formData.email || !formData.mobileNumber || !formData.password || !formData.firstName) {
    toast.error("Missing value for the form");
    return;
  }

  try {
    const apiResponse = await dispatch(register(formData));

    console.log("API RESPONSE:", apiResponse);

    if (register.fulfilled.match(apiResponse)) {
  toast.success("Signup successful");
  navigate("/login");
} else {
  toast.error(apiResponse?.payload?.error || "Signup failed");
}

  } catch (error) {
    console.log("ERROR:", error);
    toast.error("Something went wrong");
  }
}
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-blue-600">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mt-2">
            AI Driven Healthcare System
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition"
            >
              Sign Up
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </Layout>
  );
}

export default Signup;
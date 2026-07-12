import { useState } from "react";
import logo from "../assets/Mentora.png";
import google from "../assets/google.jpg";
// import axios from "axios";
import { serverUrl } from "../App";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import api from "../../utils/axiosInstacnce"; // Use the axios instance
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await api.post(
        // changes here
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      console.log("Response:", result);

      dispatch(setUserData(result.data));

      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = "";

      const result = await api.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email, role }, // changes
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-blue-900 p-4">
      {/* Background Effects */}
      <div className="absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute right-10 bottom-10 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>

      <form
        className="flex w-[95%] max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left Side */}
        <div className="flex w-full flex-col gap-5 bg-white p-10 md:w-1/2">
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to continue your learning journey.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-4 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="mb-2 block font-medium">Password</label>

            <input
              type={show ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-4 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
            />

            {!show ? (
              <MdOutlineRemoveRedEye
                className="absolute top-[45px] right-4 cursor-pointer text-xl"
                onClick={() => setShow(true)}
              />
            ) : (
              <MdRemoveRedEye
                className="absolute top-[45px] right-4 cursor-pointer text-xl"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          {/* Forgot Password */}
          <span
            className="cursor-pointer text-sm text-blue-600 hover:underline"
            onClick={() =>
              navigate("/forgotpassword", {
                state: { allowed: true },
              })
            }
          >
            Forgot your password?
          </span>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gray-300"></div>

            <span className="text-sm text-gray-500">Or continue with</span>

            <div className="h-[1px] flex-1 bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100"
            onClick={googleLogin}
          >
            <img src={google} alt="Google" className="h-6 w-6" />

            <span className="text-gray-600">Continue with Google</span>
          </div>

          {/* Signup */}
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer font-medium text-blue-600"
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right Side */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 md:flex">
          <div className="absolute top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-10 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl"></div>

          <img
            src={logo}
            alt="Mentora"
            className="w-40 animate-pulse rounded-[10%] shadow-2xl transition-all duration-500 hover:scale-110"
          />

          <h1 className="mt-6 text-5xl font-bold text-white">Mentora</h1>

          <p className="mt-4 px-10 text-center text-blue-100">
            Welcome back! Continue learning and growing with Mentora.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

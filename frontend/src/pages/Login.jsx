


import { useState } from "react";

import logo from "../assets/Mentora.png";
import google from "../assets/google.jpg";

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

import api from "../../utils/axiosInstacnce";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await api.post(
        serverUrl + "/api/auth/login",

        {
          email,
          password,
        },

        {
          withCredentials: true,
        },
      );

      dispatch(setUserData(result.data));

      toast.success("Login Successfully");

    setTimeout(() => {
  window.location.href = "/";
}, 1000);
    } catch (error) {
      console.log(error);

      setError(error?.response?.data?.message || "Wrong email or password");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const name = user.displayName;

      const email = user.email;

      const role = "";

      const result = await api.post(
        serverUrl + "/api/auth/googlelogin",

        {
          name,
          email,
          role,
        },

        {
          withCredentials: true,
        },
      );

      dispatch(setUserData(result.data));

      toast.success("Login Successfully");

      setTimeout(() => {
  window.location.href = "/";
}, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 px-4">
      <form
        className="flex w-[95%] max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg"

        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT SIDE */}

        <div className="flex w-full flex-col gap-5 bg-white p-10 md:w-1/2">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Login to continue your learning journey.
          </p>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"

              placeholder="Your email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}

          <div className="relative">
            <label className="mb-2 block font-medium">Password</label>

            <input
              type={show ? "text" : "password"}

              placeholder="********"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
            />

            {!show ? (
              <MdOutlineRemoveRedEye
                onClick={() => setShow(true)}

                className="absolute top-[45px] right-4 cursor-pointer text-xl"
              />
            ) : (
              <MdRemoveRedEye
                onClick={() => setShow(false)}

                className="absolute top-[45px] right-4 cursor-pointer text-xl"
              />
            )}
          </div>

          {/* ERROR */}

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          {/* FORGOT */}

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

          {/* LOGIN BUTTON */}

          <button
            type="button"

            onClick={handleLogin}

            disabled={loading}

            className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all hover:scale-105"
          >
            {loading ? (
              <ClipLoader
                color="#fff"

                size={20}
              />
            ) : (
              "Login"
            )}
          </button>

          {/* DIVIDER */}

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gray-300" />

            <span className="text-sm text-gray-500">Or continue with</span>

            <div className="h-[1px] flex-1 bg-gray-300" />
          </div>

          {/* GOOGLE */}

          <div
            onClick={googleLogin}

            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border hover:bg-gray-100"
          >
            <img
              src={google}

              alt="google"

              className="h-6 w-6"
            />

            <span className="text-gray-600">Continue with Google</span>
          </div>

          {/* SIGNUP */}

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

        {/* RIGHT SIDE */}

        <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 md:flex">
          <div className="absolute top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-10 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

          <img
            src={logo}

            alt="Mentora"

            className="w-40 animate-pulse rounded-[10%] shadow-2xl"
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


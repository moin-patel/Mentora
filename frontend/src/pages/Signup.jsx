import { useState } from "react";
import logo from "../assets/Mentora.png";
import google from "../assets/google.jpg";
 import api from "../../utils/axiosInstacnce"; 
import { serverUrl } from "../App";
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
const validateForm = () => {

const nameRegex = /^[A-Za-z\s]+$/;

if (!nameRegex.test(name)) {
toast.error("Name should contain only characters");
return false;
}



if(password.length < 8){
toast.error("Password must be at least 8 characters");
return false;
}

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/;

if (!passwordRegex.test(password)) {
toast.error(
"Password must contain at least one letter and one number"
);
return false;
}


if (/^\d+$/.test(password)) {
toast.error(
"Password cannot contain only numbers"
);
return false;
}


const username = email.split("@")[0].toLowerCase();

if(password.toLowerCase().includes(username)){
toast.error(
"Password cannot contain email or username"
);
return false;
}

return true;
};

  const handleSignUp = async () => {


if(!validateForm()){
  return;
}

    try {
      setLoading(true);

      const result = await api.post(                     // using axios instance here 
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(setUserData(result.data));
      toast.success("Sign Up Successfully");
       setTimeout(() => {
  window.location.href = "/";
}, 1000); 
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await api.post(                              // usign axiosinstance here 
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
        setTimeout(() => {
            window.location.href = "/";
          }, 1000); 
      toast.success("SignUp Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-blue-900 relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <form
        className="w-[95%] max-w-5xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col gap-5 bg-white">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome To Mentora
            </h1>

            <p className="text-gray-500 mt-2">
              Join thousands of learners and educators.
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
             onChange={(e)=>{

                   const value = e.target.value;
                   if(/^[A-Za-z\s]*$/.test(value)){
                     setName(value);
                   }
                   }}
              className="border border-gray-300 w-full h-12 px-4 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 w-full h-12 px-4 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 font-medium">Password</label>

            <input
              type={show ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e)=>{
                 const value = e.target.value;
                 setPassword(value);
                 }}
              className="border border-gray-300 w-full h-12 px-4 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200"
            />

            {!show ? (
              <MdOutlineRemoveRedEye
                className="absolute right-4 top-[45px] cursor-pointer text-xl"
                onClick={() => setShow(true)}
              />
            ) : (
              <MdRemoveRedEye
                className="absolute right-4 top-[45px] cursor-pointer text-xl"
                onClick={() => setShow(false)}
              />
            )}
          </div>

          {/* Role */}
          <div>
            <p className="mb-2 font-medium">Select Role</p>

            <div className="flex gap-3">
              <span
                onClick={() => setRole("student")}
                className={`px-5 py-2 rounded-full border cursor-pointer transition-all duration-300 ${
                  role === "student"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300"
                }`}
              >
                Student
              </span>

              <span
                onClick={() => setRole("educator")}
                className={`px-5 py-2 rounded-full border cursor-pointer transition-all duration-300 ${
                  role === "educator"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-gray-300"
                }`}
              >
                Educator
              </span>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <span className="text-sm text-gray-500">Or continue with</span>

            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google */}
             <div
            className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center  "
            onClick={googleSignUp}
          >
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>{" "}
          </div>

          {/* Login */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer font- medium"
            >
              Login
            </span>
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex w-1/2 items-center justify-center flex-col bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 relative overflow-hidden">
          <div className="absolute w-60 h-60 bg-white/10 rounded-full blur-3xl top-10"></div>
          <div className="absolute w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl bottom-10"></div>

          <img
            src={logo}
            alt="Mentora"
            className="w-40 rounded-[10%] shadow-2xl hover:scale-110 transition-all duration-500 animate-pulse"
          />

          <h1 className="text-5xl text-white font-bold mt-6">Mentora</h1>

          <p className="text-blue-100 mt-4 text-center px-10">
            Empowering learners with modern education and AI-driven learning
            experiences.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

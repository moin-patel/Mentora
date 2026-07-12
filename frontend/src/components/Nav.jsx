import { useState } from "react";
 import logo from "../assets/Mentora.png";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";
import {  useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setCourseData, setCreatorCourseData, setSelectedCourseData } from "../redux/courseSlice";
function Nav() {
  let [showHam, setShowHam] = useState(false);
  let [showPro, setShowPro] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

const handleLogout = async () => {
  try {
    await axios.get(
      serverUrl + "/api/auth/logout",
      { withCredentials: true }
    );

    dispatch(setUserData(null));
    dispatch(setCreatorCourseData([]));
    dispatch(setCourseData([]));
    dispatch(setSelectedCourseData(null));

    toast.success("LogOut Successfully");
   navigate("/login");
  } catch (error) {
  dispatch(setCreatorCourseData([]));

  console.log(error);
}
};

  return (
    <>
      <div className="w-full h-[80px] px-6 lg:px-12 bg-slate-00/95 backdrop-blur-md border-b border-slate-700 flex items-center justify-between fixed top-0 left-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            className="w-[60px] h-[60px] rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
            alt=""
          />

          <div className="hidden sm:block">
            <h1 className="text-white text-2xl font-bold tracking-wide">
              Mentora
            </h1>
            <p className="text-slate-400 text-xs">Learn • Grow • Succeed</p>
          </div>
        </div>

        {/* Desktop */}
        <div className="lg:flex items-center justify-center gap-4 hidden">
          {!userData ? (
            <IoMdPerson
              className="w-[50px] h-[50px] text-white cursor-pointer rounded-full p-3 bg-slate-800 hover:bg-slate-700 transition-all duration-300"
              onClick={() => setShowPro((prev) => !prev)}
            />
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-[52px] h-[52px] rounded-full object-cover border-2 border-slate-600"
                  alt=""
                />
              ) : (
                <div className="w-[52px] h-[52px] rounded-full bg-blue-600 flex items-center justify-center text-white text-[20px] font-bold">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          )}

          {userData?.role == "educator" && (
            <div
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}

          {!userData && (
            <span
              className="px-5 py-2 rounded-xl bg-white text-slate-900 font-medium cursor-pointer hover:bg-slate-100 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}

          {userData && (
            <span
              className="px-5 py-2 rounded-xl bg-slate-800 text-white cursor-pointer hover:bg-slate-700 transition"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        {showPro && (
          <div className="absolute top-[95px] right-[6%] flex flex-col gap-2 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl">
            <span
              className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 cursor-pointer transition"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>

            <span
              className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 cursor-pointer transition"
              onClick={() => navigate("/mycourses")}
            >
              My Courses
            </span>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <GiHamburgerMenu
          className="w-[32px] h-[32px] text-white lg:hidden cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>

 
      <div
  className={`fixed top-0 left-0 w-screen h-screen 
  bg-slate-950/95 backdrop-blur-md 
  flex items-center justify-center flex-col 
  gap-3 sm:gap-5 
  z-[100] 
  transition-all duration-500
  ${
    showHam ? "translate-x-0" : "-translate-x-full"
  }`}
>

  {/* Close Button */}
  <GiSplitCross
    className="
      w-7 h-7 
      sm:w-9 sm:h-9 
      text-white 
      absolute 
      top-5 right-5 
      cursor-pointer
    "
    onClick={() => setShowHam((prev) => !prev)}
  />


  {/* Profile Image */}
  {!userData ? (

    <IoMdPerson
      className="
        w-12 h-12 
        sm:w-16 sm:h-16
        text-white 
        bg-slate-800 
        rounded-full 
        p-2 sm:p-3
      "
    />

  ) : (

    <div
      className="cursor-pointer"
      onClick={() => setShowPro((prev) => !prev)}
    >

      {userData.photoUrl ? (

        <img
          src={userData.photoUrl}
          className="
            w-14 h-14
            sm:w-16 sm:h-16
            rounded-full 
            object-cover 
            border-2 
            border-slate-600
          "
          alt=""
        />

      ) : (

        <div
          className="
            w-14 h-14
            sm:w-16 sm:h-16
            rounded-full 
            bg-blue-600 
            flex 
            items-center 
            justify-center 
            text-white 
            text-lg
            sm:text-2xl 
            font-bold
          "
        >
          {userData?.name.slice(0,1).toUpperCase()}
        </div>

      )}

    </div>

  )}



  {/* Profile Button */}
  <span
    className="
      w-[85%]
      xs:w-[80%]
      sm:w-72
      py-3
      sm:py-4
      rounded-xl
      sm:rounded-2xl
      bg-white/10
      text-white
      text-center
      text-sm
      sm:text-base
      hover:bg-white/20
      transition
      cursor-pointer
    "
    onClick={() => navigate("/profile")}
  >
    My Profile
  </span>



  {/* Courses Button */}
  <span
    className="
      w-[85%]
      sm:w-72
      py-3
      sm:py-4
      rounded-xl
      sm:rounded-2xl
      bg-white/10
      text-white
      text-center
      text-sm
      sm:text-base
      hover:bg-white/20
      transition
      cursor-pointer
    "
    onClick={() => navigate("/mycourses")}
  >
    My Courses
  </span>



  {/* Dashboard */}
  {userData?.role == "educator" && (

    <div
      className="
        w-[85%]
        sm:w-72
        py-3
        sm:py-4
        rounded-xl
        sm:rounded-2xl
        bg-gradient-to-r 
        from-blue-600 
        to-indigo-600
        text-white
        text-center
        text-sm
        sm:text-base
        cursor-pointer
      "
      onClick={() => navigate("/dashboard")}
    >
      Dashboard
    </div>

  )}



  {/* Login Logout */}

  {!userData ? (

    <span
      className="
        w-[85%]
        sm:w-72
        py-3
        sm:py-4
        rounded-xl
        sm:rounded-2xl
        bg-gradient-to-r 
        from-blue-600 
        to-indigo-600
        text-white
        text-center
        text-sm
        sm:text-base
        cursor-pointer
      "
      onClick={() => navigate("/login")}
    >
      Login
    </span>

  ) : (

    <span
      className="
        w-[85%]
        sm:w-72
        py-3
        sm:py-4
        rounded-xl
        sm:rounded-2xl
        bg-white/10
        text-white
        text-center
        text-sm
        sm:text-base
        hover:bg-white/20
        transition
        cursor-pointer
      "
      onClick={handleLogout}
    >
      Logout
    </span>

  )}

</div>
    </>
  );

}

export default Nav;

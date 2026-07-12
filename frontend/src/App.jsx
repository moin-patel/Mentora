import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customHooks/useCurrentUser";
import GetCreatorCourseData from "./customHooks/GetCreatorCourse";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import DashBoard from "./pages/Admin/DashBoard";
import Courses from "./pages/Admin/Courses";
import CreateCourse from "./pages/Admin/CreateCourses";
import EditCourse from "./pages/Admin/EditCourse";
import GetPublishedCourse from "./customHooks/GetPublishedCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Admin/CreateLecture";
import EditLecture from "./pages/Admin/EditLecture";
import ViewCourse from './pages/ViewCourse';
import ScrollToTop from "./components/ScrollToTop";
import ViewLectures from "./pages/ViewLectures";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import GetAllReviews from "./customHooks/GetAllReviews";
 import SearchWithAi from "./pages/SearchWithAi";

export const serverUrl = "https://mentoraa-fkwz.onrender.com";
function App() {
  useCurrentUser();
  GetCreatorCourseData();
  GetPublishedCourse();
  GetAllReviews();
    const { userData } = useSelector((state) => state.user);
  console.log(userData);
  
  return (
    <>
      <ToastContainer />
         <ScrollToTop /> 
      <Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/signup"
    element={!userData ? <SignUp /> : <Navigate to="/" />}
  />

  <Route path="/login" element={<Login />} />

  <Route path="/forgotpassword" element={<ForgotPassword />} />

  <Route
    path="/profile"
    element={userData ? <Profile /> : <Navigate to="/signup" />}
  />

  <Route
    path="/editprofile"
    element={userData ? <EditProfile /> : <Navigate to="/signup" />}
  />

  <Route
    path="/dashboard"
    element={
      userData?.role === "educator"
        ? <DashBoard />
        : <Navigate to="/signup" />
    }
  />

  <Route
    path="/courses"
    element={
      userData?.role === "educator"
        ? <Courses />
        : <Navigate to="/signup" />
    }
  />

  <Route
    path="/createcourses"
    element={
      userData?.role === "educator"
        ? <CreateCourse />
        : <Navigate to="/signup" />
    }
  />
  
  <Route
    path="/editcourse/:courseId"
    element={ 
      userData?.role === "educator"
        ? <EditCourse />
        : <Navigate to="/signup" />
    }
  />
    <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        /> 
     <Route
    path="/createlecture/:courseId"
    element={ 
      userData?.role === "educator"
        ? <CreateLecture />
        : <Navigate to="/signup" />
    }
  />
    <Route
    path="/editlecture/:courseId/:lectureId"
    element={ 
      userData?.role === "educator"
        ? <EditLecture />
        : <Navigate to="/signup" />
    }
  />
 
     <Route
    path="/viewcourse/:courseId"
    element={ 
      userData?.role === "educator"
        ? <ViewCourse />
        : <Navigate to="/signup" />
    }
  />

      <Route
    path="/viewlecture/:courseId"
    element={ 
      userData ? <ViewLectures />
        : <Navigate to="/signup" />
    }
  />
     
       <Route
    path="/mycourses"
    element={ 
      userData ? <MyEnrolledCourses />
        : <Navigate to="/signup" />
    }
  />

       <Route
    path="/searchwithai"
    element={ 
      userData ? <SearchWithAi />
        : <Navigate to="/signup" />
    }
  />

</Routes>
    </>
  );
}

export default App;

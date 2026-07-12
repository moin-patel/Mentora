


import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import img from "../../assets/empty.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  // update based on your store

    const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  const totalCourses = creatorCourseData?.length || 0;
  
  const totalStudents =
  creatorCourseData?.reduce(
    (sum, course) => sum + (course.enrolledStudents?.length || 0),
    0
  ) || 0;

 const totalReviews =
  creatorCourseData?.reduce(
    (sum, course) => sum + (course.reviews?.length || 0),
    0
  ) || 0;




  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-5 pt-6">
        <FaArrowLeftLong
          className="w-6 h-6 text-white cursor-pointer hover:translate-x-[-4px] transition-all"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Card */}
        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-5 md:p-8
          shadow-2xl
          "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            items-center
            lg:items-start
            gap-6 lg:gap-10
            "
          >
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={userData?.photoUrl || img}
                alt="Educator"
                className="
                w-24 h-24
                md:w-32 md:h-32
                rounded-full
                object-cover
                border-4 border-blue-500
                shadow-xl
                "
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">

              <h1
                className="
                text-2xl
                md:text-4xl
                lg:text-5xl
                font-bold
                text-white
                "
              >
                Welcome, {userData?.name || "Educator"} 👋
              </h1>

              <p className="text-slate-300 mt-4 max-w-2xl">
                {userData?.description ||
                  "Start creating amazing courses, inspire students and grow your learning community with Mentora."}
              </p>

           
            </div>

            {/* Button */}
            <div className="w-full lg:w-auto">
              <button
                onClick={() => navigate("/courses")}
                className="
                w-full lg:w-auto
                px-6 py-3
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                font-medium
                hover:scale-105
                transition-all
                duration-300
                shadow-lg
                "
              >
                Create Course
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <h3 className="text-slate-300 text-sm">
              Total Courses
            </h3>
            <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">
              {totalCourses}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <h3 className="text-slate-300 text-sm">
              Students
            </h3>
            <h1 className="text-blue-400 text-3xl md:text-4xl font-bold mt-2">
          {totalStudents}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <h3 className="text-slate-300 text-sm">
              Revenue
            </h3>
            <h1 className="text-green-400 text-3xl md:text-4xl font-bold mt-2">
              {"₹ "+ totalEarnings}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <h3 className="text-slate-300 text-sm">
              Reviews
            </h3>
            <h1 className="text-purple-400 text-3xl md:text-4xl font-bold mt-2">
              {totalReviews}
            </h1>
          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

          {/* Course Progress */}
          <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">

            <h2
              className="
              text-xl md:text-2xl
              font-bold
              mb-5
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              bg-clip-text
              text-transparent
              "
            >
              Course Progress
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="lectures"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Student Enrollment */}
          <div className="bg-white rounded-3xl shadow-xl p-5 md:p-6">

            <h2
              className="
              text-xl md:text-2xl
              font-bold
              mb-5
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              bg-clip-text
              text-transparent
              "
            >
              Student Enrollment
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="enrolled"
                  fill="#7c3aed"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="h-16"></div>

      </div>
    </div>
  );
}

export default Dashboard;


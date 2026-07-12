import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { setCreatorCourseData } from "../../redux/courseSlice";
import img1 from "../../assets/empty.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from "react";

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true },
        );

        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);

        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    getCreatorData();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-8">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl">
            <FaArrowLeftLong
              className="cursor-pointer text-white"
              onClick={() => navigate("/dashboard")}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              My Courses
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage and update your courses
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/createcourses")}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105"
        >
          + Create Course
        </button>
      </div>

      {/* Desktop Table */}
      <div className="mx-auto hidden max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:block">
        <table className="min-w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-5 text-left text-slate-300">Course</th>

              <th className="px-6 py-5 text-left text-slate-300">Price</th>

              <th className="px-6 py-5 text-left text-slate-300">Status</th>

              <th className="px-6 py-5 text-left text-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {creatorCourseData?.map((course, index) => (
              <tr
                key={index}
                className="border-b border-white/10 transition-all duration-300 hover:scale-[1.01] hover:bg-white/5"
              >
                <td className="flex items-center gap-4 px-6 py-4">
                  <img
                    src={course?.thumbnail || img1}
                    alt=""
                    className="h-14 w-20 rounded-lg object-cover"
                  />

                  <span className="font-medium text-white">
                    {course?.title}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {course?.price ? `₹${course.price}` : "₹ free course"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      course?.isPublished
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <FaEdit
                    className="cursor-pointer text-slate-400 transition-all hover:scale-125 hover:text-blue-400"
                    onClick={() => navigate(`/editcourse/${course?._id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="py-6 text-center text-slate-500">
          A list of your recent courses.
        </p>
      </div>

      {/* Mobile Cards */}
      <div className="mx-auto max-w-7xl space-y-5 md:hidden">
        {creatorCourseData?.map((course, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <img
                src={course?.thumbnail || img1}
                alt=""
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-white">{course?.title}</h2>

                <p className="mt-1 text-sm text-slate-300">
                  {course?.price ? `₹${course.price}` : "₹ NA"}
                </p>
              </div>

              <FaEdit
                className="cursor-pointer text-slate-400 transition-all hover:scale-125 hover:text-blue-400"
                onClick={() => navigate(`/editcourse/${course?._id}`)}
              />
            </div>

            <div className="mt-4">
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  course?.isPublished
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {course?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-slate-500">
          A list of your recent courses.
        </p>
      </div>
    </div>
  );
}

export default Courses;

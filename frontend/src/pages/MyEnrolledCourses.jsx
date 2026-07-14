
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong, FaSpinner } from "react-icons/fa6"; 

function MyEnrolledCourses() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);


  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4  bg-gradient-to-br from-slate-400 via-white to-slate-600 ">
        <FaSpinner className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading your courses...</p>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-400 via-white to-slate-600 py-24 px-4 md:px-8 relative">

  {/* Back Button */}

  <button
    onClick={() => navigate("/")}
    className="
      absolute
      top-6
      left-6
      w-12
      h-12
      rounded-2xl
      bg-white
      shadow-lg
      flex
      items-center
      justify-center
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
    "
  >
    <FaArrowLeftLong className="text-xl text-slate-800" />
  </button>

  {/* Heading */}

  <div className="max-w-7xl mx-auto mb-12 text-center">

    <span
      className="
        inline-block
        px-4
        py-2
        rounded-full
        bg-indigo-100
        text-indigo-700
        text-sm
        font-semibold
        mb-4
      "
    >
      📚 Continue Learning
    </span>

    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">

      My Enrolled Courses

    </h1>

    <p className="text-slate-500 mt-4 max-w-xl mx-auto">

      Access your enrolled courses anytime and continue learning
      where you left off.

    </p>

  </div>

  {userData.enrolledCourses.length === 0 ? (

    <div className="flex justify-center">

      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          p-12
          max-w-lg
          text-center
        "
      >

        <div className="text-7xl mb-5">
          📖
        </div>

        <h2 className="text-3xl font-bold text-slate-800">

          No Courses Yet

        </h2>

        <p className="text-slate-500 mt-4">

          You haven’t enrolled in any course yet.

        </p>

      </div>

    </div>

  ) : (

    <div
      className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-5
      "
    >

      {userData.enrolledCourses.map((course) => (

        <div
          key={course._id}
          className="
            group
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-slate-200
            shadow-md
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          "
        >

          {/* Thumbnail */}

          <div className="relative overflow-hidden">

            <img
              src={course.thumbnail}
              alt={course.title}
              className="
                w-full
                h-28
                sm:h-36
                md:h-44
                object-cover
                group-hover:scale-110
                transition-all
                duration-500
              "
            />

            <div
              className="
                absolute
                top-3
                right-3
                bg-black/70
                backdrop-blur-md
                text-white
                text-xs
                px-3
                py-1
                rounded-full
              "
            >
              Enrolled
            </div>

          </div>

          {/* Content */}

          <div className="p-4">

            <h2
              className="
                text-sm
                md:text-lg
                font-bold
                text-slate-900
                line-clamp-2
              "
            >
              {course.title}
            </h2>

            <p className="text-xs md:text-sm text-slate-500 mt-2">
              {course.category}
            </p>

            <div
              className="
                inline-block
                mt-3
                px-3
                py-1
                rounded-full
                bg-slate-100
                text-slate-700
                text-xs
              "
            >
              {course.level}
            </div>

            <button
              onClick={() =>
                navigate(`/viewlecture/${course._id}`)
              }
              className="
                mt-5
                w-full
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-slate-900
                to-slate-700
                text-white
                font-semibold
                hover:from-indigo-600
                hover:to-violet-600
                transition-all
                duration-300
              "
            >
              ▶ Watch Now
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
  )
}

export default MyEnrolledCourses

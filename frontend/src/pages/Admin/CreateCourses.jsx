import axios from "axios";
import  { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const CreateCourse = () => {
    let navigate = useNavigate()
    let [loading,setLoading]=useState(false)
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
            console.log(result.data)
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }


return (
  <div className="  min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-700 px-4 py-6 relative overflow-hidden ">

 

    {/* Back Button */}
    <div className=" max-w-3xl mx-auto mb-5 relative z-10 ">
      <FaArrowLeftLong
        className="
          w-6 h-6
          text-white
          cursor-pointer
          hover:-translate-x-1
          transition-all duration-300
        "
        onClick={() => navigate("/courses")}
      />
    </div>

    <div className="max-w-3xl mx-auto relative z-10">

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        overflow-hidden
        hover:-translate-y-1
        transition-all
        duration-500
        "
      >

        {/* Header */}
        <div className="p-5 md:p-7 border-b border-white/10">

          <div className="flex items-center justify-between gap-4">

            <div>

        

              <h1 className="text-2xl md:text-4xl font-bold text-white mt-4">
                Create New Course
              </h1>

              <p className="text-slate-300 mt-2 text-sm md:text-base">
                Build a course and start teaching students on Mentora.
              </p>

            </div>

            <div
              className="
              hidden md:flex
              w-20 h-20
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              items-center
              justify-center
              text-4xl
              shadow-lg
              "
            >
              📚
            </div>

          </div>

        </div>

        {/* Form */}
        <div className="p-5 md:p-7">

          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* Course Title */}
            <div>

              <label className="block text-slate-200 mb-2 font-medium">
                Course Title
              </label>

              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  text-white
                  placeholder:text-slate-400
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              />

            </div>

            {/* Category */}
            <div>

              <label className="block text-slate-200 mb-2 font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  text-white
                  outline-none
                  focus:border-blue-500
                "
              >
                <option value="" className="text-black">
                  Select Category
                </option>

                <option value="App Development" className="text-black">
                  App Development
                </option>

                <option value="AI/ML" className="text-black">
                  AI / ML
                </option>

                <option value="AI Tools" className="text-black">
                  AI Tools
                </option>

                <option value="Data Science" className="text-black">
                  Data Science
                </option>

                <option value="Data Analytics" className="text-black">
                  Data Analytics
                </option>

                <option value="Ethical Hacking" className="text-black">
                  Ethical Hacking
                </option>

                <option value="UI UX Designing" className="text-black">
                  UI UX Designing
                </option>

                <option value="Web Development" className="text-black">
                  Web Development
                </option>

                <option value="Others" className="text-black">
                  Others
                </option>

              </select>

            </div>

            {/* Category Tags */}
            <div>

              <p className="text-slate-400 text-sm mb-3">
                Popular Categories
              </p>

              <div className="flex flex-wrap gap-2">

                             <span value="App Development" className="text-white">
                  App Development
                </span>

                <span value="AI/ML" className="text-white">
                  AI / ML
                </span>

                <span value="AI Tools" className="text-white">
                  AI Tools
                </span>

                <span value="Data Science" className="text-white">
                  Data Science
                </span>

                <span value="Data Analytics" className="text-white">
                  Data Analytics
                </span>


                <span value="Others" className="text-white ml-5">
                  Others
                </span>

              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={CreateCourseHandler}
              className="
                w-full
                py-3
                rounded-xl
                text-white
                font-semibold
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-lg
              "
            >
              {loading ? (
                <ClipLoader size={24} color="white" />
              ) : (
                "Create Course"
              )}
            </button>

          </form>

        </div>

      </div>

    </div>

  </div>
);

};

export default CreateCourse;

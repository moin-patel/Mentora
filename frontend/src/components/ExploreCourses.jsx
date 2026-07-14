
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
  const navigate = useNavigate();



return (
<>
<section className="relative overflow-hidden  py-24 bg-slate-50">

  <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-200/30 blur-[140px]" />

  <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-indigo-200/30 blur-[150px]" />

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

      {/* Left Side */}
      <div className="max-w-xl">

        <span className="inline-flex items-center gap-2 px-4 text-blue-700 font-semibold text-sm">
           Learn Faster With Mentora
        </span>

        <h1 className="mt-7 text-5xl lg:text-6xl font-black leading-tight text-slate-900">

          Find Your

          <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dream Skill
          </span>

        </h1>

        <p className="mt-7 text-lg leading-9 text-slate-600">

          Explore premium courses created by industry experts.
          Build practical projects, gain real-world skills and
          grow your career with Mentora.

        </p>

        <div className="flex flex-wrap gap-5 mt-10">

          <button
            onClick={() => navigate("/allcourses")}
            className="group px-7 py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl flex items-center gap-3"
          >
            Explore Courses
            <SiViaplay className="group-hover:translate-x-1 duration-300"/>
          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-5 mt-14">

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">
              10K+
            </h2>

            <p className="mt-2 text-slate-500">
              Students
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">
              500+
            </h2>

            <p className="mt-2 text-slate-500">
              Courses
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900">
              100+
            </h2>

            <p className="mt-2 text-slate-500">
              Mentors
            </p>
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="w-full lg:w-[650px]">

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">


                 
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center">
              <TbDeviceDesktopAnalytics className="text-3xl text-blue-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              Web Dev.
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              HTML • CSS • React • Node.js
            </p>
          </div>

          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center">
              <LiaUikit className="text-3xl text-pink-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              UI / UX Design
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Figma • Wireframe • Prototype
            </p>
          </div>


          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
              <MdAppShortcut className="text-3xl text-green-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              App Dev.
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Android • Flutter • React Native
            </p>
          </div>

     
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center">
              <FaHackerrank className="text-3xl text-red-500 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              Ethical Hacking
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Network • Security • Pentesting
            </p>
          </div>

        
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center">
              <TbBrandOpenai className="text-3xl text-purple-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              AI / ML
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Machine Learning • Deep Learning
            </p>
          </div>


          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center">
              <SiGoogledataproc className="text-3xl text-cyan-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              Data Science
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Python • Pandas • NumPy
            </p>
          </div>

   
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center">
              <BsClipboardDataFill className="text-3xl text-orange-500 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              Data Analytics
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              Excel • SQL • Power BI
            </p>
          </div>

       
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center">
              <SiOpenaigym className="text-3xl text-indigo-600 group-hover:scale-110 duration-300" />
            </div>

            <h3 className="mt-5 text-center font-semibold text-slate-800">
              AI Tools
            </h3>

            <p className="text-center text-sm text-slate-500 mt-2">
              ChatGPT • Gemini • Automation
            </p>
          </div>
                </div>
      </div>

    </div>


    <div className="mt-24">

      <div className="rounded-[36px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 lg:p-14 shadow-2xl relative overflow-hidden">



        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-[130px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

          <div>

            <p className="uppercase tracking-[4px] text-blue-300 font-semibold">
              Start Learning
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">

              Ready To Build
              <br />
              Your Dream Career?

            </h2>

            <p className="text-slate-300 mt-6 max-w-2xl leading-8">

              Join thousands of learners already building
              real-world skills with Mentora. Learn from
              expert educators and become industry ready.

            </p>

          </div>

          <button
            onClick={() => navigate("/allcourses")}
            className="
              whitespace-nowrap
              bg-white
              text-slate-900
              px-8
              py-4
              rounded-2xl
              font-semibold
              shadow-xl
              hover:scale-105
              hover:shadow-2xl
              duration-300
              flex
              items-center
              gap-3
            "
          >
            Explore Courses

            <SiViaplay className="text-xl" />

          </button>

        </div>

      </div>

    </div>

  </div>

</section>

</>
);





}
            
export default ExploreCourses

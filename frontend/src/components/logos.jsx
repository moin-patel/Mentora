
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
function Logos() {

return (
  <section className="w-full bg-slate-50 py-16">

    <div className="max-w-7xl mx-auto px-5">

      {/* Heading */}
      <div className="text-center mb-12">

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold">

          <MdCastForEducation className="text-lg" />

          <span>Why Choose Mentora</span>

        </div>

        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-slate-900">
          Everything You Need To
          <span className="text-blue-600"> Learn Smarter</span>
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-base leading-7">
          Unlock premium learning with expert instructors, lifetime
          access, dedicated support, and a growing community of
          learners—all in one modern learning platform.
        </p>

      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap justify-center gap-4">

        {/* Card 1 */}
        <div className="group w-[145px] sm:w-[155px] md:w-[165px] bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">

          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
            <MdCastForEducation className="text-2xl text-blue-400" />
          </div>

          <h3 className="text-lg font-bold text-white">
            500+
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Online Courses
          </p>

        </div>

        {/* Card 2 */}
        <div className="group w-[145px] sm:w-[155px] md:w-[165px] bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500 hover:-translate-y-2 transition-all duration-300">

          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
            <SiOpenaccess className="text-2xl text-indigo-400" />
          </div>

          <h3 className="text-lg font-bold text-white">
            100%
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Lifetime Access
          </p>

        </div>

        {/* Card 3 */}
        <div className="group w-[145px] sm:w-[155px] md:w-[165px] bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-green-500/20 hover:border-green-500 hover:-translate-y-2 transition-all duration-300">

          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
            <FaSackDollar className="text-2xl text-green-400" />
          </div>

          <h3 className="text-lg font-bold text-white">
            Affordable
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Value For Money
          </p>

        </div>

        {/* Card 4 */}
        <div className="group w-[145px] sm:w-[155px] md:w-[165px] bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500 hover:-translate-y-2 transition-all duration-300">

          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
            <BiSupport className="text-2xl text-purple-400" />
          </div>

          <h3 className="text-lg font-bold text-white">
            24/7
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Expert Support
          </p>

        </div>

        {/* Card 5 */}
        <div className="group w-[145px] sm:w-[155px] md:w-[165px] bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">

          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3">
            <FaUsers className="text-2xl text-cyan-400" />
          </div>

          <h3 className="text-lg font-bold text-white">
            10K+
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Active Learners
          </p>

        </div>

      </div>

    </div>

  </section>
);
}

export default Logos

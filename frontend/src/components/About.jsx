
import about from "../assets/about.jpg"

function About() {
  return (

  <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 overflow-hidden py-24">

  {/* Background Blur */}
  <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[140px]"></div>

  <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-[140px]"></div>

  {/* Main Container */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">

      <span className="uppercase tracking-[6px] text-blue-400 text-sm font-semibold">
        About Mentora
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">

        Learn Smarter.
        <br />

        Build Faster.
        <br />

        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Grow Together.
        </span>

      </h2>

      <p className="mt-8 text-slate-300 text-lg leading-8">

        Mentora is an AI-powered Learning Management System built to
        make learning more engaging, personalized and career-focused.
        From beginner to professional, everything you need is available
        in one modern platform.

      </p>

    </div>

    {/* Content */}
    <div className="mt-20 grid lg:grid-cols-2 gap-20 items-center">

      {/* LEFT SIDE */}
      <div className="relative flex justify-center">

        {/* Main Image */}
        <img
          src={about}
          alt=""
          className="w-full max-w-[520px] rounded-[32px] shadow-2xl object-cover"
        />

    

    

      </div>

      {/* RIGHT SIDE STARTS HERE */}
      <div className="flex flex-col justify-center">

        {/* Section Label */}
<span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
  Why Choose Mentora
</span>

{/* Main Heading */}
<h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-100 leading-tight">
  Everything You Need
  <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
    To Learn Better
  </span>
</h2>

{/* Description */}
<p className="mt-6 text-slate-600 leading-8 text-lg">
  Mentora combines modern technology with practical learning to help
  students build real-world skills. Learn from expert educators,
  explore AI-powered recommendations, monitor your progress, and
  achieve your career goals with confidence.
</p>

{/* Small Feature Cards */}
<div className="grid sm:grid-cols-2 gap-5 mt-10">

  <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all">
    <h3 className="font-bold text-lg text-slate-900">
      AI Powered Learning
    </h3>

    <p className="text-slate-500 mt-2 leading-7">
      Discover the best courses instantly with intelligent AI-based
      recommendations.
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all">
    <h3 className="font-bold text-lg text-slate-900">
      Expert Educators
    </h3>

    <p className="text-slate-500 mt-2 leading-7">
      Learn directly from experienced instructors with practical,
      industry-focused content.
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all">
    <h3 className="font-bold text-lg text-slate-900">
      Track Progress
    </h3>

    <p className="text-slate-500 mt-2 leading-7">
      Stay motivated by monitoring your completed lessons and learning
      journey in real time.
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all">
    <h3 className="font-bold text-lg text-slate-900">
      Lifetime Access
    </h3>

    <p className="text-slate-500 mt-2 leading-7">
      Access your purchased courses anytime, anywhere and continue
      learning at your own pace.
    </p>
  </div>

</div>

{/* Stats */}
<div className="grid grid-cols-3 gap-5 mt-12">

  <div className="text-center">
    <h2 className="text-4xl font-bold text-blue-600">
      500+
    </h2>

    <p className="mt-2 text-slate-600">
      Courses
    </p>
  </div>

  <div className="text-center">
    <h2 className="text-4xl font-bold text-indigo-600">
      10K+
    </h2>

    <p className="mt-2 text-slate-600">
      Students
    </p>
  </div>

  <div className="text-center">
    <h2 className="text-4xl font-bold text-cyan-600">
      100+
    </h2>

    <p className="mt-2 text-slate-600">
      Educators
    </p>
  </div>

</div>


        </div>
      </div>
    </div>
  
</section>
  )
}

export default About

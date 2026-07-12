import home from "../assets/stud.jpeg";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../components/logos";
import ai from "../assets/ai.png";
import { useNavigate } from "react-router-dom";
import ExploreCourses from "../components/ExploreCourses";
import Cardspage from "../components/Cardspage";
import About from "../components/About";
import Footer from "../components/Footer";
import ReviewPage from './../components/ReviewPage';


function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="w-full overflow-hidden bg-slate-50 ">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-30 ">
          <Nav />
        </div>

        {/* Background Image */}
        <img
          src={home}
          alt="Students"
          className="
            absolute inset-0
           
            w-full h-full
            object-cover lg:object-cover
            md:object-cover
            object-cover
            
          "
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r "></div>

        {/* Glow Effects */}
        <div className="absolute top-32 left-10 lg:left-20 w-60 lg:w-96 h-60 lg:h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

        <div className="absolute bottom-10 right-10 lg:right-20 w-60 lg:w-96 h-60 lg:h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="max-w-4xl">
              {/* Heading */}
              <h1 className="text-white font-extrabold leading-tight">
                <span className="block text-[32px] sm:text-[45px] md:text-[55px] lg:text-[78px]">
                  Grow Your Skills
                </span>

                <span className="block text-[32px] sm:text-[45px] md:text-[55px] lg:text-[78px] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  to Advance
                </span>

                <span className="block text-[32px] sm:text-[45px] md:text-[55px] lg:text-[78px]">
                  Your Career Path
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-300 mt-5 lg:mt-6 text-sm sm:text-base md:text-lg max-w-2xl leading-7 lg:leading-8">
                Learn from expert educators, explore AI-powered learning
                experiences and build industry-ready skills for your future.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => navigate("/allcourses")}
                  className="
                    flex items-center gap-2
                    px-5 lg:px-6
                    py-3
                    rounded-xl
                    transition-all duration-300
                    font-medium

                    lg:bg-white
                    lg:text-black
                    lg:hover:scale-105

                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  "
                >
                  View All Courses
                  <SiViaplay className="text-xl" />
                </button>

                       <button
            onClick={() => navigate("/searchwithai")}
            className="px-7 py-4 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
          >
            <img
              src={ai}
              className="w-8 h-8 rounded-full"
              alt=""
            />
            AI Search
          </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 sm:gap-10 mt-12 lg:mt-14">
                <div>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold">
                    10K+
                  </h2>

                  <p className="text-slate-400 mt-1 text-sm lg:text-base">
                    Students
                  </p>
                </div>

                <div>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold">
                    500+
                  </h2>

                  <p className="text-slate-400 mt-1 text-sm lg:text-base">
                    Courses
                  </p>
                </div>

                <div>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold">
                    100+
                  </h2>

                  <p className="text-slate-400 mt-1 text-sm lg:text-base">
                    Educators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 
      {/* Explore Courses Section */}
      <div className="w-full bg-slate-50">
        <ExploreCourses />
      </div>
      <Cardspage/>
          <About/>
      <ReviewPage/>
      <Logos/>
      <Footer/>

      
    </div>  
    </>
  );

 
  

}

export default Home;

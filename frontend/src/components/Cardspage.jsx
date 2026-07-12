import Card from "./Card.jsx";
import { useSelector } from "react-redux";
// import { SiViaplay } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function Cardspage() {
  const { courseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const popularCourses = courseData?.slice(0, 6) || [];
  
  return (


  <section className="relative w-full bg-slate-50 py-14 md:py-24 px-3 sm:px-5 md:px-8 lg:px-12 overflow-hidden">

    {/* Background Blur */}
    <div className="absolute top-20 right-10 w-44 h-44 bg-blue-200/20 rounded-full blur-[90px]" />
    <div className="absolute bottom-20 left-10 w-44 h-44 bg-indigo-200/20 rounded-full blur-[90px]" />

    {/* Heading */}
    <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 md:mb-16">

      <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm">
        Top Picks
      </span>

      <h1 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900">
        Our Popular Courses
      </h1>

      <p className="mt-5 text-slate-600 text-sm md:text-lg leading-7 max-w-xl mx-auto">
        Explore top-rated courses designed to boost your skills,
        enhance your career and unlock new opportunities.
      </p>

    </div>

    {/* Cards */}
    <div
      className="
      relative
      z-10
      max-w-7xl
      mx-auto

      grid
      grid-cols-2
      lg:grid-cols-3

      gap-3
      sm:gap-5
      lg:gap-8
      "
    >

      {popularCourses.length > 0 ? (

        popularCourses.map((item, index) => (

          <Card
            key={item._id || index}
            id={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            reviews={item.reviews}
          />

        ))

      ) : (

        <div className="col-span-full py-20 text-center text-slate-400">

          No popular courses available.

        </div>

      )}

    </div>

    {/* Button */}

    <div className="relative z-10 flex justify-center mt-12 md:mt-16">

      <button
        onClick={() => navigate("/allcourses")}
        className="px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
      >

        View All Courses

      </button>

    </div>

  </section>

 );
}

export default Cardspage;


import { useState } from "react";
import Card from "../components/Card.jsx";

import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";

 import { CiFilter } from "react-icons/ci";
function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Applied filter
  const [category, setCategory] = useState([]);

  // Temporary selected filter
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const toggleCategory = (e) => {
    const value = e.target.value;

    if (selectedCategory.includes(value)) {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== value)
      );
    } else {
      setSelectedCategory((prev) => [...prev, value]);
    }
  };

  // Apply selected filters
const applyFilter = () => {
  setLoading(true);

  setTimeout(() => {
    setCategory(selectedCategory);

    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }

    setLoading(false);
  }, 500);
};

  const filterCourses =
    category.length === 0
      ? courseData
      : courseData.filter((item) =>
          category.includes(item.category)
        );

 
return (
<div className="min-h-screen bg-slate-100">

  {/* ================= Mobile Filter Button ================= */}

{/* Mobile Filter Button */}

<button
  onClick={() => setIsSidebarVisible(true)}
  className="
    md:hidden
    fixed
    top-5
    left-5
    z-[100]
    flex
    items-center
    gap-2
    px-4
    py-2.5
    rounded-xl
    bg-gradient-to-r
    from-indigo-600
    to-violet-600
    text-white
    font-semibold
    shadow-2xl
    hover:scale-105
    active:scale-95
    transition-all
  "
>
<CiFilter />

  Filter
</button>

  {/* ================= Overlay ================= */}

  {isSidebarVisible && (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        md:hidden
        z-40
      "
      onClick={() => setIsSidebarVisible(false)}
    />
  )}

  <div className="flex">

    {/* ================= Sidebar ================= */}

    <aside
      className={`
        fixed
        top-0
        left-0
        h-screen
        w-[280px]
        bg-gradient-to-b
        from-slate-900
        via-slate-800
        to-slate-900
        shadow-2xl
        border-r
        border-slate-700
        z-50
        transition-all
        duration-300
        overflow-y-auto

        ${
          isSidebarVisible
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:translate-x-0
      `}
    >

      {/* Header */}

      <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Filters
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Select categories
            </p>

          </div>

          {/* Close Button */}

          <button
            onClick={() => setIsSidebarVisible(false)}
            className="
              md:hidden
              text-white
              text-3xl
              leading-none
            "
          >
            ×
          </button>

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-5 space-y-5"
      >

        {/* AI Search */}

        <button
          type="button"
          onClick={() => navigate("/searchwithai")}
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            py-3
            text-white
            font-semibold
            flex
            justify-center
            items-center
            gap-3
            hover:scale-[1.02]
            transition
          "
        >

          Search With AI

          <img
            src={ai}
            className="w-8 h-8 rounded-full bg-white p-1"
            alt=""
          />

        </button>

        {/* Categories */}

        <div className="space-y-2">

          <h3 className="text-white font-semibold text-lg mb-3">
            Categories
          </h3>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="App Development"
              checked={selectedCategory.includes("App Development")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">App Development</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="AI/ML"
              checked={selectedCategory.includes("AI/ML")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">AI / ML</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="AI Tools"
              checked={selectedCategory.includes("AI Tools")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">AI Tools</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="Data Science"
              checked={selectedCategory.includes("Data Science")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">Data Science</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="Data Analytics"
              checked={selectedCategory.includes("Data Analytics")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">Data Analytics</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="Ethical Hacking"
              checked={selectedCategory.includes("Ethical Hacking")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">Ethical Hacking</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="UI UX Designing"
              checked={selectedCategory.includes("UI UX Designing")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">UI / UX Designing</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="Web Development"
              checked={selectedCategory.includes("Web Development")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">Web Development</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              value="Others"
              checked={selectedCategory.includes("Others")}
              onChange={toggleCategory}
            />
            <span className="text-slate-200">Others</span>
          </label>

        </div>

        <button
          type="button"
          onClick={applyFilter}
          disabled={loading}
          className="
            w-full
            py-3
            rounded-2xl
            bg-white
            text-slate-900
            font-bold
            hover:bg-slate-200
            transition
          "
        >
          {loading ? "Loading..." : "Apply Filters"}
        </button>

      </form>

    </aside>

    {/* ================= Main ================= */}

    <main
      className="
        flex-1
        md:ml-[280px]
        px-3
        sm:px-4
        md:px-8
        py-24
      "
    >
            {/* ================= Page Heading ================= */}

      <div className="mb-10">

        <span
          className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            bg-indigo-100
            text-indigo-700
            text-sm
            font-semibold
          "
        >
           Learn Something New
        </span>

        <h1
          className="
            mt-4
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-extrabold
            text-slate-900
          "
        >
          Explore Premium Courses
        </h1>

        <p
          className="
            mt-3
            text-slate-500
            max-w-2xl
            leading-relaxed
          "
        >
          Discover thousands of high-quality courses taught by industry
          experts. Filter courses according to your interests and start
          learning today.
        </p>

      </div>

      {/* ================= Selected Categories ================= */}

      {category.length > 0 && (

        <div className="mb-8">

          <h3 className="font-semibold text-slate-800 mb-3">
            Selected Categories
          </h3>

          <div className="flex flex-wrap gap-2">

            {category.map((item) => (

              <span
                key={item}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  text-white
                  text-sm
                  shadow
                "
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      )}

      {/* ================= Courses Grid ================= */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-3
          sm:gap-4
          lg:gap-6
        "
      >

        {filterCourses?.length > 0 ? (

          filterCourses.map((item) => (

            <div
              key={item._id}
              className="flex justify-center"
            >

              <Card
                id={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                category={item.category}
                price={item.price}
                reviews={item.reviews}
              />

            </div>

          ))

        ) : (

          <div className="col-span-full flex justify-center py-20">

            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-10
                text-center
                max-w-md
              "
            >

              <div className="text-6xl mb-5">
                📚
              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                No Courses Found
              </h2>

              <p className="text-slate-500 mt-3">
                Try selecting another category or clear your filters.
              </p>

              <button
                onClick={() => {
                  setSelectedCategory([]);
                  applyFilter();
                }}
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  text-white
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Clear Filters
              </button>

            </div>

          </div>

        )}

      </div>

      {/* ================= Bottom CTA ================= */}

      <div className="mt-14 lg:mt-20">

        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-slate-900
            via-slate-800
            to-slate-900
            p-6
            md:p-10
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-8
            overflow-hidden
            relative
          "
        >

          {/* Background Glow */}

          <div className="absolute -top-20 -right-20 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-violet-500/20 rounded-full blur-3xl"></div>

          {/* Left */}

          <div className="relative z-10">

            <span className="inline-block bg-white/10 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">

               Learn Without Limits

            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white">

              Ready to Start Your Journey?

            </h2>

            <p className="text-slate-300 mt-4 max-w-2xl leading-relaxed">

              Learn from industry experts, build real-world projects,
              earn certificates and grow your career with our premium
              learning platform.

            </p>

          </div>

          {/* Right */}

          <div className="relative z-10 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/searchwithai")}
              className="
                px-7
                py-4
                rounded-2xl
                bg-white
                text-slate-900
                font-semibold
                hover:scale-105
                transition-all
                shadow-xl
              "
            >
              Search With AI
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                px-7
                py-4
                rounded-2xl
                border
                border-white/20
                bg-white/10
                backdrop-blur-md
                text-white
                font-semibold
                hover:bg-white/20
                transition-all
              "
            >
              Back To Home
            </button>

          </div>

        </div>

      </div>

    </main>

  </div>

</div>

);




}

export default AllCourses;
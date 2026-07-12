
import { useNavigate } from "react-router-dom";
import logo from "../assets/Mentora.png"; // replace with actual path
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  let navigate = useNavigate();
  return (

<footer className="bg-slate-950 text-slate-300">

  {/* Main Footer */}
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* Logo */}
      <div>

        <img
          src={logo}
          alt="Mentora"
          className="h-12 rounded-lg mb-5"
        />

        <h2 className="text-2xl font-bold text-white">
          Mentora LMS
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          Learn from industry experts, master modern technologies,
          and accelerate your career with our AI-powered learning
          platform.
        </p>

        <div className="flex gap-4 mt-6">

        <div className="flex gap-4 mt-6">

  {/* GitHub */}
  <div
    onClick={() =>
      window.open("https://github.com/moin-patel", "_blank")
    }
    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
  >
    <FaGithub />
  </div>

  {/* LinkedIn */}
  <div
    onClick={() =>
      window.open(
        "https://linkedin.com/in/moinuddin-patel",
        "_blank"
      )
    }
    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
  >
    <FaLinkedin />
  </div>

  {/* Instagram */}
  <div
    onClick={() =>
      window.open(
        "https://instagram.com/_moin._.pvt",
        "_blank"
      )
    }
    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
  >
    <FaInstagram />
  </div>

</div>
        </div>

      </div>

      {/* Quick Links */}

      <div>

        <h3 className="text-white text-lg font-semibold mb-6">
          Quick Links
        </h3>

        <ul className="space-y-4">

               <li
        onClick={() => {
          navigate("/");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
            }}
            className="hover:text-blue-400 cursor-pointer transition"
          >
                 Home
               </li>

          <li className="hover:text-blue-400 cursor-pointer transition"
          onClick={() => navigate("/allcourses")}
          >
            All Courses
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition"
          onClick={() => navigate("/searchwithai")}
          >
            AI Search
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition"
          onClick={() => navigate("/profile")}
          >
            My Profile
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition"
          onClick={() => navigate("/login")}
          >
            Login
          </li>

        </ul>

      </div>

      {/* Categories */}

      <div>

        <h3 className="text-white text-lg font-semibold mb-6">
          Popular Categories
        </h3>

        <ul className="space-y-4">

          <li className="hover:text-blue-400 cursor-pointer transition">
            Web Development
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            App Development
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            AI & Machine Learning
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            Data Science
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            UI / UX Design
          </li>

        </ul>

      </div>

      {/* Contact */}

      <div>

        <h3 className="text-white text-lg font-semibold mb-6">
          Contact Us
        </h3>

        <div className="space-y-5">

          <div>
            <p className="text-white font-medium">
              Email
            </p>

            <p className="text-sm text-slate-400 mt-1">
              moincodes@gmail.com
            </p>

          </div>

          <div>
            <p className="text-white font-medium">
              Phone
            </p>

            <p className="text-sm text-slate-400 mt-1">
              +91 7447079982
            </p>

          </div>

          <div>
            <p className="text-white font-medium">
              Address
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Indore , M.P. , India
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Divider */}

    <div className="border-t border-slate-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-sm text-slate-500 text-center md:text-left">
        © {new Date().getFullYear()} Mentora LMS. All Rights Reserved.
      </p>

      <div className="flex gap-6 text-sm text-slate-500">

        <span className="hover:text-white cursor-pointer transition">
          Privacy Policy
        </span>

        <span className="hover:text-white cursor-pointer transition">
          Terms & Conditions
        </span>

      </div>

    </div>

  </div>

</footer>
);
  
};

export default Footer;


import { useEffect, useRef, useState } from "react";
import { RiMicAiFill } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import start from "../assets/start.mp3";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
function SearchWithAi() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const startSound = useRef(new Audio(start));
  const speak = (message) => {
    console.log("🔊 Speak:", message);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };
const handleRecommendation = async (query) => {
  if (!query.trim()) return;

  try {
    setLoading(true);

    const result = await axios.post(
      `${serverUrl}/api/ai/searchwithai`,
      { input: query },
      { withCredentials: true }
    );

    setRecommendations(result.data);

    if (result.data.length > 0) {
      speak("These are the top courses I found for you");
    } else {
      speak("No courses found");
    }
  } catch (error) {
    console.error("Recommendation Error:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript.trim();

    setInput(transcript);
    await handleRecommendation(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech Error:", event.error);
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognitionRef.current = recognition;

  return () => {
    recognition.stop();
  };
}, []);
const handleMic = async () => {
  if (!recognitionRef.current) {
    console.error("Speech Recognition not initialized.");
    return;
  }

  try {
    await startSound.current.play();
  } catch (err) {
    console.error("Unable to play start sound:", err);
  }

  try {
    recognitionRef.current.start();
  } catch (err) {
    console.error("Failed to start speech recognition:", err);
  }
};

  const handleSearch = async () => {
    console.log("Search Button Clicked");
    console.log("Input:", input);
    await handleRecommendation(input);
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center px-4 py-12">

    {/* Search Card */}
    <div className="relative w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

      <FaArrowLeftLong
        className="absolute left-6 top-6 w-6 h-6 cursor-pointer hover:text-[#CB99C7] transition"
        onClick={() => navigate("/")}
      />

      <h1 className="text-4xl font-bold text-center">
        Search with <span className="text-[#CB99C7]">AI</span>
      </h1>

      <p className="text-center text-gray-400 mt-3 mb-8">
        Discover the perfect course using AI-powered search.
      </p>

      <div className="relative">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to learn today?"
          className="w-full bg-[#1f2937] border border-gray-700 focus:border-[#CB99C7] rounded-full py-4 pl-6 pr-28 outline-none text-white placeholder-gray-400 transition-all"
        />

        {/* Search */}

        <button
          onClick={handleSearch}
          className="absolute right-16 top-1/2 -translate-y-1/2
          w-11 h-11 rounded-full
          bg-gradient-to-r from-[#CB99C7] to-purple-500
          hover:scale-110 transition-all duration-300
          flex items-center justify-center shadow-lg"
        >
          <IoMdSearch className="text-white text-xl" />
        </button>

        {/* Mic */}

        <button
          onClick={handleMic}
          className="absolute right-3 top-1/2 -translate-y-1/2
          w-11 h-11 rounded-full
          bg-white
          hover:bg-gray-200
          transition-all duration-300
          flex items-center justify-center shadow-lg"
        >
          <RiMicAiFill className="text-[#CB99C7] text-xl" />
        </button>

      </div>
    </div>

    {/* Loading */}

    {loading ? (

      <div className="flex flex-col items-center mt-20">

        <div className="w-16 h-16 border-[6px] border-[#CB99C7] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-6 text-xl text-gray-300">
          Finding the best courses for you...
        </p>

      </div>

    ) : recommendations.length > 0 ? (

      <div className="w-full max-w-6xl mt-14">

        <h2 className="text-3xl font-bold text-center mb-10">
          AI Recommendations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {recommendations.map((course) => (

            <div
              key={course._id}
              onClick={() => navigate(`/viewcourse/${course._id}`)}
              className="bg-white text-black rounded-3xl p-6 cursor-pointer
              shadow-lg border border-gray-100
              hover:-translate-y-2
              hover:shadow-[0_0_30px_rgba(203,153,199,0.45)]
              transition-all duration-300"
            >

              <h2 className="text-xl font-bold line-clamp-2">
                {course.title}
              </h2>

              <p className="text-gray-500 mt-3">
                {course.category}
              </p>

              <button
                className="mt-6 bg-[#CB99C7] text-white px-5 py-2 rounded-full hover:bg-purple-500 transition"
              >
                View Course →
              </button>

            </div>

          ))}

        </div>

      </div>

    ) : (

      <div className="flex flex-col items-center mt-20">

        {listening ? (

          <>
            <div className="w-16 h-16 rounded-full bg-[#CB99C7]/20 flex items-center justify-center animate-pulse">

              <RiMicAiFill className="text-[#CB99C7] text-3xl" />

            </div>

            <p className="mt-6 text-xl text-gray-300">
              Listening...
            </p>
          </>

        ) : (

          <>
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">

              <IoMdSearch className="text-4xl text-gray-500" />

            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              No Courses Found
            </h2>

            <p className="text-gray-400 mt-2 text-center">
              Try searching with another keyword or use voice search.
            </p>
          </>

        )}

      </div>

    )}

  </div>
);
}
export default SearchWithAi;

import { useEffect, useRef, useState } from "react";
import img from "../../assets/empty.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setCreatorCourseData } from "../../redux/courseSlice";

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef();
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();
  //  const { creatorCourseData } = useSelector(state => state.course);
  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcourse/${courseId}`,
          { withCredentials: true },
        );
        const data = result.data;

        // Data milte hi saari states ek saath update karein
        setTitle(data.title || "");
        setSubTitle(data.subTitle || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setLevel(data.level || "Beginner");
        setPrice(data.price || "0");
        setIsPublished(data.isPublished || false);
        setFrontendImage(data.thumbnail || img);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course details");
      }
    };

    getCourseById();
  }, [courseId]);
  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    console.log(file); // check

    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const editCourseHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if (backendImage) formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true },
      );
      const updatedCourse = result.data;

      // // Redux update
      //  const updatedCourses = creatorCourseData.map(c => c._id === courseId ? updatedCourse : c);
      const updatedCourses = courseData.map((c) =>
        c._id === courseId ? updatedCourse : c,
      );
      dispatch(setCreatorCourseData(updatedCourses));
      console.log(result);

      navigate("/courses");
      toast.success("Course Updated");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async () => {
    setLoading2(true);
    try {
      await axios.delete(`${serverUrl}/api/course/removecourse/${courseId}`, {
        withCredentials: true,
      });
      toast.success("Course Deleted");
      // const filteredCourses = creatorCourseData.filter(c => c._id !== courseId);
      const filteredCourses = courseData.filter((c) => c._id !== courseId);
      dispatch(setCreatorCourseData(filteredCourses));

      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6 md:p-8">
        {/* Header */}
        <div className="relative mb-8 flex flex-col items-center justify-between gap-5 md:flex-row">
          <FaArrowLeftLong
            className="absolute top-2 left-2 h-[22px] w-[22px] cursor-pointer transition hover:scale-110 md:static"
            onClick={() => navigate("/courses")}
          />

          <h2 className="text-center text-xl font-bold text-gray-800 sm:text-2xl">
            Add detail information regarding course
          </h2>

          <button
            className="w-full rounded-xl bg-black px-5 py-2.5 text-white transition hover:bg-gray-800 md:w-auto"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          >
            Go to lectures page
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border bg-gray-50 p-4 sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
            <h3 className="text-lg font-semibold text-gray-800">
              Basic Course Information
            </h3>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className={` ${
                  isPublished
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                } rounded-xl px-4 py-2 font-medium`}
                onClick={() => setIsPublished(!isPublished)}
              >
                {isPublished ? "Click to UnPublish" : "Click to Publish"}
              </button>

              <button
                className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                disabled={loading2}
                onClick={removeCourse}
              >
                {loading2 ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Remove Course"
                )}
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              editCourseHandler();
            }}
            className="space-y-6"
          >
            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>

              <input
                type="text"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            {/* Subtitle */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Subtitle
              </label>

              <input
                type="text"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setSubTitle(e.target.value)}
                value={subTitle}
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                className="h-28 w-full resize-none rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            {/* Category Level Price */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  className="w-full rounded-xl border bg-white px-4 py-3"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="App Development">App Development</option>

                  <option value="AI/ML">AI / ML</option>

                  <option value="AI Tools">AI Tools</option>

                  <option value="Data Science">Data Science</option>

                  <option value="Data Analytics">Data Analytics</option>

                  <option value="Ethical Hacking">Ethical Hacking</option>

                  <option value="UI UX Designing">UI UX Designing</option>

                  <option value="Web Development">Web Development</option>

                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Course Level
                </label>

                <select
                  className="w-full rounded-xl border bg-white px-4 py-3"
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}
                >
                  <option value="">Select Level</option>

                  <option value="Beginner">Beginner</option>

                  <option value="Intermediate">Intermediate</option>

                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (INR)
                </label>

                <input
                  type="number"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      setPrice("");
                    } else if (Number(value) >= 0) {
                      setPrice(value);
                    }
                  }}
                  placeholder="Write 0 for free course"
                  className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Thumbnail */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Thumbnail
              </label>

              <input
                type="file"
                ref={thumb}
                hidden
                onChange={handleThumbnail}
                accept="image/*"
              />

              <div
                className="group relative h-[180px] w-full cursor-pointer sm:w-[300px]"
                onClick={() => thumb.current.click()}
              >
                <img
                  src={frontendImage}
                  alt="thumbnail"
                  className="h-full w-full rounded-xl border object-cover"
                />

                <MdEdit className="absolute top-3 right-3 h-[28px] w-[28px] rounded-full bg-white p-1" />
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                className="rounded-xl bg-gray-200 px-6 py-3 transition hover:bg-gray-300"
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-black px-8 py-3 text-white transition hover:bg-gray-800"
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;



import { FaArrowLeftLong, FaLock, FaStar,  } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import img from "../assets/empty.jpg"; // ERROR 1 FIX: Import add kiya
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { setSelectedCourseData } from '../redux/courseSlice';
import { FaPlayCircle } from 'react-icons/fa';
import Card from '../components/Card';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const  ViewCourse=()=> {

      const { courseId } = useParams();
      const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
     const {userData} = useSelector(state=>state.user)
     const {selectedCourseData} = useSelector(state=>state.course)
  const dispatch = useDispatch()
     const [selectedLecture, setSelectedLecture] = useState(null);
       const [creatorData , setCreatorData] = useState(null)
         const [selectedCreatorCourse,setSelectedCreatorCourse] = useState([])
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const [loading , setLoading] = useState(false);
   

 const isEnrolled = userData?.enrolledCourses?.some((item) => {
  // Check karo ki item object hai ya string
  const idToCheck = typeof item === 'object' && item !== null ? item._id : item;
  return idToCheck?.toString() === courseId;
});

  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/review/givereview" , {rating , comment , courseId} , {withCredentials:true})
      toast.success("Review Added")
      console.log(result.data)
      setLoading(false);
      setRating(0)
      setComment("")

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
    // Ye block hamesha chalega, chahe review success ho ya error aaye
    // Isse loader har halat mein band ho jayega
    setLoading(false); 
  }

  }
  const avgRating = useMemo(() => {
    if (!selectedCourseData?.reviews || selectedCourseData.reviews.length === 0) return 0;
    const total = selectedCourseData.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / selectedCourseData.reviews.length).toFixed(1);
  }, [selectedCourseData]);

const fetchCourseData = () => {
  const course = courseData.find(
    (item) => item._id === courseId
  );

  if (course) {
    dispatch(setSelectedCourseData(course));
  }
};

      // Fetch creator info once course data is available
  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
          console.log(result.data)
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };
    getCreator();
  }, [selectedCourseData]);

    useEffect(() => {
        const setCreatorCourse = async () => {
  if (creatorData?._id && courseData.length > 0) {
    const creatorCourses = courseData.filter(
      (course) =>
        course.creator === creatorData._id && course._id !== courseId // Exclude current course
    );
    setSelectedCreatorCourse(creatorCourses);
  }
}

setCreatorCourse();

}, [creatorData, courseData]);


 const handleEnroll = async (courseId, userId) => {
    console.log("Enroll clicked");

  console.log(courseId);
  console.log(userId);
  try {
    const orderData = await axios.post(
      serverUrl + "/api/payment/create-order",
      { courseId, userId },
      { withCredentials: true }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.data.amount,
      currency: "INR",
      name: "Mentora",
      description: "Course Enrollment Payment",
      order_id: orderData.data.id,

      handler: async function (response) {
         console.log("Payment Success");
        try {
          const verifyRes = await axios.post(
            serverUrl + "/api/payment/verify-payment",
            {
              ...response,
              courseId,
              userId,
            },
            { withCredentials: true }
          );

          toast.success(verifyRes.data.message);
             window.location.reload()


        } catch (verifyError) {
          console.log(verifyError);

          toast.error(
            verifyError?.response?.data?.message ||
            "Payment verification failed"
          );
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);

    toast.error(
      err?.response?.data?.message ||
      "Something went wrong while enrolling."
    );
  }
};
  

useEffect(() => {
  fetchCourseData();
}, [courseId, courseData]);


  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10 px-4">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl text-white">
  <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-8">
    
    <div className="w-full lg:w-1/2">
      <FaArrowLeftLong
        className="mb-5 text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      />
      <img
        src={selectedCourseData?.thumbnail || img}
        alt=""
        className="w-full h-[350px] rounded-2xl object-cover shadow-xl"
      />
    </div>

    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-3">
        {selectedCourseData?.title}
      </h1>

      <p className="text-blue-100 text-lg mb-4">
        {selectedCourseData?.subTitle}
      </p>

      {/* AVG RATING DIV - Naya Add kiya */}
      <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1 rounded-lg">
        <FaStar className="text-yellow-400" />
        <span className="font-bold">{avgRating}</span>
        <span className="text-gray-300 text-sm">
          ({selectedCourseData?.reviews?.length || 0} reviews)
        </span>
      </div>

<div className="flex items-center gap-4 mb-6">

  {/* Actual Price */}
  <span className="text-4xl font-bold">
    ₹{selectedCourseData?.price}
  </span>


  {/* Original Price with 40% increase */}
  <span className="line-through text-gray-300 text-xl">
    ₹
    {selectedCourseData?.price
      ? Math.round(
          selectedCourseData.price +
          (selectedCourseData.price * 40) / 100
        )
      : 0}
  </span>

</div>

   {
  selectedCourseData?.price === 0 || isEnrolled ? (

    <button
      onClick={() => navigate(`/viewlecture/${courseId}`)}
      className="
        bg-green-500
        text-white
        font-bold
        px-8
        py-3
        rounded-xl
        hover:scale-105
        transition-all
        duration-300
        w-fit
      "
    >
      Watch Now
    </button>


  ) : (

    <button
      onClick={() => handleEnroll(courseId, userData._id)}
      className="
        bg-white
        text-blue-900
        font-bold
        px-8
        py-3
        rounded-xl
        hover:scale-105
        transition-all
        duration-300
        w-fit
      "
    >
      Enroll Now
    </button>

  )
}
    </div>
  </div>
</div>

      {/* ABOUT COURSE */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          What You'll Learn
        </h2>

        <p className="text-gray-600">
          Learn {selectedCourseData?.category} from beginner to advanced level.
        </p>
      </div>

      {/* CURRICULUM */}
      <div className="grid lg:grid-cols-5 gap-6">

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-5">
            Course Curriculum
          </h2>

          <div className="space-y-3">
            {selectedCourseData?.lectures?.map((lecture,index)=>(
              <button
                key={index}
                disabled={!lecture.isPreviewFree}
                onClick={() =>
                  lecture.isPreviewFree &&
                  setSelectedLecture(lecture)
                }
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300
                ${
                  selectedLecture?.lectureTitle === lecture.lectureTitle
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-blue-50"
                }`}
              >
                {lecture.isPreviewFree ? (
                  <FaPlayCircle />
                ) : (
                  <FaLock />
                )}

                <span>{lecture.lectureTitle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-6">
          <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-5">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                Select Preview Lecture
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold">
            {selectedLecture?.lectureTitle}
          </h3>
        </div>
      </div>

      {/* REVIEW */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          Write Review
        </h2>

        <div className="flex gap-2 mb-4">
          {[1,2,3,4,5].map((star)=>(
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-3xl transition-all duration-300 hover:scale-125 ${
                star <= rating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          rows="4"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className="w-full border rounded-xl p-4"
          placeholder="Write your review..."
        />
<button
      onClick={handleReview}
      disabled={loading} // Loading ke waqt button disable rakhein
      className="mt-4 bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <ClipLoader size={20} color={"#ffffff"} />
          <span>Submitting...</span>
        </>
      ) : (
        "Submit Review"
      )}
    </button>
      </div>

      {/* INSTRUCTOR */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Instructor
        </h2>

        <div className="flex flex-col md:flex-row gap-5 items-center">
          <img
            src={creatorData?.photoUrl || img}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <h3 className="text-xl font-semibold">
              {creatorData?.name}
            </h3>

            <p className="text-gray-600">
              {creatorData?.description}
            </p>

            <p className="text-gray-500">
              {creatorData?.email}
            </p>
          </div>
        </div>
      </div>

      {/* OTHER COURSES */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          More Courses By This Instructor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedCreatorCourse?.map((item,index)=>(
            <Card
              key={index}
              thumbnail={item.thumbnail}
              title={item.title}
              id={item._id}
              price={item.price}
              category={item.category}
              reviews={item.reviews}
            />
          ))}
        </div>
      </div>

    </div>
  </div>
);

}
export default ViewCourse;


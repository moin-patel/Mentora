import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReview } from '../redux/reviewSlice'; // Apna sahi path dalein
import ReviewCard from './ReviewCard';
import { serverUrl } from '../App';

function ReviewPage() {
  const dispatch = useDispatch();
  const { allReview } = useSelector((state) => state.review);

  // Backend se reviews fetch karne ka function (agar API call yahan hai)
  const fetchReviews = async () => {
    try {
  const response = await fetch(`${serverUrl}/api/review/allReview`);
      const data = await response.json();
      dispatch(setAllReview(data));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Sirf latest 6 reviews show karne ke liye slice kiya hai
  const latestReviews = allReview.slice(0, 6);

  return (
    <div className='flex items-center justify-center flex-col min-h-screen bg-slate-50'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
        Real Reviews from Real Learners
      </h1>
      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] text-slate-600'>
        Discover how our Virtual Courses is transforming learning experiences through real feedback from students and professionals worldwide.
      </span>

      <div className='w-full flex items-center justify-center flex-wrap gap-[30px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
        {latestReviews.length > 0 ? (
          latestReviews.map((item, index) => (
            <ReviewCard 
              key={item._id || index} // Unique ID use karna behtar hai
              rating={item.rating}
              image={item.user?.photoUrl}
              comment={item.comment} 
              name={item.user?.name} 
              role={item.user?.role} 
              description={item.user?.description}
              courseTitle={item.course?.title || "General Review"}
            />
          ))
        ) : (
          <p className="text-slate-500">No reviews found yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
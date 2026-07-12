
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Card = ({ thumbnail, title, category, price ,id , reviews }) => {
  const navigate = useNavigate()
   const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};

// Usage:
const avgRating = calculateAverageRating(reviews);
console.log("Average Rating:", avgRating);
  return (

<div
onClick={()=>navigate(`/viewcourse/${id}`)}
className="
w-full
max-w-[400px]
bg-white
rounded-xl
sm:rounded-2xl
overflow-hidden
border
border-gray-200
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
cursor-pointer
">

  {/* Image */}

  <img
    src={thumbnail}
    alt={title}
    className="
    w-full
    h-24
    xs:h-28
    sm:h-36
    md:h-44
    object-cover
    "
  />

  {/* Content */}

  <div className="p-2 sm:p-3 md:p-5">

    {/* Title */}

    <h2
      className="
      text-xs
      sm:text-sm
      md:text-lg
      font-semibold
      text-gray-900
      line-clamp-2
      "
    >

      {title}

    </h2>

    {/* Category */}

    <div className="mt-2">

      <span
      className="
      inline-block
      px-2
      py-1
      rounded-full
      bg-gray-100
      text-gray-600
      text-[10px]
      sm:text-xs
      capitalize
      ">

        {category}

      </span>

    </div>

    {/* Price */}

    <div
    className="
    flex
    justify-between
    items-center
    mt-3
    text-xs
    sm:text-sm
    ">

      <span className="font-bold text-gray-800">

        ₹{price}

      </span>

      <span className="flex items-center gap-1">

        <FaStar className="text-yellow-500 text-xs"/>

        {avgRating}

      </span>

    </div>

  </div>

</div>

);
};

export default Card;

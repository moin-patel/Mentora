import { FaStar, FaRegStar } from "react-icons/fa6";

const ReviewCard = ({ comment, image, rating, role, name, description, courseTitle }) => {
  return (
    



<div
  className="
    w-full
    max-w-[320px]
    min-h-[250px]
    bg-white
    rounded-2xl
    border
    border-slate-200
    p-5
    shadow-md
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
    flex
    flex-col
    justify-between
  "
>
  {/* ⭐ Rating */}
  <div className="flex items-center mb-3 text-yellow-400">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <FaStar size={16} />
          ) : (
            <FaRegStar size={16} />
          )}
        </span>
      ))}
  </div>

  {/* 📘 Course */}
  <div className="mb-3">
    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
      {courseTitle}
    </span>
  </div>

  {/* 💬 Review */}
  <p
    className="
      text-slate-600
      text-sm
      leading-6
      flex-1
      line-clamp-4
      italic
    "
  >
    "{comment}"
  </p>

  {/* 👤 User */}
  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
    <img
      src={image || `https://ui-avatars.com/api/?name=${name}`}
      alt={name}
      className="
        w-12
        h-12
        rounded-full
        object-cover
        border-2
        border-slate-200
      "
    />

    <div className="flex-1 overflow-hidden">
      <h4 className="font-semibold text-slate-800 text-sm truncate">
        {name}
      </h4>

      <p className="text-xs text-blue-600 truncate">
        {role}
      </p>

      <p className="text-[11px] text-slate-400 truncate">
        {description}
      </p>
    </div>
  </div>
</div>

  );
};

export default ReviewCard;
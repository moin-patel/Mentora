
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function Profile() {
  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()

  
  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 py-10 px-4 flex items-center justify-center">

  <div className="bg-slate-500 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-lg w-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]  relative">
    
    {/* Back Button */}
    <div 
      className="absolute top-6 left-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition shadow-sm" 
      onClick={() => navigate("/")}
    >
      <FaArrowLeftLong className="w-5 h-5 text-slate-800" />
    </div>

    {/* Profile Header */}
    <div className="flex flex-col items-center text-center mt-6">
      <div className="relative">
        {userData.photoUrl ? (
          <img
            src={userData?.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 shadow-xl"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-800 text-white flex items-center justify-center text-4xl font-bold shadow-xl border-4 border-slate-200">
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      
      <h2 className="text-3xl font-extrabold mt-6 text-slate-900">{userData.name}</h2>
      <div className="mt-2 inline-flex items-center px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200">
        {userData.role}
      </div>
    </div>

    <div className="mt-10 space-y-4">
      <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</p>
        <p className="text-slate-900 font-semibold mt-0.5">{userData.email}</p>
      </div>

      <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">About Me</p>
        <p className="text-slate-800 text-sm mt-1 leading-relaxed">
          {userData.description || "No bio added yet."}
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl shadow-inner">
        <span className="font-semibold text-slate-300 text-sm">Enrolled Courses</span>
        <span className="text-white font-bold text-lg bg-slate-800 px-3 py-1 rounded-lg">
          {userData.enrolledCourses?.length || 0}
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-8">
      <button 
        className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25" 
        onClick={() => navigate("/editprofile")}
      >
        Edit Profile
      </button>
    </div>
  </div>
</div>
  )
}


export default Profile

import axios from 'axios'
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
     let {userData} = useSelector(state=>state.user)
     let [name,setName] = useState(userData.name || "")
     let [description,setDescription] = useState(userData.description || "")
     let [photoUrl,setPhotoUrl] = useState(null)
     let dispatch = useDispatch()
     let [loading,setLoading] = useState(false)
     let navigate = useNavigate()

      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("photoUrl",photoUrl)



     const updateProfile = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + "/api/user/updateprofile" ,formData , {withCredentials:true} )
        console.log(result.data)
        dispatch(setUserData(result.data))
        navigate("/")
        setLoading(false)
      
        toast.success("Profile Update Successfully")
        

        
      } catch (error) {
        console.log(error)
        toast.error("Profile Update Error")
        setLoading(false)
      }
      
     }


return (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 flex items-center justify-center px-4 py-12">

    <div
      className="
        w-full
        max-w-5xl
        bg-white
        rounded-[32px]
        shadow-[0_25px_70px_rgba(0,0,0,0.15)]
        overflow-hidden
        grid
        lg:grid-cols-2
      "
    >

      {/* LEFT SIDE */}

      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 flex flex-col items-center justify-center">

        {/* Back Button */}

        <FaArrowLeftLong
          onClick={() => navigate("/profile")}
          className="
            absolute
            top-8
            left-8
            text-white
            w-6
            h-6
            cursor-pointer
            hover:-translate-x-1
            transition
          "
        />

        {/* Heading */}

        <h1 className="text-4xl font-bold text-white mb-3">
          Edit Profile
        </h1>

        <p className="text-slate-300 text-center max-w-xs mb-10">
          Update your personal information and keep your profile
          up to date.
        </p>

        {/* Profile Image */}

        {userData.photoUrl ? (

          <img
            src={userData.photoUrl}
            alt=""
            className="
              w-40
              h-40
              rounded-full
              object-cover
              border-[6px]
              border-white
              shadow-2xl
            "
          />

        ) : (

          <div
            className="
              w-40
              h-40
              rounded-full
              bg-white
              text-slate-900
              flex
              items-center
              justify-center
              text-6xl
              font-bold
              border-[6px]
              border-slate-300
              shadow-2xl
            "
          >
            {userData?.name.slice(0,1).toUpperCase()}
          </div>

        )}

        {/* Upload */}

        <label
          className="
            mt-8
            px-6
            py-3
            rounded-xl
            bg-white
            text-slate-900
            font-semibold
            cursor-pointer
            hover:bg-slate-200
            transition
          "
        >
          Change Avatar

          <input
            type="file"
            name="photoUrl"
            className="hidden"
            onChange={(e) => setPhotoUrl(e.target.files[0])}
          />

        </label>

      </div>

      {/* RIGHT SIDE */}

      <div className="p-10 lg:p-12 flex items-center">

        <form
          className="w-full space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
                  {/* Name */}

          <div>

            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={name}
              placeholder={userData.name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                h-14
                rounded-2xl
                bg-slate-100
                border
                border-slate-200
                px-5
                text-slate-800
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-slate-700
                transition
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Email Address
            </label>

            <input
              type="email"
              readOnly
              placeholder={userData.email}
              className="
                w-full
                h-14
                rounded-2xl
                bg-slate-200
                border
                border-slate-300
                px-5
                text-slate-500
                cursor-not-allowed
              "
            />

          </div>

          {/* Description */}

          <div>

            <label className="block text-sm font-semibold text-slate-600 mb-2">
              About Yourself
            </label>

            <textarea
              name="description"
              rows={6}
              value={description}
              placeholder="Tell us about yourself..."
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                rounded-2xl
                bg-slate-100
                border
                border-slate-200
                px-5
                py-4
                resize-none
                text-slate-700
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-slate-700
                transition
              "
            />

          </div>
                    {/* Save Button */}

          <div className="pt-4">

            <button
              type="submit"
              disabled={loading}
              onClick={updateProfile}
              className="
                w-full
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-slate-900
                via-slate-800
                to-slate-700
                text-white
                font-semibold
                text-lg
                shadow-lg
                hover:shadow-2xl
                hover:scale-[1.02]
                active:scale-95
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
              "
            >

              {loading ? (
                <ClipLoader size={28} color="white" />
              ) : (
                "Save Changes"
              )}

            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

);

}

export default EditProfile

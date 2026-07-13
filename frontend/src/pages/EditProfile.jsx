import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData.photoUrl || null);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateProfile = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (photoUrl) {
        formData.append("photoUrl", photoUrl);
      }

      const result = await axios.post(
        serverUrl + "/api/user/updateprofile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(setUserData(result.data));

      toast.success("Profile Update Successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Profile Update Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.15)] lg:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 sm:p-10">
          <FaArrowLeftLong
            onClick={() => navigate("/profile")}
            className="absolute top-6 left-6 h-6 w-6 cursor-pointer text-white transition hover:-translate-x-1 sm:top-8 sm:left-8"
          />

          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            Edit Profile
          </h1>

          <p className="mb-8 max-w-xs text-center text-sm text-slate-300 sm:mb-10 sm:text-base">
            Update your personal information and keep your profile up to date.
          </p>

          {/* IMAGE PREVIEW */}

          {previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className="h-32 w-32 rounded-full border-[6px] border-white object-cover shadow-2xl sm:h-40 sm:w-40"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-slate-300 bg-white text-5xl font-bold text-slate-900 shadow-2xl sm:h-40 sm:w-40 sm:text-6xl">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <label className="mt-6 cursor-pointer rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-200 sm:mt-8 sm:px-6">
            Change Avatar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setPhotoUrl(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          {photoUrl && (
            <p className="mt-3 max-w-xs truncate rounded-lg bg-white/20 px-4 py-2 text-sm text-white">
              📷 {photoUrl.name}
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center p-6 sm:p-10 lg:p-12">
          <form
            className="w-full space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 w-full rounded-2xl border bg-slate-100 px-5 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Email Address
              </label>

              <input
                type="email"
                readOnly
                value={userData.email}
                className="h-14 w-full cursor-not-allowed rounded-2xl bg-slate-200 px-5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                About Yourself
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-2xl border bg-slate-100 px-5 py-4 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={updateProfile}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? (
                <ClipLoader size={28} color="white" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

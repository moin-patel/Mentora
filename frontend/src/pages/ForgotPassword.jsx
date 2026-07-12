import axios from 'axios'
import  { useState } from 'react'
import { useNavigate , Navigate , useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'

function ForgotPassword() {
 
    let navigate = useNavigate()
    const [step,setStep] = useState(1)
    const [email,setEmail] = useState("")
    const [otp,setOtp] = useState("")
    const [loading,setLoading]= useState(false)
    const [newpassword,setNewPassword]= useState("")
    const [conPassword,setConpassword]= useState("")
  

     const location = useLocation();

  if (!location.state?.allowed) {
    return <Navigate to="/login" />;
  }
   const handleStep1 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp` , {email} , {withCredentials:true})
      console.log(result)
      setStep(2)
      toast.success(result.data.message)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }
    const handleStep2 = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp` , {email,otp} , {withCredentials:true})
      console.log(result)
      
      toast.success(result.data.message)
      setLoading(false)
      setStep(3)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }
    const handleStep3 = async () => {
    setLoading(true)
    try {
      if(newpassword !== conPassword){
        return toast.error("password does not match")
      }
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword` , {email,password:newpassword} , {withCredentials:true})
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
    
   }


 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex-col items-center justify-center p-10 relative overflow-hidden">

        <div className="absolute w-60 h-60 bg-white/10 rounded-full blur-3xl top-10"></div>

        <div className="absolute w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl bottom-10"></div>

        <h1 className="text-5xl text-white font-bold">
          Mentora
        </h1>

        <p className="text-blue-100 text-center mt-5 px-8">
          Recover your account securely and continue your learning journey.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-10 bg-white">

        {/* Progress */}
        <div className="flex justify-center gap-3 mb-8">
          <div
            className={`w-3 h-3 rounded-full ${
              step >= 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-3 h-3 rounded-full ${
              step >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-3 h-3 rounded-full ${
              step >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password
            </h2>

            <p className="text-gray-500 mb-8">
              Enter your registered email address.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleStep1}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>

            <p
              onClick={() => navigate("/login")}
              className="text-center mt-5 text-blue-600 cursor-pointer"
            >
              Back to Login
            </p>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify OTP
            </h2>

            <p className="text-gray-500 mb-8">
              Enter the OTP sent to your email.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block mb-2 text-sm font-medium">
                  OTP Code
                </label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleStep2}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>

            <p
              onClick={() => navigate("/login")}
              className="text-center mt-5 text-blue-600 cursor-pointer"
            >
              Back to Login
            </p>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>

            <p className="text-gray-500 mb-8">
              Create a new password for your account.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block mb-2 text-sm font-medium">
                  New Password
                </label>

                <input
                  type="password"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={conPassword}
                  onChange={(e) => setConpassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleStep3}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <p
              onClick={() => navigate("/login")}
              className="text-center mt-5 text-blue-600 cursor-pointer"
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default ForgotPassword

import { genToken } from "../configs/token.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import sendMail from "../configs/Mail.js"
import { setUserData } from "../../frontend/src/redux/userSlice.js"
// import { setCourseData, setCreatorCourseData, setSelectedCourseData } from "../../frontend/src/redux/courseSlice.js"


export const signUp=async (req,res)=>{
 
    try {

        let {name,email,password,role}= req.body
        let existUser= await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"email already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Please enter valid Email"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Please enter a Strong Password"})
        }
        
        let hashPassword = await bcrypt.hash(password,10)
        let user = await User.create({
            name ,
            email ,
            password:hashPassword ,
            role,
           
            })
        let token = await genToken(user._id) // user._id kaha se aa rahae hai? user model me jab ham new user create karte hai to mongoose automatically usko ek unique _id assign kar deta hai. to user._id se ham us user ka unique id le rahe hai jo database me store hua hai. is id ko ham token generate karne ke liye use karte hai taki jab user login kare to uska token valid ho aur ham us token se user ki identity verify kar sake.or genToken function me ham userId ko payload me add karte hai taki jab token verify kare to ham userId ko access kar sake aur uske hisab se data fetch ya update kar sake.
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // token ki expiry time set kar rahe hai 7 din ke liye. 
        })
        return res.status(201).json(user)

    } catch (error) {
        console.log("signUp error")
        return res.status(500).json({message:`signUp Error ${error}`})
    }
}



export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check agar fields khali hain
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email }).populate("enrolledCourses");
        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }
        
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect Password" });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log("login error");
        return res.status(500).json({ message: `login Error ${error}` });
    }
}


export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "LogOut Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `logout Error ${error}`,
    });
  }
};


export const googleSignup = async (req,res) => {
    try {
        const {name , email , role} = req.body // yaha ham password nahi le rahe hai kyunki google signup me password ki zarurat nahi hoti hai. jab user google se signup karta hai to uska email aur name google se milta hai aur ham usko apne database me store kar dete hai. isliye ham password ko is case me handle nahi kar rahe hai.
        /// kyuki google signup me user apne google account se login karta hai to uska authentication google ke through hota hai aur ham usko apne database me store karte hai taki jab user login kare to ham usko identify kar sake aur uske hisab se data fetch ya update kar sake. isliye ham password ko is case me handle nahi kar rahe hai. agar future me ham apne application me normal signup bhi allow karna chahte hai to ham password ko handle kar sakte hai. lekin abhi ke liye ham google signup me password ko handle nahi kar rahe hai.
        let user= await User.findOne({email})
        if(!user){
            user = await User.create({
            name , email ,role
        })
        }
        let token =await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)


    } catch (error) {
        console.log(error)
         return res.status(500).json({message:`googleSignup  ${error}`})
    }
    
}



export const googlelogin = async (req,res) => {
    try {
        const {name , email , role} = req.body
        let user= await User.findOne({email})
        if(!user){
            user = await User.create({
            name , email ,role
        })  // agar user google login kar raha hai aur uska email hamare database me nahi hai to ham usko create kar denge taki jab user login kare to ham usko identify kar sake aur uske hisab se data fetch ya update kar sake. isliye ham google login me bhi user ko create kar rahe hai agar wo pehle se exist nahi karta hai. lekin agar user pehle se exist karta hai to ham usko create nahi karenge aur uska token generate karenge taki jab user login kare to ham usko identify kar sake aur uske hisab se data fetch ya update kar sake.
        }
        let token =await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)


    } catch (error) {
        console.log(error)
         return res.status(500).json({message:`googleSignup  ${error}`})
    }
    
}

export const sendOtp = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()  //

        user.resetOtp = otp,
        user.otpExpires=Date.now() + 5*60*1000,
        user.isOtpVerifed= false 

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({message:"Email Successfully send"})
    } catch (error) {

        return res.status(500).json({message:`send otp error ${error}`})
        
    }
}

export const verifyOtp = async (req,res) => {
    try {
        const {email,otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now() ){
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.isOtpVerifed=true
        user.resetOtp=undefined
        user.otpExpires=undefined
        await user.save()
        return res.status(200).json({message:"OTP varified "})


    } catch (error) {
         return res.status(500).json({message:`Verify otp error ${error}`})
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {email ,password } =  req.body
         const user = await User.findOne({email})
        if(!user || !user.isOtpVerifed ){
            return res.status(404).json({message:"OTP verfication required"})
        }

        const hashPassword = await bcrypt.hash(password,10)
        user.password = hashPassword
        user.isOtpVerifed=false 
        await user.save()
        return res.status(200).json({message:"Password Reset Successfully"})
    } catch (error) {
        return res.status(500).json({message:`Reset Password error ${error}`})
    }
}

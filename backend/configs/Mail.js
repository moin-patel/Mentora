import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({

  host: "142.250.152.108",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },

  tls:{
    rejectUnauthorized:false
  }

});


transporter.verify((error,success)=>{

  if(error){
    console.log("SMTP ERROR",error);
  }
  else{
    console.log("SMTP READY");
  }

});


const sendMail = async(to,otp)=>{

  await transporter.sendMail({

    from:process.env.EMAIL,

    to,

    subject:"Reset Your Password",

    html:`
    <p>Your OTP is <b>${otp}</b></p>
    `

  });

};


export default sendMail;

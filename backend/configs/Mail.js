import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  family: 4, // 👈 force IPv4

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,

  socketTimeout: 10000,

});


const sendMail = async (to, otp) => {

  try {

    const info = await transporter.sendMail({

      from: process.env.EMAIL,

      to: to,

      subject: "Reset Your Password",

      html: `
        <p>Your OTP for Password Reset is 
        <b>${otp}</b></p>
        <p>It expires in 5 minutes.</p>
      `

    });


    console.log("MAIL SENT:", info.messageId);

    return true;


  } catch(error){

    console.log("MAIL ERROR:", error);

    throw error;

  }

};


export default sendMail;

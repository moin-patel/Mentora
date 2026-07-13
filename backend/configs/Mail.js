// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 465,
//   secure: true, 
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });


// const sendMail=async (to,otp) => {
//     transporter.sendMail({
//         from:process.env.EMAIL,
//         to:to,
//         subject:"Reset Your Password",
//         html:`<p>Your OTP for Password Reset is <b>${otp}</b>.
//         It expires in 5 minutes.</p>`
//     })
// }


// export default sendMail

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const sendMail = async (to, otp) => {

  try {

    const info = await transporter.sendMail({

      from: process.env.EMAIL,

      to,

      subject: "Reset Your Password",

      html: `
        <h2>Mentora Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `

    });


    console.log("MAIL SENT:", info.messageId);


    return true;


  } catch(error){

    console.log("MAIL ERROR:", error);

    throw error;

  }

}


export default sendMail;

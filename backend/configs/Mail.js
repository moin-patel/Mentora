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

  host: "smtp.gmail.com",

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


const sendMail = async(to,otp)=>{

  try{

    const info = await transporter.sendMail({

      from: process.env.EMAIL,

      to: to,

      subject:"Reset Your Password",

      html:`
        <h2>Mentora Password Reset</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `

    });


    console.log("MAIL SENT:",info.messageId);


  }catch(error){

    console.log("MAIL ERROR:",error);

    throw error;

  }

}


export default sendMail;

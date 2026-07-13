import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({

host:"smtp.gmail.com",

port:465,

secure:true,

family:4,

auth:{
user:process.env.EMAIL,
pass:process.env.EMAIL_PASS
}

});

transporter.verify((error, success)=>{

 if(error){
   console.log("SMTP ERROR",error);
 }
 else{
   console.log("SMTP READY");
 }

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

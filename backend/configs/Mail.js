
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, otp) => {
  try {
    const data = await resend.emails.send({
      from: "Mentora <onboarding@resend.dev>",

      to: to,

      subject: "Reset Your Password OTP",

      html: `
                <h2>Mentora Password Reset</h2>

                <p>Your OTP for password reset is:</p>

                <h1>${otp}</h1>

                <p>This OTP will expire in 5 minutes.</p>
            `,
    });

    console.log("Email Sent Successfully:", data);
  } catch (error) {
    console.log("Resend Email Error:", error);

    throw error;
  }
};

export default sendMail;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {
  await resend.emails.send({
    from: "HotelHub <onboarding@resend.dev>",
    to,
    subject: "HotelHub Password Reset OTP",
    html: `
      <h2>HotelHub Password Reset</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};

module.exports = sendEmail;
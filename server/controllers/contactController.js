const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      inquiryType,
      message,
    } = req.body;

    // ============================
    // Validation
    // ============================
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // ============================
    // Email Transporter
    // ============================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ============================
    // Email to HotelHub owner
    // ============================
    const mailOptions = {
      from: `"HotelHub Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,

      replyTo: email,

      subject: `HotelHub Contact: ${inquiryType}`,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <title>HotelHub Contact Message</title>
        </head>

        <body style="
          margin:0;
          padding:0;
          background:#f4f7fb;
          font-family:Arial,Helvetica,sans-serif;
        ">

          <div style="
            max-width:650px;
            margin:30px auto;
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 10px 30px rgba(0,0,0,0.08);
          ">

            <!-- Header -->
            <div style="
              background:#0f172a;
              padding:30px;
              color:white;
            ">
              <h1 style="
                margin:0;
                font-size:26px;
              ">
                HotelHub
              </h1>

              <p style="
                margin:8px 0 0;
                color:#cbd5e1;
                font-size:14px;
              ">
                New Contact Form Message
              </p>
            </div>

            <!-- Content -->
            <div style="padding:30px;">

              <div style="
                background:#eff6ff;
                border-radius:12px;
                padding:18px;
                margin-bottom:25px;
              ">
                <p style="
                  margin:0 0 5px;
                  color:#64748b;
                  font-size:12px;
                  text-transform:uppercase;
                  font-weight:bold;
                ">
                  Inquiry Type
                </p>

                <p style="
                  margin:0;
                  color:#0f172a;
                  font-size:16px;
                  font-weight:bold;
                ">
                  ${inquiryType}
                </p>
              </div>

              <!-- Name -->
              <div style="margin-bottom:20px;">
                <p style="
                  margin:0 0 5px;
                  color:#64748b;
                  font-size:12px;
                  font-weight:bold;
                  text-transform:uppercase;
                ">
                  Customer
                </p>

                <p style="
                  margin:0;
                  color:#0f172a;
                  font-size:16px;
                ">
                  ${firstName} ${lastName}
                </p>
              </div>

              <!-- Email -->
              <div style="margin-bottom:20px;">
                <p style="
                  margin:0 0 5px;
                  color:#64748b;
                  font-size:12px;
                  font-weight:bold;
                  text-transform:uppercase;
                ">
                  Email
                </p>

                <p style="
                  margin:0;
                  color:#2563eb;
                  font-size:16px;
                ">
                  ${email}
                </p>
              </div>

              <!-- Message -->
              <div>
                <p style="
                  margin:0 0 8px;
                  color:#64748b;
                  font-size:12px;
                  font-weight:bold;
                  text-transform:uppercase;
                ">
                  Message
                </p>

                <div style="
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:12px;
                  padding:18px;
                  color:#334155;
                  font-size:15px;
                  line-height:1.7;
                ">
                  ${message.replace(/\n/g, "<br />")}
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="
              padding:20px 30px;
              background:#f8fafc;
              border-top:1px solid #e2e8f0;
            ">
              <p style="
                margin:0;
                color:#94a3b8;
                font-size:12px;
              ">
                This message was sent from the HotelHub website contact form.
              </p>
            </div>

          </div>

        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message. Please try again later.",
    });
  }
};

module.exports = {
  sendContactMessage,
};
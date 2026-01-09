const nodemailer = require("nodemailer");

module.exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  let data;
  try { data = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, body: "Invalid JSON" }; }

  if (!data.name || !data.phone) return { statusCode: 400, body: "Missing fields" };

  // Create transporter with environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"TaalumaCyber Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: "New Enquiry from Website",
    text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || ""}\nMessage: ${data.message || ""}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ ok: true, message: "Enquiry sent!" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Failed to send email" };
  }
};

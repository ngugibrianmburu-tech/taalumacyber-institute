exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || "{}");

  const message = `
New enquiry from TaalumaCyber Institute

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
School: ${data.school}
Level: ${data.level}
Package: ${data.package}

Message:
${data.message}
`;

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"TaalumaCyber Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: "New Website Enquiry",
    text: message
  });

  return {
    statusCode: 200,
    body: "Sent"
  };
};

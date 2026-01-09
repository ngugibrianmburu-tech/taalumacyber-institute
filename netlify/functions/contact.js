// netlify/functions/contact.js
// Simple Netlify serverless function to handle contact form POST requests

module.exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  let data;
  try {
    // Parse the JSON body
    data = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      body: "Invalid JSON"
    };
  }

  // Basic validation (optional)
  if (!data.name || !data.phone) {
    return {
      statusCode: 400,
      body: "Missing required fields: name and phone"
    };
  }

  // For now, just echo back the received data
  // Later you can replace this with nodemailer to send real emails
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Message received successfully",
      received: data
    })
  };
};

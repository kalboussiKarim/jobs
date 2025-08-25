// test-email.js
// Run this with: node test-email.js

const { Resend } = require("resend");
require("dotenv").config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("🧪 Testing email configuration...");
  console.log(
    "🔑 API Key:",
    process.env.RESEND_API_KEY ? "Set ✅" : "Missing ❌"
  );
  console.log(
    "📧 From Email:",
    process.env.FROM_EMAIL || "onboarding@resend.dev"
  );

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["kalboussikarim3@gmail.com"], // Replace with your email
      subject: "Test Email from Resend",
      html: "<h1>Hello World</h1><p>This is a test email!</p>",
    });

    console.log("✅ Test email sent successfully:", result);
  } catch (error) {
    console.error("❌ Test email failed:", error);
  }
}

testEmail();

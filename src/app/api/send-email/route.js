import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    console.log("📨 Email API route called");
    console.log(
      "🔑 API Key status:",
      process.env.RESEND_API_KEY ? "Set" : "Missing"
    );

    const body = await request.json();
    const { firstName, lastName, email, targetJob, availability } = body;

    console.log("📧 Sending email to:", email);

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is missing");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const emailData = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: [email],
      subject: "Application Confirmation - Thank You for Applying!",
      html: generateConfirmationEmailHTML({
        firstName,
        lastName,
        targetJob,
        availability,
      }),
      text: generateConfirmationEmailText({
        firstName,
        lastName,
        targetJob,
        availability,
      }),
    });

    console.log("✅ Email sent successfully:", emailData);

    return NextResponse.json({
      success: true,
      data: emailData,
    });
  } catch (error) {
    console.error("❌ Email API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}

function generateConfirmationEmailHTML({
  firstName,
  lastName,
  targetJob,
  availability,
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Confirmation</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2563eb;
          margin: 0;
          font-size: 28px;
        }
        .content {
          margin-bottom: 25px;
        }
        .highlight {
          background-color: #eff6ff;
          padding: 15px;
          border-left: 4px solid #2563eb;
          margin: 20px 0;
          border-radius: 0 5px 5px 0;
        }
        .info-item {
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .info-label {
          font-weight: bold;
          color: #374151;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received!</h1>
        </div>
        
        <div class="content">
          <p>Dear ${firstName} ${lastName},</p>
          
          <p>Thank you for your interest in joining our team! We have successfully received your application and wanted to confirm the details with you.</p>
          
          <div class="highlight">
            <h3 style="margin-top: 0; color: #2563eb;">Application Summary</h3>
            <div class="info-item">
              <span class="info-label">Position Applied For:</span> ${targetJob}
            </div>
            <div class="info-item">
              <span class="info-label">Availability:</span> ${availability}
            </div>
            <div class="info-item">
              <span class="info-label">Application Date:</span> ${new Date().toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Our recruitment team will review your application within 3-5 business days</li>
            <li>If your profile matches our requirements, we'll contact you for the next steps</li>
            <li>You'll receive updates via email at this address</li>
          </ul>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>Important:</strong> Please keep this email for your records. If you have any questions, feel free to reply to this email.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing us for your career journey!</p>
          <p><strong>HR Team</strong><br>
          Your Company Name<br>
          Email: hr@yourcompany.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateConfirmationEmailText({
  firstName,
  lastName,
  targetJob,
  availability,
}) {
  return `
Application Confirmation

Dear ${firstName} ${lastName},

Thank you for your interest in joining our team! We have successfully received your application.

APPLICATION SUMMARY:
- Position Applied For: ${targetJob}
- Availability: ${availability}
- Application Date: ${new Date().toLocaleDateString()}

WHAT'S NEXT?
- Our recruitment team will review your application within 3-5 business days
- If your profile matches our requirements, we'll contact you for the next steps
- You'll receive updates via email at this address

Please keep this email for your records. If you have any questions, feel free to reply to this email.

Thank you for choosing us for your career journey!

HR Team
Your Company Nameeeeeeee
Email: hr@yourcompany.com
  `.trim();
}

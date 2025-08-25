import { Resend } from "resend";

// Only initialize Resend on server-side
const resend =
  typeof window === "undefined" ? new Resend(process.env.RESEND_API_KEY) : null;

export class EmailService {
  /**
   * Send application confirmation email
   * @param {Object} applicationData - The application data
   * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
   */
  static async sendApplicationConfirmation(applicationData) {
    try {
      // Check if running on server-side
      if (typeof window !== "undefined") {
        throw new Error("Email service can only be used on server-side");
      }

      console.log("🔄 Attempting to send email...");
      console.log("📧 Email data:", {
        to: applicationData.email,
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        apiKey: process.env.RESEND_API_KEY ? "✅ Set" : "❌ Missing",
      });

      const { firstName, lastName, email, targetJob, availability } =
        applicationData;

      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not set in environment variables");
      }

      if (!resend) {
        throw new Error("Resend client not initialized");
      }

      const emailData = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: [email],
        subject: "Application Confirmation - Thank You for Applying!",
        html: this.generateConfirmationEmailHTML({
          firstName,
          lastName,
          targetJob,
          availability,
        }),
        text: this.generateConfirmationEmailText({
          firstName,
          lastName,
          targetJob,
          availability,
        }),
      });

      console.log("✅ Email sent successfully:", emailData);
      return {
        success: true,
        data: emailData,
      };
    } catch (error) {
      console.error("❌ Error sending confirmation email:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return {
        success: false,
        error: error.message || "Failed to send confirmation email",
      };
    }
  }

  /**
   * Generate HTML content for confirmation email
   * @param {Object} data - Email template data
   * @returns {string} HTML content
   */
  static generateConfirmationEmailHTML({
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
          .button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
            font-weight: bold;
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
            Horizon Talents<br>
            Email: hr@horizontalents.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate plain text content for confirmation email
   * @param {Object} data - Email template data
   * @returns {string} Plain text content
   */
  static generateConfirmationEmailText({
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
Horizon Talents
Email: hr@HorizonTalents.com
    `.trim();
  }

  /**
   * Send notification email to admin/HR
   * @param {Object} applicationData - The application data
   * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
   */
  static async sendAdminNotification(applicationData) {
    try {
      const { firstName, lastName, email, targetJob, phone, preferredCountry } =
        applicationData;

      const emailData = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: [process.env.ADMIN_EMAIL || "hr@yourcompany.com"], // Add admin email to env
        subject: `New Application Received - ${targetJob}`,
        html: `
          <h2>New Application Received</h2>
          <p><strong>Applicant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position:</strong> ${targetJob}</p>
          <p><strong>Preferred Countries:</strong> ${preferredCountry}</p>
          <p><strong>Application Date:</strong> ${new Date().toLocaleString()}</p>
          
          <p>Please review the application in your admin dashboard.</p>
        `,
      });

      return {
        success: true,
        data: emailData,
      };
    } catch (error) {
      console.error("Error sending admin notification:", error);
      return {
        success: false,
        error: error.message || "Failed to send admin notification",
      };
    }
  }
}

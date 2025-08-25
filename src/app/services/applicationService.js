import db from "../backend/databases";
import st from "../backend/storage";
import { Permission, Role } from "appwrite";
// Remove this line: import { EmailService } from "./emailService";

export class ApplicationService {
  /**
   * @param {Object} formData - The application form data.
   * @param {File|null} [resumeFile=null] - Optional resume file.
   * @returns {Promise<{ success: boolean, data?: any, message?: string, error?: string }>}
   */
  static async submitApplication(formData, resumeFile = null) {
    let resumeFileId = null;

    try {
      // Upload resume file if provided
      if (resumeFile) {
        const uploadResponse = await st.resumes.upload(resumeFile);
        resumeFileId = uploadResponse.$id;
      }

      // Prepare the application data
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        birthday: new Date(formData.dob).toISOString(),
        experience: formData.experience,
        diploma: formData.diploma,
        frenchLevel: formData.frenchLevel,
        englishLevel: formData.englishLevel,
        targetJob: formData.targetJob,
        availability: formData.availability,
        phone: formData.phone,
        preferredCountry: formData.preferredCountry,
        linkedinURL: formData.linkedinURL || null,
        resumeURL: resumeFileId,
      };

      // Create the application document
      const response = await db.applications.create(applicationData);

      // Send confirmation email to applicant via API route
      let emailResult = { success: false };
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            targetJob: formData.targetJob,
            availability: formData.availability,
          }),
        });

        emailResult = await emailResponse.json();
        console.log("📧 Email API response:", emailResult);
      } catch (emailError) {
        console.error("📧 Email API call failed:", emailError);
        emailResult = { success: false, error: emailError.message };
      }

      // Send notification email to admin (optional - doesn't affect success)
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "admin",
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            targetJob: formData.targetJob,
            phone: formData.phone,
            preferredCountry: formData.preferredCountry,
          }),
        });
      } catch (adminEmailError) {
        console.warn("Admin notification email failed:", adminEmailError);
        // Don't fail the application if admin email fails
      }

      // Determine success message based on email delivery
      let message = "Application submitted successfully!";
      if (emailResult.success) {
        message += " A confirmation email has been sent to your email address.";
      } else {
        message +=
          " However, we couldn't send a confirmation email. Please save your application details.";
        console.warn("Confirmation email failed:", emailResult.error);
      }

      return {
        success: true,
        data: response,
        message: message,
        emailSent: emailResult.success,
      };
    } catch (error) {
      console.error("Error submitting application:", error);

      // If resume was uploaded but application creation failed, clean up the file
      if (resumeFileId) {
        try {
          await st.resumes.delete(resumeFileId);
        } catch (cleanupError) {
          console.error("Error cleaning up uploaded file:", cleanupError);
        }
      }

      return {
        success: false,
        error: error.message || "Failed to submit application",
      };
    }
  }

  /**
   * Resend confirmation email for an existing application
   * @param {string} applicationId - The application ID
   * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
   */
  static async resendConfirmationEmail(applicationId) {
    try {
      // Get application data
      const application = await db.applications.get(applicationId);

      if (!application) {
        return {
          success: false,
          error: "Application not found",
        };
      }

      // Send confirmation email
      const emailResult = await EmailService.sendApplicationConfirmation({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        targetJob: application.targetJob,
        availability: application.availability,
      });

      if (emailResult.success) {
        return {
          success: true,
          message: "Confirmation email sent successfully!",
        };
      } else {
        return {
          success: false,
          error: emailResult.error || "Failed to send confirmation email",
        };
      }
    } catch (error) {
      console.error("Error resending confirmation email:", error);
      return {
        success: false,
        error: error.message || "Failed to resend confirmation email",
      };
    }
  }
}

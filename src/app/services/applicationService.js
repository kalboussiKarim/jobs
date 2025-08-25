import db from "../backend/databases";
import st from "../backend/storage";
import { Permission, Role } from "appwrite";

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

      // Email functionality removed - application saved successfully
      console.log("Application saved successfully:", response);

      return {
        success: true,
        data: response,
        message:
          "Application submitted successfully! We'll review it and get back to you soon.",
        emailSent: false, // No email sent
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
    // Email functionality disabled
    return {
      success: false,
      error: "Email functionality is currently disabled",
    };
  }
}

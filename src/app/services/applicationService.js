import db from "../backend/databases";
import st from "../backend/storage";
import { Permission, Role } from "appwrite";

export class ApplicationService {
  static async submitApplication(formData, resumeFile = null) {
    try {
      let resumeFileId = null;

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

      return {
        success: true,
        data: response,
        message: "Application submitted successfully!",
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
}

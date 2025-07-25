import db from "../backend/databases";
import st from "../backend/storage";
import { Permission, Role } from "appwrite";

export class ApplicationService {
  static async submitApplication(
    formData: Record<string, any>,
    resumeFile: File | null = null
  ) {
    try {
      // Verify reCAPTCHA token first
      if (formData.recaptchaToken) {
        const recaptchaVerified = await this.verifyRecaptcha(
          formData.recaptchaToken
        );
        if (!recaptchaVerified) {
          return {
            success: false,
            error: "reCAPTCHA verification failed. Please try again.",
          };
        }
      } else {
        return {
          success: false,
          error: "reCAPTCHA verification is required.",
        };
      }

      let resumeFileId = null;

      // Upload resume file if provided
      if (resumeFile) {
        const resumes = (st as any).resumes;
        const uploadResponse = await resumes.upload(
          resumeFile,
          [Permission.read(Role.any())], // Read permissions
          [Permission.write(Role.any())] // Write permissions
        );
        resumeFileId = uploadResponse.$id;
      }

      // Prepare the application data (excluding recaptchaToken from stored data)
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
      const applications = (db as any).applications;
      const response = await applications.create(applicationData);

      return {
        success: true,
        data: response,
        message: "Application submitted successfully!",
      };
    } catch (error) {
      console.error("Error submitting application:", error);

      let resumeFileId: string | null = null;
      // If resume was uploaded but application creation failed, clean up the file
      if (resumeFileId) {
        try {
          const resumes = (st as any).resumes;
          await resumes.delete(resumeFileId);
        } catch (cleanupError) {
          console.error("Error cleaning up uploaded file:", cleanupError);
        }
      }
      let errorMessage = "Failed to submit application";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Verify reCAPTCHA token with Google's API
   */
  private static async verifyRecaptcha(token: string): Promise<boolean> {
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;

      if (!secretKey) {
        console.error("RECAPTCHA_SECRET_KEY is not configured");
        return false;
      }

      const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${secretKey}&response=${token}`,
        }
      );

      const data = await response.json();

      // Check if verification was successful and score is above threshold (for v3)
      // For v2, just check the success field
      return data.success && (data.score === undefined || data.score >= 0.5);
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
      return false;
    }
  }
}

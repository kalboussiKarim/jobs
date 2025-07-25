"use client";
import React, { useState, useRef } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ReCAPTCHA from "react-google-recaptcha";
import { ApplicationService } from "../../services/applicationService";
import { validateForm } from "../../utils/validation";

const inputClass =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150";
const inputClass2 =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150 appearance-none cursor-pointer";

const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

const ApplyForm: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    experience: "0",
    diploma: "CAP/BEP",
    frenchLevel: "A1",
    englishLevel: "A1",
    targetJob: "developer",
    availability: "",
    phone: undefined as E164Number | undefined,
    preferredCountry: "France",
    linkedinURL: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token && errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: "" }));
    }
  };

  // Phone validation function
  const validatePhoneNumber = (phone?: E164Number) => {
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required." }));
    } else if (phone.replace(/\D/g, "").length > 15) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number cannot exceed 15 digits.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];

      if (error.code === "file-too-large") {
        setErrors((prev) => ({
          ...prev,
          file: "File is too large. Maximum size is 2MB.",
        }));
      } else if (error.code === "file-invalid-type") {
        setErrors((prev) => ({
          ...prev,
          file: "Invalid file type. Only PDF, DOC, and DOCX are accepted.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, file: "File upload error." }));
      }
      setUploadedFile(null);
      return;
    }

    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  }, []);

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate reCAPTCHA first
    if (!recaptchaToken) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: "Please complete the reCAPTCHA verification",
      }));
      setIsSubmitting(false);
      return;
    }

    // Validate form
    const validation = validateForm({
      ...formData,
      phone: formData.phone,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit the application

      const result = await ApplicationService.submitApplication(
        {
          ...formData,
          phone: formData.phone || "",
          recaptchaToken: recaptchaToken,
        },
        uploadedFile
      );

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Application submitted successfully!",
        });
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 2000);

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          experience: "0",
          diploma: "CAP/BEP",
          frenchLevel: "A1",
          englishLevel: "A1",
          targetJob: "developer",
          availability: "",
          phone: undefined,
          preferredCountry: "France",
          linkedinURL: "",
        });
        setUploadedFile(null);
        setErrors({});
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to submit application",
        });
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 2000);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className={`${inputClass} ${
              errors.firstName ? "border-red-500" : ""
            }`}
            value={formData.firstName}
            required
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className={`${inputClass} ${
              errors.lastName ? "border-red-500" : ""
            }`}
            value={formData.lastName}
            required
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {errors.names && (
        <div>
          <p className="text-red-500 text-sm mt-0">{errors.names}</p>
        </div>
      )}

      {/* Email Address */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          placeholder="example@email.com"
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
          required
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dob" className={labelClass}>
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dob"
          className={`${inputClass} ${errors.dob ? "border-red-500" : ""}`}
          value={formData.dob}
          required
          onChange={(e) => handleInputChange("dob", e.target.value)}
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
        )}
      </div>

      {/* Years of Experience */}
      <div>
        <label htmlFor="experience" className={labelClass}>
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <select
          id="experience"
          className={inputClass}
          value={formData.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
        >
          {[...Array(11).keys()].map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
          <option value="10+">10+</option>
        </select>
      </div>

      {/* Diploma */}
      <div>
        <label htmlFor="diploma" className={labelClass}>
          Highest Diploma Obtained <span className="text-red-500">*</span>
        </label>
        <select
          id="diploma"
          className={inputClass}
          value={formData.diploma}
          onChange={(e) => handleInputChange("diploma", e.target.value)}
        >
          <option value="CAP/BEP">CAP/BEP</option>
          <option value="Bac">Bac</option>
          <option value="Bac+2">Bac+2 (BTS/DUT)</option>
          <option value="Bac+3/4">Licence/Bachelor</option>
          <option value="Bac+5">Master/Ingénieur</option>
          <option value="Doctorat">Doctorat</option>
        </select>
      </div>

      {/* Language Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="french" className={labelClass}>
            French Level <span className="text-red-500">*</span>
          </label>
          <select
            id="french"
            className={inputClass}
            value={formData.frenchLevel}
            onChange={(e) => handleInputChange("frenchLevel", e.target.value)}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>
        <div>
          <label htmlFor="english" className={labelClass}>
            English Level <span className="text-red-500">*</span>
          </label>
          <select
            id="english"
            className={inputClass}
            value={formData.englishLevel}
            onChange={(e) => handleInputChange("englishLevel", e.target.value)}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>
      </div>

      {/* Target Job */}
      <div>
        <label htmlFor="job" className={labelClass}>
          Target Job <span className="text-red-500">*</span>
        </label>
        <select
          id="job"
          className={inputClass}
          value={formData.targetJob}
          onChange={(e) => handleInputChange("targetJob", e.target.value)}
        >
          <option value="developer">Software Developer</option>
          <option value="designer">UI/UX Designer</option>
          <option value="project-manager">Project Manager</option>
          <option value="qa">Quality Assurance</option>
          <option value="sysadmin">System Administrator</option>
          <option value="data-analyst">Data Analyst</option>
          <option value="marketing">Marketing Specialist</option>
          <option value="sales">Sales Representative</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <span className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Availability <span className="text-red-500">*</span>
        </span>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="availability"
              value="0-1 months"
              className="form-radio text-blue-600 focus:ring-blue-500"
              checked={formData.availability === "0-1 months"}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
              required
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              0-1 month
            </span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="availability"
              value="1-3 months"
              className="form-radio text-blue-600 focus:ring-blue-500"
              checked={formData.availability === "1-3 months"}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              1-3 months
            </span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="availability"
              value="3-6 months"
              className="form-radio text-blue-600 focus:ring-blue-500"
              checked={formData.availability === "3-6 months"}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              3-6 months
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="availability"
              value="+6 months"
              className="form-radio text-blue-600 focus:ring-blue-500"
              checked={formData.availability === "+6 months"}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              +6 months
            </span>
          </label>
        </div>
        {errors.availability && (
          <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-red-500">*</span>
        </label>

        <PhoneInput
          international
          defaultCountry="TN"
          value={formData.phone}
          onChange={(value) => {
            handleInputChange("phone", value);
            validatePhoneNumber(value);
          }}
          className={`${inputClass2} ${errors.phone ? "border-red-500" : ""}`}
          placeholder="Enter phone number"
          id="phone"
          countries={["TN", "DZ", "MA", "LY", "EG"]}
          labels={en}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className={labelClass}>
          Preferred Country
        </label>
        <select
          id="country"
          className={inputClass}
          value={formData.preferredCountry}
          onChange={(e) =>
            handleInputChange("preferredCountry", e.target.value)
          }
        >
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Belgium">Belgium</option>
          <option value="Sweden">Sweden</option>
        </select>
      </div>

      {/* LinkedIn / Portfolio */}
      <div>
        <label htmlFor="linkedin" className={labelClass}>
          LinkedIn Profile or Portfolio URL
        </label>
        <input
          type="url"
          id="linkedin"
          className={`${inputClass} ${
            errors.linkedinURL ? "border-red-500" : ""
          }`}
          value={formData.linkedinURL}
          onChange={(e) => handleInputChange("linkedinURL", e.target.value)}
        />
        {errors.linkedinURL && (
          <p className="text-red-500 text-sm mt-1">{errors.linkedinURL}</p>
        )}
      </div>

      {/* Resume Upload */}
      <div>
        <label className={labelClass}>Upload Resume (PDF/DOC, max 2MB)</label>
        <div
          {...getRootProps()}
          className={`mt-2 flex items-center justify-center px-4 py-6 border-2 border-dashed ${
            errors.file
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-lg cursor-pointer bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-400 transition`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm">Drop the file here ...</p>
          ) : uploadedFile ? (
            <p className="text-sm font-medium text-blue-600">
              {uploadedFile.name}
            </p>
          ) : (
            <p className="text-sm">
              Drag and drop your resume here, or click to select file
            </p>
          )}
        </div>
        {errors.file && (
          <p className="mt-2 text-sm text-red-600">{errors.file}</p>
        )}
      </div>

      {/* reCAPTCHA */}
      <div>
        <label className={labelClass}>
          Verification <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={handleRecaptchaChange}
            theme="light"
          />
          {errors.recaptcha && (
            <p className="mt-2 text-sm text-red-600">{errors.recaptcha}</p>
          )}
        </div>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !recaptchaToken}
        className={`w-full py-3 rounded-lg font-semibold transform transition-all duration-1000 ${
          isSubmitting || !recaptchaToken
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:bg-gradient-to-r hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 hover:scale-101"
        } text-white`}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplyForm;

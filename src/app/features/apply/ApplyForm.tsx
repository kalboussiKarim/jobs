"use client";
import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ApplicationService } from "../../services/applicationService";
import { validateForm } from "../../utils/validation";
import db from "@/app/backend/databases";
import { Query } from "appwrite";

const inputClass =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150";
const inputClass2 =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150 appearance-none cursor-pointer";

const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

interface Experience {
  id: string;
  years: string;
  description: string;
}

const ApplyForm: React.FC = () => {
  // Math question state
  const [mathQuestion, setMathQuestion] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");

  const [targetJobs, setTargetJobs] = useState<
    Array<{ $id: string; field: string; visible: boolean }>
  >([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Available countries list
  const availableCountries = [
    "France",
    "Germany",
    "Netherlands",
    "Belgium",
    "Sweden",
    "Canada",
    "United Kingdom",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    diploma: "CAP/BEP",
    frenchLevel: "A1",
    englishLevel: "A1",
    targetJob: "",
    availability: "",
    phone: undefined as E164Number | undefined,
    preferredCountry1: "France",
    preferredCountry2: "Germany",
    preferredCountry3: "Netherlands",
    linkedinURL: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Generate new math question
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer;
    let question;

    if (operator === "+") {
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
    } else {
      // For subtraction, ensure positive result
      if (num1 >= num2) {
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
      } else {
        answer = num2 - num1;
        question = `${num2} - ${num1}`;
      }
    }

    setMathQuestion({ question, answer });
  };

  // Generate initial math question
  useEffect(() => {
    generateMathQuestion();
  }, []);

  // Fetch interest fields from database
  useEffect(() => {
    const fetchTargetJobs = async () => {
      try {
        setIsLoadingJobs(true);
        const response = await db.intrestFields.list();
        const visibleJobs = response.documents.filter(
          (job: any) => job.visible === true
        );
        setTargetJobs(visibleJobs);
      } catch (error) {
        console.error("Error fetching target jobs:", error);
        // Fallback to default options if fetch fails
        setTargetJobs([
          { $id: "fallback-1", field: "developer", visible: true },
          { $id: "fallback-2", field: "designer", visible: true },
          { $id: "fallback-3", field: "project-manager", visible: true },
          { $id: "fallback-4", field: "qa", visible: true },
          { $id: "fallback-5", field: "sysadmin", visible: true },
          { $id: "fallback-6", field: "data-analyst", visible: true },
          { $id: "fallback-7", field: "marketing", visible: true },
          { $id: "fallback-8", field: "sales", visible: true },
        ]);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    fetchTargetJobs();
  }, []);

  useEffect(() => {
    if (targetJobs.length > 0 && !formData.targetJob) {
      setFormData((prev) => ({
        ...prev,
        targetJob: targetJobs[0].field,
      }));
    }
  }, [targetJobs, formData.targetJob]);

  // Experience management functions
  const addExperience = () => {
    if (experiences.length < 3) {
      const newExperience: Experience = {
        id: Date.now().toString(),
        years: "1",
        description: "",
      };
      setExperiences([...experiences, newExperience]);
    }
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    // Clear any related errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`experience-${id}-description`];
      return newErrors;
    });
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );

    // Clear error when user starts typing
    if (field === "description" && errors[`experience-${id}-description`]) {
      setErrors((prev) => ({ ...prev, [`experience-${id}-description`]: "" }));
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear country validation errors when any country changes
    if (field.startsWith("preferredCountry")) {
      setErrors((prev) => ({ ...prev, preferredCountries: "" }));
    }
  };

  // Handle math answer change
  const handleMathAnswerChange = (value: string) => {
    setUserAnswer(value);
    if (errors.mathCaptcha) {
      setErrors((prev) => ({ ...prev, mathCaptcha: "" }));
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

  // Validate preferred countries
  const validatePreferredCountries = () => {
    const countries = [
      formData.preferredCountry1,
      formData.preferredCountry2,
      formData.preferredCountry3,
    ];

    const uniqueCountries = new Set(countries);
    if (uniqueCountries.size !== 3) {
      setErrors((prev) => ({
        ...prev,
        preferredCountries: "Please select 3 different countries.",
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, preferredCountries: "" }));
    return true;
  };

  // Get available countries for a specific dropdown (excluding already selected ones)
  const getAvailableCountriesFor = (currentField: string) => {
    const selectedCountries = [
      formData.preferredCountry1,
      formData.preferredCountry2,
      formData.preferredCountry3,
    ];

    // Get the current value for this field
    const currentValue = formData[
      currentField as keyof typeof formData
    ] as string;

    // Filter out countries that are selected in other fields
    return availableCountries.filter(
      (country) =>
        country === currentValue || !selectedCountries.includes(country)
    );
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

    // Validate math CAPTCHA first
    if (parseInt(userAnswer) !== mathQuestion.answer) {
      setErrors((prev) => ({
        ...prev,
        mathCaptcha: "Incorrect answer. Please try again.",
      }));
      generateMathQuestion(); // Generate new question
      setUserAnswer(""); // Clear user answer
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate application
    try {
      const duplicateCheck = await db.applications.list([
        Query.equal("email", formData.email),
        Query.equal("targetJob", formData.targetJob),
      ]);

      if (duplicateCheck.documents.length > 0) {
        setErrors((prev) => ({
          ...prev,
          duplicate:
            "You have already applied for this position with this email address.",
        }));
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Error checking for duplicate application:", error);
      // Continue with submission if check fails to avoid blocking legitimate applications
    }

    // Validate preferred countries
    if (!validatePreferredCountries()) {
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
      // Convert experiences to string array format "years:description"
      const experienceStrings =
        experiences.length > 0
          ? experiences.map((exp) => `${exp.years}:${exp.description}`)
          : [];

      // Combine preferred countries into a single string
      const preferredCountryString = `${formData.preferredCountry1}:${formData.preferredCountry2}:${formData.preferredCountry3}`;

      // Submit the application
      console.log(
        "Submitting application with preferred countries:",
        preferredCountryString
      );
      const result = await ApplicationService.submitApplication(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          diploma: formData.diploma,
          frenchLevel: formData.frenchLevel,
          englishLevel: formData.englishLevel,
          targetJob: formData.targetJob,
          availability: formData.availability,
          phone: formData.phone || "",
          preferredCountry: preferredCountryString, // Send as combined string
          linkedinURL: formData.linkedinURL,
          experience: experienceStrings, // Send as array of strings
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
          diploma: "CAP/BEP",
          frenchLevel: "A1",
          englishLevel: "A1",
          targetJob: "developer",
          availability: "",
          phone: undefined,
          preferredCountry1: "France",
          preferredCountry2: "Germany",
          preferredCountry3: "Netherlands",
          linkedinURL: "",
        });
        setExperiences([]);
        setUploadedFile(null);
        setErrors({});
        setUserAnswer("");
        generateMathQuestion();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to submit application",
        });
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
        // Generate new math question on error
        generateMathQuestion();
        setUserAnswer("");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 2000);
      // Generate new math question on error
      generateMathQuestion();
      setUserAnswer("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMathAnswerCorrect =
    userAnswer !== "" && parseInt(userAnswer) === mathQuestion.answer;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

      {/* Experience Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass}>Experience</label>
          <button
            type="button"
            onClick={addExperience}
            disabled={experiences.length >= 3}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              experiences.length >= 3
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Add Experience ({experiences.length}/3)
          </button>
        </div>

        {experiences.length === 0 && (
          <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No experiences added yet. Click "Add Experience" to add your work
              experience (optional).
            </p>
          </div>
        )}

        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-3 bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Experience #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Years of Experience
                </label>
                <select
                  value={experience.years}
                  onChange={(e) =>
                    updateExperience(experience.id, "years", e.target.value)
                  }
                  className={inputClass}
                >
                  {[...Array(10).keys()].map((year) => (
                    <option key={year + 1} value={(year + 1).toString()}>
                      {year + 1} {year + 1 === 1 ? "year" : "years"}
                    </option>
                  ))}
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Experience Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(
                      experience.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Software Engineer, Frontend Developer, etc."
                  className={`${inputClass} ${
                    errors[`experience-${experience.id}-description`]
                      ? "border-red-500"
                      : ""
                  }`}
                  required
                />
                {errors[`experience-${experience.id}-description`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`experience-${experience.id}-description`]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {errors.experiences && (
          <p className="text-red-500 text-sm mt-1">{errors.experiences}</p>
        )}
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
          disabled={isLoadingJobs}
        >
          {isLoadingJobs ? (
            <option value="">Loading...</option>
          ) : (
            <>
              {!formData.targetJob && <option value="">Select a job...</option>}
              {targetJobs.map((job) => (
                <option key={job.$id} value={job.field}>
                  {job.field
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </>
          )}
        </select>
        {isLoadingJobs && (
          <p className="text-sm text-gray-500 mt-1">
            Loading available positions...
          </p>
        )}
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

      {/* Preferred Countries */}
      <div>
        <label className={labelClass}>
          Preferred Countries (Select 3) <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Please select 3 different countries in order of preference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="preferredCountry1"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              1st Choice
            </label>
            <select
              id="preferredCountry1"
              className={`${inputClass} ${
                errors.preferredCountries ? "border-red-500" : ""
              }`}
              value={formData.preferredCountry1}
              onChange={(e) =>
                handleInputChange("preferredCountry1", e.target.value)
              }
            >
              {getAvailableCountriesFor("preferredCountry1").map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="preferredCountry2"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              2nd Choice
            </label>
            <select
              id="preferredCountry2"
              className={`${inputClass} ${
                errors.preferredCountries ? "border-red-500" : ""
              }`}
              value={formData.preferredCountry2}
              onChange={(e) =>
                handleInputChange("preferredCountry2", e.target.value)
              }
            >
              {getAvailableCountriesFor("preferredCountry2").map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="preferredCountry3"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              3rd Choice
            </label>
            <select
              id="preferredCountry3"
              className={`${inputClass} ${
                errors.preferredCountries ? "border-red-500" : ""
              }`}
              value={formData.preferredCountry3}
              onChange={(e) =>
                handleInputChange("preferredCountry3", e.target.value)
              }
            >
              {getAvailableCountriesFor("preferredCountry3").map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.preferredCountries && (
          <p className="text-red-500 text-sm mt-2">
            {errors.preferredCountries}
          </p>
        )}
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

      {/* Math CAPTCHA */}
      <div>
        <label className={labelClass}>
          Security Check <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Please solve this simple math problem to verify you're human:
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {mathQuestion.question} =
            </span>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => handleMathAnswerChange(e.target.value)}
              className={`w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.mathCaptcha
                  ? "border-red-500"
                  : isMathAnswerCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
              placeholder="?"
              required
            />
            {isMathAnswerCorrect && (
              <span className="text-green-600 text-sm">✓ Correct!</span>
            )}
          </div>
          {errors.mathCaptcha && (
            <p className="mt-2 text-sm text-red-600">{errors.mathCaptcha}</p>
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
      {/* Duplicate Application Error */}
      {errors.duplicate && (
        <div className="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
          {errors.duplicate}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transform transition-all duration-1000 ${
          isSubmitting
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

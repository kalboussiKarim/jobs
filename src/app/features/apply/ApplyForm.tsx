"use client";
import React, { useState, useEffect } from "react";
import { E164Number } from "libphonenumber-js";
import { ApplicationService } from "../../services/applicationService";
import { validateForm } from "../../utils/validation";
import db from "@/app/backend/databases";
import { Query } from "appwrite";

// Import all field components
import { FirstNameField } from "./fields/FirstNameField";
import { LastNameField } from "./fields/LastNameField";
import { EmailField } from "./fields/EmailField";
import { DateOfBirthField } from "./fields/DateOfBirthField";
import { ExperienceField } from "./fields/ExperienceField";
import { DiplomaField } from "./fields/DiplomaField";
import { FrenchLevelField } from "./fields/FrenchLevelField";
import { EnglishLevelField } from "./fields/EnglishLevelField";
import { TargetJobField } from "./fields/TargetJobField";
import { AvailabilityField } from "./fields/AvailabilityField";
import { PhoneField } from "./fields/PhoneField";
import { PreferredCountriesField } from "./fields/PreferredCountriesField";
import { LinkedInField } from "./fields/LinkedInField";
import { FileUploadField } from "./fields/FileUploadField";
import { MathCaptchaField } from "./fields/MathCaptchaField";
import { StatusMessagesField } from "./fields/StatusMessagesField";
import { useLanguage } from "@/app/lib/LanguageContext";

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

  const { t } = useLanguage();

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
    targetJob: targetJobs.length > 0 ? targetJobs[0].field : "",
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

    if (field === "description" && errors[`experience-${id}-description`]) {
      setErrors((prev) => ({ ...prev, [`experience-${id}-description`]: "" }));
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

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

  // Get available countries for a specific dropdown
  const getAvailableCountriesFor = (currentField: string) => {
    const selectedCountries = [
      formData.preferredCountry1,
      formData.preferredCountry2,
      formData.preferredCountry3,
    ];

    const currentValue = formData[
      currentField as keyof typeof formData
    ] as string;

    return availableCountries.filter(
      (country) =>
        country === currentValue || !selectedCountries.includes(country)
    );
  };

  // Handle file upload
  const handleFileChange = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      setUploadedFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "File upload error or invalid file type/size.",
      }));
    }
  };

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
      generateMathQuestion();
      setUserAnswer("");
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
      const experienceStrings =
        experiences.length > 0
          ? experiences.map((exp) => `${exp.years}:${exp.description}`)
          : [];

      const preferredCountryString = `${formData.preferredCountry1}:${formData.preferredCountry2}:${formData.preferredCountry3}`;

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
          preferredCountry: preferredCountryString,
          linkedinURL: formData.linkedinURL,
          experience: experienceStrings,
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
          targetJob: targetJobs.length > 0 ? targetJobs[0].field : "",
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
      generateMathQuestion();
      setUserAnswer("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Personal Information */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FirstNameField
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          error={errors.firstName}
          inputClass={inputClass}
          labelClass={labelClass}
        />

        <LastNameField
          value={formData.lastName}
          onChange={(value) => handleInputChange("lastName", value)}
          error={errors.lastName}
          inputClass={inputClass}
          labelClass={labelClass}
        />
      </div>

      <EmailField
        value={formData.email}
        onChange={(value) => handleInputChange("email", value)}
        error={errors.email}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      <DateOfBirthField
        value={formData.dob}
        onChange={(value) => handleInputChange("dob", value)}
        error={errors.dob}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      {/* Experience Section */}
      <ExperienceField
        experiences={experiences}
        onAdd={addExperience}
        onRemove={removeExperience}
        onUpdate={updateExperience}
        errors={errors}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      {/* Education */}
      <DiplomaField
        value={formData.diploma}
        onChange={(value) => handleInputChange("diploma", value)}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      {/* Language Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrenchLevelField
          value={formData.frenchLevel}
          onChange={(value) => handleInputChange("frenchLevel", value)}
          inputClass={inputClass}
          labelClass={labelClass}
        />

        <EnglishLevelField
          value={formData.englishLevel}
          onChange={(value) => handleInputChange("englishLevel", value)}
          inputClass={inputClass}
          labelClass={labelClass}
        />
      </div>

      {/* Job Information */}
      <TargetJobField
        value={formData.targetJob}
        onChange={(value) => handleInputChange("targetJob", value)}
        targetJobs={targetJobs}
        isLoadingJobs={isLoadingJobs}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      <AvailabilityField
        value={formData.availability}
        onChange={(value) => handleInputChange("availability", value)}
        error={errors.availability}
      />

      {/* Contact Information */}
      <PhoneField
        value={formData.phone}
        onChange={(value) => handleInputChange("phone", value)}
        onValidate={validatePhoneNumber}
        error={errors.phone}
        inputClass={inputClass2}
        labelClass={labelClass}
      />

      <PreferredCountriesField
        country1={formData.preferredCountry1}
        country2={formData.preferredCountry2}
        country3={formData.preferredCountry3}
        onChange={handleInputChange}
        getAvailableCountries={getAvailableCountriesFor}
        error={errors.preferredCountries}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      <LinkedInField
        value={formData.linkedinURL}
        onChange={(value) => handleInputChange("linkedinURL", value)}
        error={errors.linkedinURL}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      {/* File Upload */}
      <FileUploadField
        uploadedFile={uploadedFile}
        onFileChange={handleFileChange}
        error={errors.file}
        labelClass={labelClass}
      />

      {/* Math CAPTCHA */}
      <MathCaptchaField
        mathQuestion={mathQuestion}
        userAnswer={userAnswer}
        onChange={handleMathAnswerChange}
        error={errors.mathCaptcha}
        labelClass={labelClass}
      />

      {/* Status Messages */}
      <StatusMessagesField
        submitStatus={submitStatus}
        duplicateError={errors.duplicate}
        namesError={errors.names}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transform transition-all duration-1000 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:bg-gradient-to-r hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 hover:scale-101"
        } text-white`}
      >
        {isSubmitting ? t("Submitting...") : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplyForm;

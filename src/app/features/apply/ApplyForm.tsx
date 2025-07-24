"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const inputClass =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150";
const inputClass2 =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150 appearance-none cursor-pointer";

const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

const ApplyForm: React.FC = () => {
  const [value, setValue] = useState<E164Number | undefined>(undefined);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Email state and validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Birthdate state
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  // First, Last Name state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState("");

  // Phone number state
  const [phoneError, setPhoneError] = useState("");

  // File upload state
  const [fileError, setFileError] = useState("");

  // Phone validation function
  const validatePhoneNumber = (phone?: E164Number) => {
    if (!phone) {
      setPhoneError("Phone number is required.");
    } else if (phone.replace(/\D/g, "").length > 15) {
      setPhoneError("Phone number cannot exceed 15 digits.");
    } else {
      setPhoneError("");
    }
  };

  // Email validation function
  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];

      if (error.code === "file-too-large") {
        setFileError("File is too large. Maximum size is 2MB.");
      } else if (error.code === "file-invalid-type") {
        setFileError(
          "Invalid file type. Only PDF, DOC, and DOCX are accepted."
        );
      } else {
        setFileError("File upload error.");
      }
      setUploadedFile(null);
      return;
    }

    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setFileError(""); // clear error if valid
    }
  }, []);

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
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

  // Date of Birth validation function
  const validateDOB = (value: string): string => {
    const enteredDate = new Date(value);
    const today = new Date();
    const minAge = 17;
    const maxAge = 100;

    const age = today.getFullYear() - enteredDate.getFullYear();
    const m = today.getMonth() - enteredDate.getMonth();
    const d = today.getDate() - enteredDate.getDate();

    const validDate = !isNaN(enteredDate.getTime());

    if (!validDate) {
      return "Invalid date format.";
    }

    if (enteredDate > today) {
      return "Date of birth cannot be in the future.";
    }

    if (age < minAge || (age === minAge && (m < 0 || (m === 0 && d < 0)))) {
      return "You must be at least 17 years old.";
    }

    if (age > maxAge) {
      return "Please enter a valid age (less than 100 years).";
    }

    return ""; // No error
  };

  // Validate first and last names
  const validateNames = (first: string, last: string) => {
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    // Only validate if both names are filled
    if (!first || !last) {
      setNameError("");
      return;
    }

    if (
      !nameRegex.test(first) ||
      !nameRegex.test(last) ||
      first.toLowerCase() === last.toLowerCase()
    ) {
      setNameError(
        "First and last names must be different and contain only letters."
      );
    } else {
      setNameError("");
    }
  };

  return (
    <form className="space-y-6">
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
            className={inputClass}
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => validateNames(firstName, lastName)}
          />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className={inputClass}
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => validateNames(firstName, lastName)}
          />
        </div>
      </div>
      <div>
        {nameError && (
          <div className="col-span-2">
            <p className="text-red-500 text-sm mt-0">{nameError}</p>
          </div>
        )}
      </div>
      {/* Email Address */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="example@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          onBlur={() => {
            if (!validateEmail(email)) {
              setEmailError("Please enter a valid email address.");
            }
          }}
          className={`${inputClass} ${emailError ? "border-red-500" : ""}`}
          required
        />
        {emailError && (
          <p className="text-sm text-red-500 mt-1">{emailError}</p>
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
          className={inputClass}
          value={dob}
          required
          onChange={(e) => setDob(e.target.value)}
          onBlur={() => {
            const error = validateDOB(dob);
            setDobError(error);
          }}
        />
        {dobError && <p className="text-red-500 text-sm mt-1">{dobError}</p>}
      </div>

      {/* Years of Experience */}
      <div>
        <label htmlFor="experience" className={labelClass}>
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <select id="experience" className={inputClass}>
          {[...Array(11).keys()].map((year) => (
            <option key={year} value={year}>
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
        <select id="diploma" className={inputClass}>
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
          <select id="french" defaultValue="A1" className={inputClass}>
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
          <select id="english" defaultValue="A1" className={inputClass}>
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
        <select id="job" className={inputClass}>
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
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              3-6 months
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="availability"
              value="0-1 months"
              className="form-radio text-blue-600 focus:ring-blue-500"
              required
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              +6 months
            </span>
          </label>
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>

        <PhoneInput
          international
          defaultCountry="TN"
          value={value}
          onChange={setValue}
          onBlur={() => validatePhoneNumber(value)}
          className={inputClass2}
          placeholder="Enter phone number"
          id="phone"
          countries={["TN", "DZ", "MA", "LY", "EG"]}
          labels={en}
          required
        />
        {phoneError && (
          <p className="mt-1 text-sm text-red-600">{phoneError}</p>
        )}
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className={labelClass}>
          Preferred Country
        </label>
        <select id="country" className={inputClass}>
          <option value="france">France</option>
          <option value="germany">Germany</option>
          <option value="netherlands">Netherlands</option>
          <option value="belgium">Belgium</option>
          <option value="sweden">Sweden</option>
        </select>
      </div>

      {/* LinkedIn / Portfolio */}
      <div>
        <label htmlFor="linkedin" className={labelClass}>
          LinkedIn Profile or Portfolio URL
        </label>
        <input type="url" id="linkedin" className={inputClass} />
      </div>

      {/* Resume Upload */}
      <div>
        <label className={labelClass}>Upload Resume (PDF/DOC, max 2MB)</label>
        <div
          {...getRootProps()}
          className="mt-2 flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-400 transition"
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
        {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}
      </div>
      <div className="mt-5 mb-2">
        <span className=" text-gray-500 dark:text-gray-200 text-sm">
          Fields marked with (<span className="text-red-500 text-sm">*</span>
          <span className="text-gray-500 dark:text-gray-200 text-sm">
            ) are required.
          </span>
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className=" w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:bg-gradient-to-r hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white py-3 rounded-lg font-semibold transform hover:scale-101 transition-all duration-1000"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplyForm;

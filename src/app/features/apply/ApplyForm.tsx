"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";

const inputClass =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150";
const inputClass2 =
  "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150 appearance-none cursor-pointer";

const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

const ApplyForm: React.FC = () => {
  const [value, setValue] = useState<E164Number | undefined>(undefined);
  return (
    <form className="space-y-6">
      {/* Full Name */}
      <span className="text-red-500 text-sm">
        (*)means this field is required
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Family Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className={inputClass}
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dob" className={labelClass}>
          Date of Birth
          <span className="text-red-500">*</span>
        </label>
        <input type="date" id="dob" className={inputClass} />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-red-500">*</span>
        </label>

        <PhoneInput
          international
          defaultCountry="TN"
          value={value}
          onChange={setValue}
          className={inputClass2}
          placeholder="Enter phone number"
          id="phone"
          countries={["TN", "DZ", "MA", "LY", "EG"]}
          labels={en}
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label htmlFor="experience" className={labelClass}>
          Years of Experience
          <span className="text-red-500">*</span>
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
          Highest Diploma Obtained
          <span className="text-red-500">*</span>
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
            French Level
            <span className="text-red-500">*</span>
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
            English Level
            <span className="text-red-500">*</span>
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
          Target Job
          <span className="text-red-500">*</span>
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
          Availability
          <span className="text-red-500">*</span>
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
        <label htmlFor="resume" className={labelClass}>
          Upload Resume (PDF, 2MB max)
        </label>
        <input
          type="file"
          id="resume"
          accept=".pdf,.doc,.docx"
          className="mt-2 block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplyForm;

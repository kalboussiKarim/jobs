import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface PreferredCountriesFieldProps {
  country1: string;
  country2: string;
  country3: string;
  onChange: (field: string, value: string) => void;
  getAvailableCountries: (field: string) => string[];
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const PreferredCountriesField: React.FC<
  PreferredCountriesFieldProps
> = ({
  country1,
  country2,
  country3,
  onChange,
  getAvailableCountries,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label className={labelClass}>
        {t("ApplyForm.countriesSelect.title")}
        <span className="text-red-500">*</span>
      </label>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {t("ApplyForm.countriesSelect.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="preferredCountry1"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            {t("ApplyForm.countriesSelect.choice1")}
          </label>
          <select
            id="preferredCountry1"
            className={`${inputClass} ${error ? "border-red-500" : ""}`}
            value={country1}
            onChange={(e) => onChange("preferredCountry1", e.target.value)}
          >
            {getAvailableCountries("preferredCountry1").map((country) => (
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
            {t("ApplyForm.countriesSelect.choice2")}
          </label>
          <select
            id="preferredCountry2"
            className={`${inputClass} ${error ? "border-red-500" : ""}`}
            value={country2}
            onChange={(e) => onChange("preferredCountry2", e.target.value)}
          >
            {getAvailableCountries("preferredCountry2").map((country) => (
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
            {t("ApplyForm.countriesSelect.choice3")}
          </label>
          <select
            id="preferredCountry3"
            className={`${inputClass} ${error ? "border-red-500" : ""}`}
            value={country3}
            onChange={(e) => onChange("preferredCountry3", e.target.value)}
          >
            {getAvailableCountries("preferredCountry3").map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface AvailabilityFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const AvailabilityField: React.FC<AvailabilityFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  const { t } = useLanguage();
  return (
    <div className="mb-6">
      <span className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
        {t("ApplyForm.availability")} <span className="text-red-500">*</span>
      </span>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="availability"
            value="0-1 months"
            className="form-radio text-blue-600 focus:ring-blue-500"
            checked={value === "0-1 months"}
            onChange={(e) => onChange(e.target.value)}
            required
          />
          <span className="ml-2 text-gray-700 dark:text-gray-200">
            0-1 {t("ApplyForm.availabilityMonth")}
          </span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="availability"
            value="1-3 months"
            className="form-radio text-blue-600 focus:ring-blue-500"
            checked={value === "1-3 months"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-gray-700 dark:text-gray-200">
            1-3 {t("ApplyForm.availabilityMonths")}
          </span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="availability"
            value="3-6 months"
            className="form-radio text-blue-600 focus:ring-blue-500"
            checked={value === "3-6 months"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-gray-700 dark:text-gray-200">
            3-6 {t("ApplyForm.availabilityMonths")}
          </span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="availability"
            value="+6 months"
            className="form-radio text-blue-600 focus:ring-blue-500"
            checked={value === "+6 months"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-gray-700 dark:text-gray-200">
            +6 {t("ApplyForm.availabilityMonths")}
          </span>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

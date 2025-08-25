import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface LinkedInFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const LinkedInField: React.FC<LinkedInFieldProps> = ({
  value,
  onChange,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="linkedin" className={labelClass}>
        {t("ApplyForm.linkedin")}
      </label>
      <input
        type="url"
        id="linkedin"
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://linkedin.com/in/yourprofile"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

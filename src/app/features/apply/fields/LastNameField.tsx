import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface LastNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const LastNameField: React.FC<LastNameFieldProps> = ({
  value,
  onChange,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="lastName" className={labelClass}>
        {t("ApplyForm.lastname")} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface DateOfBirthFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({
  value,
  onChange,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="dob" className={labelClass}>
        {t("ApplyForm.birthdate")} <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="dob"
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

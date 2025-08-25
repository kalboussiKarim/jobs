import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  value,
  onChange,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="email" className={labelClass}>
        {t("ApplyForm.email")} <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        value={value}
        placeholder="example@email.com"
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        required
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

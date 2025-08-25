"use client";
import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface FirstNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const FirstNameField: React.FC<FirstNameFieldProps> = ({
  value,
  onChange,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="firstName" className={labelClass}>
        {t("ApplyForm.firstname")} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

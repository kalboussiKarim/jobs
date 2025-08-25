import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";
import { useLanguage } from "@/app/lib/LanguageContext";

interface PhoneFieldProps {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  onValidate: (value: E164Number | undefined) => void;
  error?: string;
  inputClass: string;
  labelClass: string;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  value,
  onChange,
  onValidate,
  error,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="phone" className={labelClass}>
        {t("ApplyForm.phoneNumber")} <span className="text-red-500">*</span>
      </label>

      <PhoneInput
        international
        defaultCountry="TN"
        value={value}
        onChange={(val) => {
          onChange(val);
          onValidate(val);
        }}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        placeholder="Enter phone number"
        id="phone"
        countries={["TN", "DZ", "MA", "LY", "EG"]}
        labels={en}
        required
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

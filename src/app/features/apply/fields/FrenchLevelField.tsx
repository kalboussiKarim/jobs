import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface FrenchLevelFieldProps {
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
}

export const FrenchLevelField: React.FC<FrenchLevelFieldProps> = ({
  value,
  onChange,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="french" className={labelClass}>
        {t("ApplyForm.frenchLevel")} <span className="text-red-500">*</span>
      </label>
      <select
        id="french"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
        <option value="C2">C2</option>
      </select>
    </div>
  );
};

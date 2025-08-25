import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface DiplomaFieldProps {
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
}

export const DiplomaField: React.FC<DiplomaFieldProps> = ({
  value,
  onChange,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="diploma" className={labelClass}>
        {t("ApplyForm.diploma")} <span className="text-red-500">*</span>
      </label>
      <select
        id="diploma"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="CAP/BEP">CAP/BEP</option>
        <option value="Bac">Bac</option>
        <option value="Bac+2">Bac+2 (BTS/DUT)</option>
        <option value="Bac+3/4">Licence/Bachelor</option>
        <option value="Bac+5">Master/Ingénieur</option>
        <option value="Doctorat">Doctorat</option>
      </select>
    </div>
  );
};

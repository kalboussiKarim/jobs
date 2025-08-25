import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface TargetJob {
  $id: string;
  field: string;
  visible: boolean;
}

interface TargetJobFieldProps {
  value: string;
  onChange: (value: string) => void;
  targetJobs: TargetJob[];
  isLoadingJobs: boolean;
  inputClass: string;
  labelClass: string;
}

export const TargetJobField: React.FC<TargetJobFieldProps> = ({
  value,
  onChange,
  targetJobs,
  isLoadingJobs,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="job" className={labelClass}>
        {t("ApplyForm.targetJob")} <span className="text-red-500">*</span>
      </label>
      <select
        id="job"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoadingJobs}
      >
        {isLoadingJobs ? (
          <option value="">Loading...</option>
        ) : (
          <>
            {!value && <option value="">Select a job...</option>}
            {targetJobs.map((job) => (
              <option key={job.$id} value={job.field}>
                {job.field
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </>
        )}
      </select>
      {isLoadingJobs && (
        <p className="text-sm text-gray-500 mt-1">
          Loading available positions...
        </p>
      )}
    </div>
  );
};

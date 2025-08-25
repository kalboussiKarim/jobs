import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface Experience {
  id: string;
  years: string;
  description: string;
}

interface ExperienceFieldProps {
  experiences: Experience[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Experience, value: string) => void;
  errors: Record<string, string>;
  inputClass: string;
  labelClass: string;
}

export const ExperienceField: React.FC<ExperienceFieldProps> = ({
  experiences,
  onAdd,
  onRemove,
  onUpdate,
  errors,
  inputClass,
  labelClass,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className={labelClass}>
          {t("ApplyForm.FormExperience.title")}
        </label>
        <button
          type="button"
          onClick={onAdd}
          disabled={experiences.length >= 3}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            experiences.length >= 3
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {t("ApplyForm.FormExperience.addExperience")} ({experiences.length}/3)
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {t("ApplyForm.FormExperience.noExperience")}
          </p>
        </div>
      )}

      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-3 bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              {t("ApplyForm.FormExperience.title")} #{index + 1}
            </h4>
            <button
              type="button"
              onClick={() => onRemove(experience.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              {t("ApplyForm.FormExperience.removeExperience")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {t("ApplyForm.FormExperience.yearsExperience")}
              </label>
              <select
                value={experience.years}
                onChange={(e) =>
                  onUpdate(experience.id, "years", e.target.value)
                }
                className={inputClass}
              >
                {[...Array(10).keys()].map((year) => (
                  <option key={year + 1} value={(year + 1).toString()}>
                    {year + 1} {year + 1 === 1 ? "year" : "years"}
                  </option>
                ))}
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {t("ApplyForm.FormExperience.descriptionExperience")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={experience.description}
                onChange={(e) =>
                  onUpdate(experience.id, "description", e.target.value)
                }
                placeholder="e.g., Software Engineer, Frontend Developer, etc."
                className={`${inputClass} ${
                  errors[`experience-${experience.id}-description`]
                    ? "border-red-500"
                    : ""
                }`}
                required
              />
              {errors[`experience-${experience.id}-description`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`experience-${experience.id}-description`]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {errors.experiences && (
        <p className="text-red-500 text-sm mt-1">{errors.experiences}</p>
      )}
    </div>
  );
};

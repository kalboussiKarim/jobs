import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

interface MathQuestion {
  question: string;
  answer: number;
}

interface MathCaptchaFieldProps {
  mathQuestion: MathQuestion;
  userAnswer: string;
  onChange: (value: string) => void;
  error?: string;
  labelClass: string;
}

export const MathCaptchaField: React.FC<MathCaptchaFieldProps> = ({
  mathQuestion,
  userAnswer,
  onChange,
  error,
  labelClass,
}) => {
  const { t } = useLanguage();
  const isMathAnswerCorrect =
    userAnswer !== "" && parseInt(userAnswer) === mathQuestion.answer;

  return (
    <div>
      <label className={labelClass}>
        {t("ApplyForm.security.title")} <span className="text-red-500">*</span>
      </label>
      <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {t("ApplyForm.security.description")}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {mathQuestion.question} =
          </span>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => onChange(e.target.value)}
            className={`w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              error
                ? "border-red-500"
                : isMathAnswerCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
            }`}
            placeholder="?"
            required
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

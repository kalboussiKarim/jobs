"use client";
import { useLanguage } from "@/app/lib/LanguageContext";
import React from "react";

const ApplyHeader: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          {t("ApplyHeader.title")}
        </h1>
      </div>
      <div className="text-left mb-10">
        <div>
          <span className=" text-black dark:text-gray-200 text-sm">
            {t("ApplyHeader.subtitle1")} (
            <span className="text-red-500 text-sm">*</span>
            <span className="text-black dark:text-gray-200 text-sm">
              ) {t("ApplyHeader.subtitle2")}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ApplyHeader;

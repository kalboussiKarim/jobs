"use client";

import React from "react";
import ApplyForm from "../features/apply/ApplyForm";

const ApplyPage: React.FC = () => {
  return (
    <section
      id="apply"
      className="pt-15 pb-30 bg-gray-200 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-15">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Apply Now
          </h1>
        </div>
        <ApplyForm />
      </div>
    </section>
  );
};

export default ApplyPage;

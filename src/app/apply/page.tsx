import React from "react";
import ApplyForm from "../features/apply/ApplyForm";
import { Metadata } from "next";
import ApplyHeader from "../features/apply/applyFormComponents/ApplyTitle";

export const metadata: Metadata = {
  title: "Apply Now - Horizon Talents",
  description: "Submit your application to join our program.",
};

const ApplyPage: React.FC = () => {
  return (
    <section className="pt-15 pb-30 bg-gray-200 dark:bg-gray-900 transition-colors duration-300 ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ApplyHeader />

        <ApplyForm />
      </div>
    </section>
  );
};

export default ApplyPage;

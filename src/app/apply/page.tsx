"use client";

import React from "react";
import ApplyForm from "../../features/apply/ApplyForm";

const ApplyPage: React.FC = () => {
  return (
    <div className="py-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Apply Now</h1>
      <ApplyForm />
    </div>
  );
};

export default ApplyPage;

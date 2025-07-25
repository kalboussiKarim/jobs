import React from "react";

const ApplyHeader: React.FC = () => {
  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Apply Now
        </h1>
      </div>
      <div className="text-left mb-10">
        <div>
          <span className=" text-black dark:text-gray-200 text-sm">
            Fields marked with (<span className="text-red-500 text-sm">*</span>
            <span className="text-black dark:text-gray-200 text-sm">
              ) are required.
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ApplyHeader;

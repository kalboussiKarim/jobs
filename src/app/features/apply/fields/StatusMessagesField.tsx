import React from "react";

interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

interface StatusMessagesFieldProps {
  submitStatus: SubmitStatus;
  duplicateError?: string;
  namesError?: string;
}

export const StatusMessagesField: React.FC<StatusMessagesFieldProps> = ({
  submitStatus,
  duplicateError,
  namesError,
}) => {
  return (
    <>
      {/* Names Error */}
      {namesError && (
        <div className="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
          {namesError}
        </div>
      )}

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Duplicate Application Error */}
      {duplicateError && (
        <div className="p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
          {duplicateError}
        </div>
      )}
    </>
  );
};

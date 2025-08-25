import { useLanguage } from "@/app/lib/LanguageContext";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadFieldProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  labelClass: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  uploadedFile,
  onFileChange,
  error,
  labelClass,
}) => {
  const { t } = useLanguage();
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any) => {
      if (fileRejections.length > 0) {
        const error = fileRejections[0].errors[0];
        // Handle error through parent component
        onFileChange(null);
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024, // 2MB
  });

  return (
    <div>
      <label className={labelClass}>{t("ApplyForm.resume")}</label>
      <div
        {...getRootProps()}
        className={`mt-2 flex items-center justify-center px-4 py-6 border-2 border-dashed ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } rounded-lg cursor-pointer bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-blue-400 transition`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm">{t("ApplyForm.resumeDescription1")}</p>
        ) : uploadedFile ? (
          <p className="text-sm font-medium text-blue-600">
            {uploadedFile.name}
          </p>
        ) : (
          <p className="text-sm">{t("ApplyForm.resumeDescription2")}</p>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import db from "../../backend/databases";
import st from "../../backend/storage";
import { Query } from "appwrite";

interface Application {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  experience: string[];
  diploma: string;
  frenchLevel: string;
  englishLevel: string;
  targetJob: string;
  availability: string;
  phone: string;
  preferredCountry: string;
  linkedinURL?: string;
  resumeURL?: string;
  $createdAt: string;
}

const APPLICATIONS_PER_PAGE = 10;

export default function AdminApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const totalPages = Math.ceil(totalApplications / APPLICATIONS_PER_PAGE);

  const loadApplications = async (page: number) => {
    setLoading(true);
    setError("");

    try {
      const offset = (page - 1) * APPLICATIONS_PER_PAGE;
      const response = await db.applications.list([
        Query.limit(APPLICATIONS_PER_PAGE),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]);

      setApplications(response.documents);
      setTotalApplications(response.total);
    } catch (err: any) {
      setError("Failed to load applications: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fixed resume viewing function
  const handleViewResume = async (resumeId: string) => {
    try {
      // Get the file view URL - this returns a URL object
      const fileViewUrl = st.resumes.getFileView(resumeId);

      // Open the URL in a new tab
      window.open(fileViewUrl, "_blank");
    } catch (err: any) {
      console.error("Error viewing resume:", err);
      setError("Failed to view resume: " + err.message);
    }
  };

  // Fixed resume download function
  const handleDownloadResume = async (
    resumeId: string,
    applicantName: string
  ) => {
    try {
      // Get the download URL - this returns a URL object
      const downloadUrl = st.resumes.download(resumeId);

      // Create a temporary link element for download
      const link = document.createElement("a");
      link.href = downloadUrl.toString(); // Convert URL to string
      link.download = `${applicantName}_resume.pdf`;
      link.target = "_blank";

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("Error downloading resume:", err);
      setError("Failed to download resume: " + err.message);
    }
  };

  // Updated formatDate function to show date and time on separate lines
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateOnly = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeOnly = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { date: dateOnly, time: timeOnly };
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  // Helper function to parse and format experience
  const formatExperience = (experienceArray: string[]) => {
    if (!experienceArray || experienceArray.length === 0) {
      return "No experience listed";
    }

    return experienceArray.map((exp, index) => {
      const [years, description] = exp.split(":");
      return (
        <div key={index} className="text-sm text-gray-900 dark:text-white">
          <span className="font-medium">
            {years} {years === "1" ? "year" : "years"}:
          </span>{" "}
          {description}
        </div>
      );
    });
  };

  // Helper function to get experience summary for table
  const getExperienceSummary = (experienceArray: string[]) => {
    if (!experienceArray || experienceArray.length === 0) {
      return "No experience";
    }

    const totalYears = experienceArray.reduce((total, exp) => {
      const [years] = exp.split(":");
      const yearNum = years === "10+" ? 10 : parseInt(years);
      return total + (isNaN(yearNum) ? 0 : yearNum);
    }, 0);

    return `${totalYears}${
      experienceArray.some((exp) => exp.includes("10+")) ? "+" : ""
    } years total (${experienceArray.length} ${
      experienceArray.length === 1 ? "role" : "roles"
    })`;
  };

  // Helper function to parse and display preferred countries
  const formatPreferredCountries = (preferredCountryString: string) => {
    if (!preferredCountryString) {
      return ["N/A", "N/A", "N/A"];
    }

    const countries = preferredCountryString.split(":");
    return [
      countries[0] || "N/A",
      countries[1] || "N/A",
      countries[2] || "N/A",
    ];
  };

  const handleDeleteApplication = async (
    applicationId: string,
    applicantName: string
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete the application from ${applicantName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await db.applications.delete(applicationId);

      // Refresh the applications list
      await loadApplications(currentPage);

      // If current page becomes empty and it's not the first page, go to previous page
      if (applications.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err: any) {
      setError("Failed to delete application: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Job Applications
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Total Applications: {totalApplications}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Loading applications...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No applications found.
            </p>
          </div>
        )}

        {/* Applications Content */}
        {!loading && !error && applications.length > 0 && (
          <>
            {/* Applications Table */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Preferred Countries
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Languages
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {applications.map((application) => {
                      const preferredCountries = formatPreferredCountries(
                        application.preferredCountry
                      );
                      const { date, time } = formatDate(application.$createdAt);

                      return (
                        <tr
                          key={application.$id}
                          className="hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {application.firstName} {application.lastName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Age: {calculateAge(application.birthday)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {application.diploma}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {application.email}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {application.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {application.targetJob}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Available: {application.availability}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {getExperienceSummary(application.experience)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              1st: {preferredCountries[0]}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              2nd: {preferredCountries[1]}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              3rd: {preferredCountries[2]}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              FR: {application.frenchLevel}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              EN: {application.englishLevel}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {date}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {time}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-medium">
                            <div className="flex flex-col items-center space-y-1">
                              <button
                                onClick={() =>
                                  setSelectedApplication(application)
                                }
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                View Details
                              </button>
                              {application.resumeURL && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleViewResume(application.resumeURL!)
                                    }
                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                  >
                                    View Resume
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDownloadResume(
                                        application.resumeURL!,
                                        `${application.firstName}_${application.lastName}`
                                      )
                                    }
                                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                                  >
                                    Download
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() =>
                                  handleDeleteApplication(
                                    application.$id,
                                    `${application.firstName} ${application.lastName}`
                                  )
                                }
                                className="mr-6 ml-6 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete Application"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-md">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * APPLICATIONS_PER_PAGE + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          currentPage * APPLICATIONS_PER_PAGE,
                          totalApplications
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">{totalApplications}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === currentPage
                                ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-200"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Application Details
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.firstName}{" "}
                      {selectedApplication.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Age
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {calculateAge(selectedApplication.birthday)} years old
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Target Job
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.targetJob}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Preferred Countries
                    </label>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatPreferredCountries(
                        selectedApplication.preferredCountry
                      ).map((country, index) => (
                        <div key={index}>
                          {index + 1}. {country}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Diploma
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.diploma}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Availability
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.availability}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      French Level
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.frenchLevel}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      English Level
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedApplication.englishLevel}
                    </p>
                  </div>
                  {selectedApplication.linkedinURL && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        LinkedIn
                      </label>
                      <a
                        href={selectedApplication.linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        View LinkedIn Profile
                      </a>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Applied On
                    </label>
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>
                        {formatDate(selectedApplication.$createdAt).date}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {formatDate(selectedApplication.$createdAt).time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Section - Full Width */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Experience Details
                  </label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    {selectedApplication.experience &&
                    selectedApplication.experience.length > 0 ? (
                      formatExperience(selectedApplication.experience)
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No experience information provided
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                {selectedApplication.resumeURL && (
                  <>
                    <button
                      onClick={() =>
                        handleViewResume(selectedApplication.resumeURL!)
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                    >
                      View Resume
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadResume(
                          selectedApplication.resumeURL!,
                          `${selectedApplication.firstName}_${selectedApplication.lastName}`
                        )
                      }
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                    >
                      Download Resume
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

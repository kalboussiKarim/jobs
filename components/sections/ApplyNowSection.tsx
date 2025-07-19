import React from "react";
import StatsSection from "../StatsSection";
import { Mail } from "lucide-react";

interface ApplyNowSectionProps {
  openModal: () => void;
}

const ApplyNowSection: React.FC<ApplyNowSectionProps> = ({ openModal }) => {
  return (
    <section
      id="apply"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300 relative overflow-hidden"
    >
      <StatsSection />

      {/* Background animations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-300 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-pink-300 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Apply Now
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300 font-medium">
            Kickstart your journey with us.
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            We’re looking for enthusiastic professionals ready to make an
            impact. Join our innovative team and take your career to new
            heights.
          </p>

          {/* Apply Now Button */}
          <div className="relative inline-block">
            <button
              onClick={openModal}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-1000"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Button content */}
              <div className="relative flex items-center space-x-3">
                <Mail className="h-6 w-6 transform transition-transform duration-300" />
                <span className="font-bold tracking-wide">Apply Now</span>
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>

              {/* Soft glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 animate-pulse"></div>
            </button>

            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNowSection;

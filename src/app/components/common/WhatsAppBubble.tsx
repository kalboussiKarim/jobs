"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

interface WhatsAppBubbleProps {
  phoneNumber?: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({
  phoneNumber = "+351912909896",
  message = "Hello! I'm interested in your services.",
  position = "bottom-right",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 group`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full mb-4 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg border dark:border-gray-700 whitespace-nowrap animate-bounce">
          <div className="text-sm font-medium">{t("common.Needhelp")}</div>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b dark:border-gray-700 transform rotate-45"></div>
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="relative">
        <button
          onClick={handleWhatsAppClick}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300  hover:animate-none"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-1000"></div>

          {/* WhatsApp Icon */}
          <svg
            className="w-8 h-8 relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
          </svg>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-80 blur-lg transition-opacity duration-300"></div>
        </button>

        {/* Close (X) Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -left-2 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm"
          aria-label="Close chat bubble"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppBubble;

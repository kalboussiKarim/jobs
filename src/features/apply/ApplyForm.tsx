"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ApplyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Name"
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        placeholder="Your message"
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
      >
        <Send className="h-4 w-4" />
        <span>Send Message</span>
      </button>
    </form>
  );
};

export default ApplyForm;

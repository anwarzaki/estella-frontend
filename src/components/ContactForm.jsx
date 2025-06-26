import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/submit",
        formData
      );

      setStatus({
        type: "success",
        message: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact-form"
      className="bg-white shadow-xl rounded-lg p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">
        Send Us a Message
      </h2>

      {status.message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            status.type === "success"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-blue-900 transition-transform duration-300 group-hover:text-blue-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-blue-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-300 hover:shadow-md"
            placeholder="Enter your full name"
          />
        </div>

        <div className="relative group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-blue-900 transition-transform duration-300 group-hover:text-blue-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-blue-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-300 hover:shadow-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="relative group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-blue-900 transition-transform duration-300 group-hover:text-blue-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-blue-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-300 hover:shadow-md"
            placeholder="Write your message here"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg shadow-lg 
                   hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 
                   disabled:opacity-50 disabled:hover:bg-blue-900 disabled:hover:scale-100 
                   flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

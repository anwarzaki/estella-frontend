import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 py-24 lg:py-36 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 opacity-10 rounded-full filter blur-3xl animate-ping"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white transition-transform duration-500 hover:scale-105">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the essence of EstellaParis. We're here to answer your
              questions and help you discover your perfect fragrance.
            </p>
            <div className="mt-8">
              <a
                href="#contact-form"
                className="bg-white text-blue-900 py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            {/* Contact Information */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">
                  Visit Our Boutique
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 group">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <Mail className="text-blue-900 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Email Us</p>
                      <p className="text-gray-600">contact@estellaparis.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <Phone className="text-blue-900 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Call Us</p>
                      <p className="text-gray-600">+91-5648456367</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <MapPin className="text-blue-900 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Visit Us</p>
                      <p className="text-gray-600">
                        Hyderabad, Telangana 500081
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <Clock className="text-blue-900 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Opening Hours</p>
                      <p className="text-gray-600">
                        Mon-Fri: 9:00 AM - 7:00 PM
                      </p>
                      <p className="text-gray-600">
                        Saturday: 10:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow-lg p-4 h-64 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.999256563011!2d78.37651935000001!3d17.44775335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1736101874066!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

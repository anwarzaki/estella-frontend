import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[64px]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#E0F7FF] to-[#C8E1FF] py-24 lg:py-40 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="img/perfume01/perfume-contact.jpg"
              alt="Perfume Collection"
              className="w-full h-full object-cover opacity-25"
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-[#0D4A75] mb-6">
                About LuxeScents
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Welcome to <span className="font-semibold">LuxeScents</span>,
                where sophistication meets the art of fragrance. Each bottle is
                a masterpiece designed to captivate your senses and leave a
                lasting impression.
              </p>
              <div className="mt-6">
                <a
                  href="#explore"
                  className="bg-[#0D4A75] text-white py-3 px-8 rounded-lg shadow-lg hover:bg-[#07588C] transition-all duration-300"
                >
                  Explore Our Collection
                </a>
              </div>
            </div>

            {/* Story Section */}
            <div className="mt-16 text-gray-800">
              <h2 className="text-3xl font-semibold text-center mb-8">
                Our Story
              </h2>
              <p className="max-w-3xl mx-auto text-center text-lg">
                At LuxeScents, we believe every fragrance tells a story. With
                decades of expertise in the art of perfumery, we create scents
                that reflect timeless elegance and modern sophistication. Let us
                take you on a journey through the world of exquisite aromas.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6 sm:px-12 lg:px-20">
            <div className="flex flex-wrap justify-center gap-12 text-center">
              <div>
                <h3 className="text-4xl font-bold text-[#0D4A75]">20+</h3>
                <p className="text-gray-600 mt-2">Years of Expertise</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#0D4A75]">1M+</h3>
                <p className="text-gray-600 mt-2">Bottles Sold Worldwide</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#0D4A75]">100%</h3>
                <p className="text-gray-600 mt-2">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#E0F4FF] py-16">
          <div className="container mx-auto px-6 sm:px-12 lg:px-20">
            <h2 className="text-3xl font-semibold text-center text-[#0D4A75] mb-8">
              What Our Customers Say
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="max-w-md bg-white shadow-lg p-6 rounded-lg">
                <p className="text-gray-700 italic">
                  "LuxeScents perfumes are pure luxury! Each scent is unique and
                  makes me feel confident and beautiful."
                </p>
                <h4 className="mt-4 font-semibold text-[#0D4A75]">
                  — Olivia M.
                </h4>
              </div>
              <div className="max-w-md bg-white shadow-lg p-6 rounded-lg">
                <p className="text-gray-700 italic">
                  "The attention to detail is unmatched. From the bottle design
                  to the fragrance, LuxeScents delivers excellence."
                </p>
                <h4 className="mt-4 font-semibold text-[#0D4A75]">— Liam K.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

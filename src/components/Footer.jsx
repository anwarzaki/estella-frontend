import React from "react";
import { Mail, Phone, Instagram, Facebook, Share2 } from "lucide-react";

const Footer = () => {
  const navigation = {
    explore: [
      { name: "Our Perfumes", href: "/our-perfumes" },
      { name: "Brands", href: "/brands" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    social: [
      { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
      { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
      { name: "Share", icon: Share2, href: "https://pinterest.com" }, // Changed Pinterest to Share2
    ],
  };

  return (
    <footer className="bg-blue-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Estella Paris Perfumes</h3>
            <p className="text-gray-300 max-w-md">
              Crafting exquisite fragrances that capture emotions and memories.
              Our commitment to luxury and quality defines your unique perfume
              journey.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Explore Section */}
              <div>
                <h3 className="text-lg font-semibold text-white">Explore</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.explore.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Section */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <dl className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-gray-300" />
                  <dd className="ml-3">
                    <a
                      href="mailto:info@essenciaperfumes.com"
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      info@estellaparisperfumes.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-gray-300" />
                  <dd className="ml-3">
                    <a
                      href="tel:+1234567890"
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      +91-6525489562
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                <div className="mt-4 flex space-x-6">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold text-white">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-gray-300">
                Stay updated with our latest collections and special offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-l bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="rounded-r bg-white px-4 py-2 text-purple-900 hover:bg-gray-200 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Essencia Perfumes. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0 text-gray-300 text-sm">
            Designed with passion in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

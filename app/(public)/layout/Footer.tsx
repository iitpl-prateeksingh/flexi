"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // FontAwesome 6 specific icon

const Footer = () => {
  return (
    <footer className="bg-[#032E52] text-white py-8 px-6 md:px-12 lg:px-20 font-inter">
      {/* --- Top Section --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-4">
        {/* Logo Column (Left) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-start mx-auto md:mx-0">
          {/* Logo Placeholder - Replace with your actual logo image */}
          <div className="mb-4">
            <img src="/footer-logo.png" width={300} alt="Flexi Capital Logo" />
            <div className="flex flex-col items-center mt-6 gap-4">
              {/* <h4 className="text-lg font-medium text-gray-200">Follow us on our socials</h4> */}
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-[#F0803C] hover:text-white transition-colors text-3xl"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#"
                  className="text-[#F0803C] hover:text-white transition-colors text-3xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-[#F0803C] hover:text-white transition-colors text-3xl"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Column (Center) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-center md:items-center text-center">
          <h3 className="text-md font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-18 after:h-[1px] after:bg-[#173e5f]">
            Menu
          </h3>
          <ul className="space-y-4 text-sm text-[#fff]">
            <li>
              <Link
                href="/about"
                className="hover:text-[#F0803C] transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-[#F0803C] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#F0803C] transition-colors"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-[#F0803C] transition-colors"
              >
                Monthly Market Outlook
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-[#F0803C] transition-colors"
              >
                Weekly Flexi Wrap
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials Column (Right) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-start md:items-start  space-y-8">
          <h3 className="text-md font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-18 after:h-[1px] after:bg-[#173e5f]">
            Contact us
          </h3>
          <ul className="space-y-3 text-sm text-[#fff]">
            {/* Email Section */}
            <li className="flex items-center space-x-4">
              <div className="bg-[#1c3c58] p-3 rounded-full flex-shrink-0 mt-1">
                <FaEnvelope className="text-[#ff6b2b] text-lg" />
              </div>
              <span className="text-md pt-1 tracking-wide">
                customer.service@flexicapital.co.in
              </span>
            </li>

            {/* Phone Section */}
            <li className="flex items-center space-x-4">
              <div className="bg-[#1c3c58] p-3 rounded-full flex-shrink-0 mt-1">
                <FaPhoneAlt className="text-[#ff6b2b] text-lg" />
              </div>
              <span className="text-md pt-1 tracking-wide">+91 1149072143</span>
            </li>

            {/* Address Section */}
            <li className="flex items-start space-x-4">
              <div className="bg-[#1c3c58] p-3 rounded-full flex-shrink-0 mt-1">
                <FaMapMarkerAlt className="text-[#ff6b2b] text-lg" />
              </div>
              <div className="text-md pt-1 tracking-wide leading-relaxed">
                <p>Flexicapital Pvt Ltd.</p>
                <p>B - 45, M-4B, Mezzanine Floor,</p>
                <p>Greater Kailash, Part 1, New Delhi -</p>
                <p>110048</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-t border-gray-700/50 mb-8 max-w-7xl mx-auto" />

      {/* --- Bottom Section (ARN Details) --- */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* ARN Info Row */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white font-medium tracking-wide">
          <span>ARN : 257369</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span>ARN Valid From: 18-11-2025</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span>ARN Valid Till : 17-11-2028</span>
        </div>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-gray-300 uppercase tracking-wider">
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Risk Factors
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Terms and Conditions
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Disclaimer
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Disclosure
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            Code of Conduct
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            href="#"
            className="hover:text-[#F0803C] transition-colors whitespace-nowrap"
          >
            Code of Conduct-Revised
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">
            SID/SAI/KIM
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
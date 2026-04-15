'use client';

import React from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = ({ data }: any) => {

  const staticPages = [
    { label: "Risk Factors", type: "risk-factor" },
    { label: "Privacy Policy", type: "privacy-policy" },
    { label: "Terms and Conditions", type: "terms-and-condition" },
    { label: "Disclaimer", type: "disclaimer" },
    { label: "Disclosure", type: "disclouser" },
    { label: "Code of Conduct", type: "code-of-conduct" },
    { label: "Code of Conduct-Revised", type: "code-of-conduct-revised" },
    { label: "SID/SAI/KIM", type: "sid-sai-kim" },
  ];

  return (
    <footer className="bg-[#032E52] text-white py-8 px-6 md:px-12 lg:px-20 font-inter">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-4">

        {/* LOGO + SOCIAL */}
        <div className="md:col-span-4 flex flex-col items-start mx-auto md:mx-0">
          <div className="mb-4">
            <img src={data?.logo} width={300} alt="Logo" />

            <div className="flex flex-col items-center mt-6 gap-4">
              <div className="flex items-center gap-6">

                {data?.socialMedia?.twitter && (
                  <a href={data.socialMedia.twitter} target="_blank"
                    className="text-[#F0803C] hover:text-white text-3xl">
                    <FaXTwitter />
                  </a>
                )}

                {data?.socialMedia?.facebook && (
                  <a href={data.socialMedia.facebook} target="_blank"
                    className="text-[#F0803C] hover:text-white text-3xl">
                    <FaFacebookF />
                  </a>
                )}

                {data?.socialMedia?.instagram && (
                  <a href={data.socialMedia.instagram} target="_blank"
                    className="text-[#F0803C] hover:text-white text-3xl">
                    <FaInstagram />
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="md:col-span-4 flex flex-col items-center text-center">
          <h3 className="text-md font-semibold mb-6 pb-2 border-b border-[#173e5f]">
            Menu
          </h3>

          <ul className="space-y-4 text-sm">
            <li><Link href="/aboutus">About us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contactus">Contact us</Link></li>

            {/* Dynamic Blogs */}

            <li>
              <Link href={`/blogs/monthly`}>
                Monthly Market Outlook
              </Link>
            </li>



            <li>
              <Link href={`/blogs/weekly`}>
                Weekly Flexi Wrap
              </Link>
            </li>

          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-4 flex flex-col items-start space-y-8">
          <h3 className="text-md font-semibold mb-6 pb-2 border-b border-[#173e5f]">
            Contact us
          </h3>

          <ul className="space-y-3 text-sm">

            {/* EMAIL */}
            {data?.email && (
              <li className="flex items-center space-x-4">
                <div className="bg-[#1c3c58] p-3 rounded-full">
                  <FaEnvelope className="text-[#ff6b2b]" />
                </div>
                <span>{data.email}</span>
              </li>
            )}

            {/* PHONE */}
            {data?.phone && (
              <li className="flex items-center space-x-4">
                <div className="bg-[#1c3c58] p-3 rounded-full">
                  <FaPhoneAlt className="text-[#ff6b2b]" />
                </div>
                <span>+91 {data.phone}</span>
              </li>
            )}

            {/* ADDRESS */}
            {data?.address && (
              <li className="flex items-start space-x-4">
                <div className="bg-[#1c3c58] p-3 rounded-full">
                  <FaMapMarkerAlt className="text-[#ff6b2b]" />
                </div>
                <div className="leading-relaxed">
                  {data.address}
                </div>
              </li>
            )}

          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700/50 mb-8 max-w-7xl mx-auto" />

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">

        {/* ARN */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span>ARN : {data?.arn?.number}</span>

          {data?.arn?.fromDate && (
            <span>
              ARN Valid From: {new Date(data.arn.fromDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
            </span>
          )}

          {data?.arn?.tillDate && (
            <span>
              ARN Valid Till : {new Date(data.arn.tillDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
            </span>
          )}
        </div>

        {/* STATIC PAGES */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] uppercase">
          {staticPages.map((page, index) => (
            <React.Fragment key={page.type}>
              <Link href={`/${page.type}`}>
                {page.label}
              </Link>

              {index !== staticPages.length - 1 && <span>|</span>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
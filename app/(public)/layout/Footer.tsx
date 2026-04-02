'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // FontAwesome 6 specific icon

const Footer = ({ data }: any) => {
  return (
    <footer className="bg-[#0A2540] text-white py-12 px-6 md:px-12 lg:px-20 font-inter">
      {/* --- Top Section --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">

        {/* Logo Column (Left) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-start mx-auto md:mx-0">
          {/* Logo Placeholder - Replace with your actual logo image */}
          <div className="mb-4">

            <img src={data?.logo} width={180} height={60} alt="Flexi Capital Logo" />

          </div>
        </div>

        {/* Menu Column (Center) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-center md:items-center text-center">
          <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-gray-500">
            Menu
          </h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-[#F0803C] transition-colors">About us</Link></li>
            <li><Link href="/services" className="hover:text-[#F0803C] transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-[#F0803C] transition-colors">Contact us</Link></li>
            <li><Link href="/careers" className="hover:text-[#F0803C] transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Contact & Socials Column (Right) - Takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right space-y-8">

          {/* Address Block */}
          <div className="space-y-2 text-sm text-gray-300">
            <p>{data?.address}</p>
            <p className="pt-2 text-[#FFFFFFBD] font-medium">+91 {data?.phone}</p>
          </div>

          {/* Socials Block */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="text-lg font-medium text-gray-200">Follow us on our socials</h4>
            <div className="flex items-center gap-6">
              {data?.socialMedia?.twitter && <a href={data?.socialMedia?.twitter} target='_blank' className="text-[#F0803C] hover:text-white transition-colors text-2xl">
                <FaXTwitter />
              </a>}
              {data?.socialMedia?.facebook && <a href={data?.socialMedia?.facebook} target='_blank' className="text-[#F0803C] hover:text-white transition-colors text-2xl">
                <FaFacebookF />
              </a>}
              {data?.socialMedia?.instagram && <a href={data?.socialMedia?.instagram} target='_blank' className="text-[#F0803C] hover:text-white transition-colors text-2xl">
                <FaInstagram />
              </a>}
            </div>
          </div>

        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-t border-gray-700/50 mb-8 max-w-7xl mx-auto" />

      {/* --- Bottom Section (ARN Details) --- */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">

        {/* ARN Info Row */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white font-medium tracking-wide">
          <span>ARN : {data?.arn?.number}</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          {data?.arn?.fromDate ? <span>ARN Valid From:{new Date(data.arn.fromDate)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-")}
          </span> : ""}
          <span className="hidden sm:inline text-gray-500">|</span>
          {data?.arn?.tillDate
            ? <span>ARN Valid Till : {new Date(data.arn.tillDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}
            </span> : ""}
        </div>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-gray-300 uppercase tracking-wider">
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Risk Factors</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Privacy Policy</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Terms and Conditions</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Disclaimer</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Disclosure</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">Code of Conduct</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors whitespace-nowrap">Code of Conduct-Revised</Link>
          <span className="text-gray-600">|</span>
          <Link href="#" className="hover:text-[#F0803C] transition-colors">SID/SAI/KIM</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
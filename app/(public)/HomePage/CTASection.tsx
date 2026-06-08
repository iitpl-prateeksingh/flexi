"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-10 md:py-20"
      style={{
        backgroundImage: "url('/backbottom.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundColor: "#FFF9F3",
        backgroundSize: "cover",
      }}
    >
      <div
        className="relative z-10 mx-auto max-w-xl py-10 md:py-26 text-center"
        style={{
          backdropFilter: "blur(8.931183815002441px)",
          background: "#00000014",
          borderRadius: "42px 0px",
        }}
      >
        <p className="font-inter text-md font-medium tracking-wide text-[#fff]">
          Ready to Begin?
        </p>
        <h2 className="mb-3 font-playfair text-3xl font-bold leading-tight text-[#fff] md:text-4xl lg:text-5xl">
          Start Your journey
        </h2>

        {/* <p className="mx-auto mb-10 max-w-2xl font-inter text-base leading-relaxed text-gray-500 md:text-lg">
          Whether you are an individual investor, family office, or institution, 
          our team is ready to guide you.
        </p> */}
<p className="text-lg text-[#fff] mb-3">
              AMFI Registered Mutual Fund Distributor
            </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary Button */}
          {/* <button className="h-12 cursor-pointer w-full min-w-[200px] rounded-full bg-[#F0803C] px-8 font-inter text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-[#E5702A] sm:w-auto">
            Schedule a Consultation
          </button> */}

          <Link
            href="/contactus"
            className="group flex h-10 w-[150px] cursor-pointer items-center justify-center rounded-full border bg-[#F0803C] border-[#F0803C] font-spline text-md font-semibold text-[#ffff] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#F0803C]/20 hover:to-transparent"
          >
            <span className="font-light transition-transform duration-300 group-hover:translate-x-0">
              Contact us
            </span>

            <ArrowRight
              size={26}
              className="w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
            />
          </Link>
          {/* <Link
            href="/contactus"
            className="group flex h-12 w-[160px] cursor-pointer items-center justify-center rounded-full border border-[#F0803C] bg-transparent font-inter text-sm font-semibold text-[#F0803C] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#F0803C]/20 hover:to-transparent"
          >
            <span className=" transition-transform duration-300 group-hover:translate-x-0">
              Contact us
            </span>

            <ArrowRight
              size={26}
              className="w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
            />
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default CTASection;

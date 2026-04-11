'use client';

import Link from 'next/link';
import React from 'react';

const CTASection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32" style={{ backgroundImage: "url('/backk.png')", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", backgroundColor: "#FFF9F3" }}>


      {/* --- Main Content --- */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

        {/* Top Label */}
        <p className="mb-4 font-inter text-sm font-medium tracking-wide text-[#F0803C]">
          Ready to Begin?
        </p>

        {/* Heading */}
        <h2 className="mb-6 font-playfair text-4xl font-bold leading-tight text-[#1A2B49] md:text-5xl lg:text-6xl">
          Let’s Build Your <br />
          Financial Future
        </h2>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-2xl font-inter text-base leading-relaxed text-gray-500 md:text-lg">
          Whether you are an individual investor, family office, or institution,
          our team is ready to guide you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary Button */}
          {/* <button className="h-12 cursor-pointer w-full min-w-[200px] rounded-full bg-[#F0803C] px-8 font-inter text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-[#E5702A] sm:w-auto">
            Schedule a Consultation
          </button> */}

          {/* Secondary Button */}
          <Link
            href="/contactus"
            className="h-12 flex items-center justify-center cursor-pointer w-full min-w-[160px] rounded-full border border-[#F0803C] bg-transparent px-8 font-inter text-sm font-semibold text-[#F0803C] transition-colors hover:bg-[#F0803C] hover:text-white sm:w-auto"
          >
            Contact us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
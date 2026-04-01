'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const InsightsSection = ({ data }: any) => {
  return (
    <section className="bg-[#FFF9F3] py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* --- Left Column: Text Content --- */}
        <div className="lg:col-span-4 flex flex-col items-start space-y-6">
          {/* Badge */}
          <span className="inline-block  bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
            Keep Your Self Updated
          </span>

          {/* Main Heading - Using Playfair */}
          <h2 className="text-4xl md:text-5xl text-[#204667] font-bold leading-tight font-playfair">
            Insights That Empower <br /> Better Decisions
          </h2>

          {/* Description - Using Inter */}
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-inter">
            Stay informed with our latest market perspectives, investment insights, and wealth planning thought leadership designed to help you navigate changing financial landscapes.
          </p>

          {/* Link */}
          <a href="#" className="flex items-center gap-2 text-[#F78532] font-medium hover:gap-3 transition-all duration-300 font-inter">
            Learn more <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* --- Right Column: Cards --- */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Market Outlook */}
          <div className="group cursor-pointer">
            <div className="relative h-64 w-full overflow-hidden mb-6">
              <img
                src="/ins1.png"
                alt="Market Outlook"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              {/* Category - Playfair for elegance */}
              <span className="text-[#F78532] text-xl block font-playfair">
                Market Outlook
              </span>
              {/* Title - Inter for readability */}
              <h3 className="text-xl font-medium text-[#204667] group-hover:text-[#4A86E8] transition-colors font-inter">
                Q4 2024 Global Economic Trends
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-inter">
                An in-depth analysis of emerging market performance and inflationary impacts.
              </p>
            </div>
          </div>

          {/* Card 2: Wealth Planning */}
          <div className="group cursor-pointer">
            <div className="relative h-64 w-full overflow-hidden mb-6">
              <img
                src="/ins2.png"
                alt="Market Outlook"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <span className="text-[#F78532] text-xl block font-playfair">
                Wealth Planning
              </span>
              <h3 className="text-xl font-medium text-[#204667] group-hover:text-[#4A86E8] transition-colors font-inter">
                Succession Strategies for Family Enterprises
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-inter">
                Preserving values and assets across generations through structured planning.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InsightsSection;
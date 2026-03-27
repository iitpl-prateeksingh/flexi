"use client";
import React, { useEffect, useState, useRef } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const StatCounter = ({
  end,
  label,
  suffix = "",
}: {
  end: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.1 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, end]);

  return (
    <div ref={countRef} className="text-center">
      <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-inter)] font-semibold text-[#204667]">
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className="text-slate-500 font-[family-name:var(--font-spline)] text-sm  mt-1">
        {label}
      </p>
    </div>
  );
};

const KnowUs = () => {
  return (
    <section className="bg-[#FFF9F3] py-20 ">
      <div className="px-4 md:px-25 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        {/* Left Column: Image with Overlapping Button */}
        <div className="relative group m-2 pb-4 md:m-10">
          <div className="rounded-3xl overflow-hidden  transition-transform duration-500 ">
            <img
              src="/magnifying-glass.png"
              alt="Strategic Clarity"
              className="w-full h-auto object-cover min-h-[400px]"
            />
          </div>

          {/* Overlapping Learn More Button */}
          <div className="absolute bottom-0 right-0 lg:right-0 bg-[#FFF9F3] rounded-tl-[30px] rounded-br-3xl p-3  border-l-8 border-t-8 border-[#FFF9F3]">
            <button className="flex items-center gap-3 cursor-pointer text-[#FF8C42] border border-[#FF8C42] px-8 py-3 rounded-full hover:bg-[#FF8C42] hover:text-white transition-all duration-300">
              Learn More <HiOutlineArrowNarrowRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right Column: Content & Stats */}
        <div className="flex flex-col text-center lg:text-left">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium">
              Know us better
            </span>
          </div>

          <h2 className="font-playfair text-[#204667] font-bold text-2xl sm:text-3xl md:text-[38px]">
            Where <span className="text-[#FF8C42]">One Clear View</span> Changes
            Everything
          </h2>

          <div className="space-y-6 mt-4  text-slate-600 font-[family-name:var(--font-spline)] text-lg leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
            <p className="text-base opacity-80">
              We believe that clarity is the ultimate sophistication that
              redefines direction and transforms market volatility into
              strategic elegance.
            </p>
            <p className="text-base opacity-80">
              {
                " When complexity gives way to insight, decisions transcend guesswork to become deliberate acts of legacy-building. Our institutional expertise doesn't just simplify the path ahead; it fundamentally evolves how you move and manifest your true intent."
              }
            </p>
          </div>

          {/* Animated Stats Bar */}
          <div className="flex flex-col md:flex-row items-center gap-8  pt-8">
            <StatCounter end={15} suffix="+" label="Years Experience" />
            <div className="hidden md:block h-12 w-[1px] bg-slate-300" />
            <StatCounter end={500} suffix="+" label="Families Served" />
            <div className="hidden md:block h-12 w-[1px] bg-slate-300" />
            <StatCounter
              end={10000}
              suffix="Cr+"
              label="Assets Under Advisory"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowUs;

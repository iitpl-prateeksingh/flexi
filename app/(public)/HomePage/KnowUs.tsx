"use client";
import { Yeon_Sung } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const router = useRouter()
  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
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
        {count.toLocaleString("en-IN")}
        {suffix}
      </h3>
      <p className="text-slate-500 font-[family-name:var(--font-spline)] text-sm mt-1">
        {label}
      </p>
    </div>
  );
};

const KnowUs = ({ data }: { data: any }) => {
  let introImage = data?.introImage;
  let title = data?.missionTitle.replace(/&nbsp;/g, " ");
  let des = data?.mission.replace(/&nbsp;/g, " ");
  let yoe = data?.yoe;
  let aua = data?.aua;
  let familiesServed = data?.familiesServed;

  console.log("DATA in know Us", data);


  return (
    <section className="bg-[#FFF9F3] py-20 ">
      <div className="px-4 md:px-25 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

        {/* LEFT IMAGE */}
        <div className="relative group m-2 pb-4 md:m-10">
          <div className="rounded-3xl overflow-hidden transition-transform duration-500 ">
            <img
              src={introImage || "/magnifying-glass.png"}
              alt="Strategic Clarity"
              className="w-full h-auto object-cover min-h-[400px]"
            />
          </div>

          <div className="absolute bottom-0 right-0 lg:right-0 bg-[#FFF9F3] rounded-tl-[30px] rounded-br-3xl p-3 border-l-8 border-t-8 border-[#FFF9F3]">
            <Link
              href="/aboutus"
              className="flex items-center gap-3 cursor-pointer text-[#FF8C42] border border-[#FF8C42] px-8 py-3 rounded-full hover:bg-[#FF8C42] hover:text-white transition-all duration-300"
            >
              Learn More
              <HiOutlineArrowNarrowRight className="text-xl" />
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col text-center lg:text-left">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium">
              Know us better
            </span>
          </div>

          {/* ✅ Use editor title */}
          <h2
            className="font-playfair text-[#204667] font-bold  leading-relaxed  max-w-xl mx-auto lg:mx-0  whitespace-normal html-editor"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* ✅ Render editor HTML safely */}
          <div
            className="space-y-6 mt-4 text-slate-600 font-[family-name:var(--font-spline)]  leading-relaxed  max-w-xl mx-auto lg:mx-0  whitespace-normal html-editor"
            dangerouslySetInnerHTML={{ __html: des }}
          />

          {/* ✅ Dynamic stats from API */}
          <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
            <StatCounter end={Number(yoe) || 0} suffix="+" label="Years Experience" />

            <div className="hidden md:block h-12 w-[1px] bg-slate-300" />

            <StatCounter
              end={Number(familiesServed) || 0}
              suffix="+"
              label="Families Served"
            />

            <div className="hidden md:block h-12 w-[1px] bg-slate-300" />

            <StatCounter
              end={Number(aua) || 0}
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
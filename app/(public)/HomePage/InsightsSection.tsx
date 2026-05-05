'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getpublicInsight } from "../../services/insightService";
import toast from 'react-hot-toast';

import { useRouter } from "next/navigation";

type InsightItem = {
  image?: string;
  title?: string;
  detail?: string;
};

type InsightData = {
  badge?: string;
  heading?: string;
  description?: string;
  monthly?: InsightItem;
  weekly?: InsightItem;
};

const InsightsSection = () => {
  const [data, setData] = useState<InsightData | null>(null);
  const router = useRouter();

  const fetchInsightData = async () => {
    try {
      const res = await getpublicInsight();
      setData(res?.data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load insight data";
      console.log(errorMessage);
      toast.error("Failed to load insight data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getpublicInsight();
        setData(res?.data);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load insight data";
        console.log(errorMessage);
        toast.error("Failed to load insight data");
      }
    };
    fetchData();
  }, []);
  console.log("Insight data:", data);

  const list = [
    data?.monthly,
    data?.weekly,
  ].filter(Boolean); // removes undefined

  return (
    <section className="bg-[#FFF9F3] py-16 px-4 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-4 flex flex-col items-start space-y-6">
          <span className="inline-block bg-gradient-to-r  text-sm from-[#1B365D] to-[#4A90E2] text-white px-6 py-1 rounded-full text-sm font-light mb-4">
            {data?.badge || "Insights"}
          </span> 

          <h2 className="text-4xl md:text-[42px] text-[#204667] font-bold leading-tight font-playfair">
            {data?.heading}
          </h2>

          <p className="text-gray-500 text-[16px] leading-relaxed max-w-sm font-inter">
            {data?.description}
          </p>

          <a href="#" className="flex items-center gap-2 text-[#F78532] font-medium hover:gap-3 transition-all duration-300 font-inter">
            Learn more <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* RIGHT CARDS */}
        {/* RIGHT CARDS */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* MONTHLY */}
          {data?.monthly && (
            <div className="group cursor-pointer" onClick={() => router.push("/blogs/monthly")}>
              <div className="relative h-64 w-full overflow-hidden mb-6">
                <img
                  src={data.monthly.image}
                  alt={data.monthly.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 ">
                <div
                  className="html-editor main-inc text-2xl block font-playfair "
                  dangerouslySetInnerHTML={{
                    __html: data?.monthly?.title?.replace(/&nbsp;/g, " ") || "",
                  }}
                />

                <p
                  className="html-editor text-gray-500 text-sm leading-relaxed font-inter"
                  dangerouslySetInnerHTML={{
                    __html: data?.monthly?.detail?.replace(/&nbsp;/g, " ") || "",
                  }}
                />
              </div>
            </div>
          )}

          {/* WEEKLY */}
          {data?.weekly && (
            <div className="group cursor-pointer" onClick={() => router.push("/blogs/weekly")}>
              <div className="relative h-64 w-full overflow-hidden mb-6">
                <img
                  src={data.weekly.image}
                  alt={data.weekly.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 ">
                <div
                  className="html-editor main-inc text-2xl block font-playfair "
                  dangerouslySetInnerHTML={{
                    __html: data?.weekly?.title?.replace(/&nbsp;/g, " ") || "",
                  }}
                />

                <p
                  className="html-editor text-gray-500 text-sm leading-relaxed font-inter"
                  dangerouslySetInnerHTML={{
                    __html: data?.weekly?.detail?.replace(/&nbsp;/g, " ") || "",
                  }}
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section >
  );
};

export default InsightsSection;
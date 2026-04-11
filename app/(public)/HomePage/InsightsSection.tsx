'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getpublicInsight } from "../../services/insightService";
import toast from 'react-hot-toast';

const InsightsSection = () => {
  const [data, setData] = useState<any>(null);

  const fetchInsightData = async () => {
    try {
      const res = await getpublicInsight();
      setData(res?.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to load insight data");
    }
  };

  useEffect(() => {
    fetchInsightData();
  }, []);

  const list = data?.list || [];

  return (
    <section className="bg-[#FFF9F3] py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-4 flex flex-col items-start space-y-6">
          <span className="inline-block bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
            Keep Your Self Updated
          </span>

          <h2 className="text-4xl md:text-5xl text-[#204667] font-bold leading-tight font-playfair">
            {data?.heading}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-inter">
            {data?.description}
          </p>

          <a href="#" className="flex items-center gap-2 text-[#F78532] font-medium hover:gap-3 transition-all duration-300 font-inter">
            Learn more <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item: any) => (
            <div key={item._id} className="group cursor-pointer">
              <div className="relative h-64 w-full overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[#F78532] text-xl block font-playfair font-bold">
                  {item.title}
                </span>


                <p className="text-gray-500 text-sm leading-relaxed font-inter">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InsightsSection;
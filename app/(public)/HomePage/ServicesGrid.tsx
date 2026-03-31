"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Users,
  HandCoins,
  ArrowRight,
} from "lucide-react";
import { getPublicServices } from "../../services/services"; // adjust path

// 🔥 Map icon string → component
const iconMap: any = {
  trending: <TrendingUp className="w-6 h-6" />,
  shield: <ShieldCheck className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  coins: <HandCoins className="w-6 h-6" />,
};

const ServicesGrid = ({ data }: any) => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getPublicServices();
        console.log(res, "RES")

        const cleanHTML = (html: string) =>
          html?.replace(/&nbsp;/g, " ");

        const formatted = res?.data?.map((item: any) => ({
          title: cleanHTML(item.title),
          description: cleanHTML(item.detail),
          image: item.image,
          icon: item.icon
        }));

        setServices(formatted || []);
      } catch (err) {
        console.error("Error fetching services", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-[#fdf8f3] py-16 px-0 md:px-6 md:py-24">
      <div className="px-4 md:px-20 mx-auto ">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>

            <div
              className="html-editor"
              dangerouslySetInnerHTML={{
                __html: data?.services?.replace(/&nbsp;/g, " "),
              }}
            />
          </div>

          <button className="group flex items-center gap-2 border border-[#F78532] text-[#F78532] cursor-pointer px-6 py-2 rounded-full hover:bg-orange-50 transition-colors w-fit">
            Explore More services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative w-full h-100 md:h-[290px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-y-0 left-0 z-10 w-full sm:w-[55%] p-8 flex flex-col justify-center bg-[#00000052] backdrop-blur-[2px] md:backdrop-blur-md">

                <div className="mb-2 text-white/90 p-3 bg-white/10 w-fit rounded-full backdrop-blur-sm border border-white/10">
                  <img
                    src={service.icon}
                  />
                </div>

                <h3 className="text-2xl font-playfair md:text-xl text-white mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-white font-medium md:font-light text-sm leading-relaxed opacity-90">
                  {service.description}
                </p>

                <div className="w-12 h-[1px] bg-white/40 mt-6 group-hover:w-20 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getPublicServices } from "../../services/services";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

interface ServicesGridProps {
  data?: {
    services?: string;
  } | null;
}

const asString = (value: unknown) => (typeof value === "string" ? value : undefined);

const ServicesGrid = ({ data }: ServicesGridProps) => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getPublicServices();
        console.log(res, "RES");

        const cleanHTML = (html?: string) => html?.replace(/&nbsp;/g, " ") ?? "";

        const responseData = Array.isArray(res?.data) ? res.data : [];
        const formatted = responseData.map((item: unknown, index: number) => {
          const serviceObj = item as Record<string, unknown>;
          return {
            id: asString(serviceObj["_id"]) ?? asString(serviceObj["id"]) ?? `service-${index}`,
            title: cleanHTML(asString(serviceObj["title"])),
            description: cleanHTML(asString(serviceObj["detail"])),
            image: asString(serviceObj["image"]),
            icon: asString(serviceObj["icon"]),
          };
        });

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-gradient-to-r bedge-main from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-light mb-4">
              Our Services
            </span>

            <div
              className="html-editor main-services pb-4"
              dangerouslySetInnerHTML={{
                __html: data?.services?.replace(/&nbsp;/g, " "),
              }}
            />
          </div>

          <Link
            href="/services"
            className="group flex items-center gap-2 border border-[#F78532] text-[#F78532] cursor-pointer px-6 py-2 rounded-full hover:bg-orange-50 transition-colors w-fit"
          >
            Explore More services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              href={`/services?service=${encodeURIComponent(service.id)}`}
              key={service.id}
            >
              <div className="group relative w-full h-100 md:h-[290px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-y-0 left-0 z-10 w-full sm:w-[55%] p-8 flex flex-col justify-center bg-[#00000052] backdrop-blur-[2px] md:backdrop-blur-md">
                  <div className="mb-2 text-white/90 p-3 bg-white/10 w-fit rounded-full backdrop-blur-sm border border-white/10">
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      style={{ width: "24px", height: "24px", objectFit: "contain" }}
                    />
                  </div>

                  <h3 className="text-2xl font-playfair md:text-xl text-white mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-white  font-medium md:font-light text-sm leading-relaxed opacity-90">
                    {service.description}
                  </p>

                  {/* <div className="w-12 h-[1px] bg-white/40 mt-6 group-hover:w-20 transition-all duration-300" /> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

"use client";

import TabCard from "@/app/components/TabCard";
import React, { useEffect, useState } from "react";
import { getPublicServices } from "@/app/services/services";

interface SubServiceCard {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

interface ServiceTab {
  id: string;
  title: string;
  description?: string;
  subServices: SubServiceCard[];
}

const cleanText = (value?: string) => (value ?? "").replace(/&nbsp;/g, " ").trim();

export default function TabSection() {
  const [services, setServices] = useState<ServiceTab[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res = await getPublicServices();
        const rawServices = Array.isArray(res?.data) ? res.data : [];
        const normalized: ServiceTab[] = rawServices.map((service: any, index: number) => {
          const serviceId = service._id ?? service.id ?? `service-${index}`;
          const subServices = Array.isArray(service.subServices) ? service.subServices : [];
          return {
            id: serviceId,
            title: cleanText(service.title ?? service.name) || "Service",
            description: cleanText(service.detail ?? service.description),
            subServices: subServices.map((sub: any, subIndex: number) => ({
              id: sub._id ?? sub.id ?? `${serviceId}-sub-${subIndex}`,
              title: cleanText(sub.title) || `Offering ${subIndex + 1}`,
              description: cleanText(sub.description ?? sub.detail),
              imageUrl: sub.image ?? sub.imageUrl,
            })),
          };
        });

        setServices(normalized);
        setActiveServiceId((prev) => prev ?? normalized[0]?.id ?? null);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const activeService = services.find((service) => service.id === activeServiceId);
  const hasTabs = services.length > 0;

  return (
    <section className="min-h-screen bg-[#FFF7F0] px-6 py-20 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-16 rounded-full border border-b-[#F78532] border-transparent bg-transparent p-1.5">
          <ul className="flex flex-wrap items-center justify-between overflow-x-auto px-1">
            {hasTabs
              ? services.map((service) => {
                const isActive = activeServiceId === service.id;
                return (
                  <React.Fragment key={service.id}>
                  <li key={service.id} className="flex-initial">
                    <button
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      aria-pressed={isActive}
                      className={`w-full max-w-[290px] whitespace-nowrap overflow-hidden rounded-full px-8 py-2.5 text-md transition-all duration-300 ${isActive ? "bg-[#F48C45]  text-white shadow-md" : " text-[#465A75] hover:bg-[#FADCC7]/30 cursor-pointer hover:text-[#F48C45]"}`}
                    >
                      <span className="block overflow-hidden truncate whitespace-nowrap">
                        {service.title}
                      </span>
                    </button>
                  </li>
                  <span className="hidden h-4 w-px bg-[#F48C45] sm:block"></span></React.Fragment>
                  
                );
              })
              : null}

            {isLoading && (
              <li className="flex-initial">
                <span className="px-6 py-2.5 text-sm text-[#465A75]/70">
                  Loading tabs…
                </span>
              </li>
            )}
          </ul>
        </div>

        {activeService ? (
          <>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
              <div>
                <h2 className="text-2xl font-playfair font-semibold tracking-tight text-[#F48C45] sm:text-5xl">
                  {activeService.title}
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[#204667A3]">
                  {activeService.description ||
                    "Exploring tailored offerings that move you forward with clarity and confidence."}
                </p>
              </div>
            </div>

            {activeService.subServices.length ? (
              <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-6">
                <TabCard cardData={activeService.subServices} />
              </div>
            ) : (
              null
            )}
          </>
        ) : (
          !isLoading && (
            <p className="text-center text-sm text-[#465A75]">
              No services available at the moment.
            </p>
          )
        )}
      </div>
    </section>
  );
}

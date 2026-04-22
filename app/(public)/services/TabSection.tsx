"use client";

import TabCard from "@/app/components/TabCard";
import { useEffect, useState } from "react";
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
const asString = (value: unknown) => (typeof value === "string" ? value : undefined);
const asArray = (value: unknown) => (Array.isArray(value) ? value : []);

export default function TabSection() {
  const [services, setServices] = useState<ServiceTab[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res: unknown = await getPublicServices();
        const resObj = res as { data?: unknown };
        const rawServices = Array.isArray(resObj?.data) ? resObj.data : [];

        const normalized: ServiceTab[] = rawServices.map((service, index: number) => {
          const serviceObj = service as Record<string, unknown>;
          const serviceId = asString(serviceObj["_id"]) ?? asString(serviceObj["id"]) ?? `service-${index}`;
          const subServices = asArray(serviceObj["subServices"]);
          return {
            id: serviceId,
            title: cleanText(asString(serviceObj["title"]) ?? asString(serviceObj["name"])) || "Service",
            description: cleanText(asString(serviceObj["detail"]) ?? asString(serviceObj["description"])),
            subServices: subServices.map((sub, subIndex: number) => {
              const subObj = sub as Record<string, unknown>;
              return {
                id: asString(subObj["_id"]) ?? asString(subObj["id"]) ?? `${serviceId}-sub-${subIndex}`,
                title: cleanText(asString(subObj["title"])) || `Offering ${subIndex + 1}`,
                description: cleanText(asString(subObj["description"]) ?? asString(subObj["detail"])),
                imageUrl: asString(subObj["image"]) ?? asString(subObj["imageUrl"]),
              };
            }),
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
          <ul className="flex flex-nowrap items-center justify-center overflow-x-auto">
            {hasTabs
              ? services.map((service) => {
                const isActive = activeServiceId === service.id;
                return (
                  <li
                    key={service.id}
                    className="flex-center relative px-3 py-2.5 after:content-[''] after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-[#F78532]/70 last:after:hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      aria-pressed={isActive}
                      className={`w-full max-w-[290px] whitespace-nowrap overflow-hidden rounded-full  text-md transition-all duration-300 ${isActive ? "bg-[#F48C45]  text-white shadow-md" : " text-[#465A75] hover:bg-[#FADCC7]/30 cursor-pointer hover:text-[#F48C45]"}`}
                    >
                      <span className="block overflow-hidden px-5 py-2.5  truncate whitespace-nowrap">
                        {service.title}
                      </span>
                    </button>
                  </li>
                );
              })
              : null}

            {isLoading && (
              <li className="flex-initial">
                <span className="px-6 py-2.5 text-sm text-[#465A75]/70">
                  Loading services…
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

"use client";

import TabCard from "@/app/components/TabCard";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPublicServices } from "@/app/services/services";
import { getPublicValuesApi } from "@/app/services/valueService";

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

interface ValueVideoItem {
  _id?: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const cleanText = (value?: string) =>
  (value ?? "").replace(/&nbsp;/g, " ").trim();
const asString = (value: unknown) =>
  typeof value === "string" ? value : undefined;
const asArray = (value: unknown) => (Array.isArray(value) ? value : []);
const toSlug = (value?: string) =>
  cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const resolveSelectedServiceId = (
  serviceList: ServiceTab[],
  selectedServiceParam: string | null,
) => {
  if (!serviceList.length) {
    return null;
  }

  const exactIdMatch = serviceList.find(
    (service) => service.id === selectedServiceParam,
  );
  if (exactIdMatch) {
    return exactIdMatch.id;
  }

  const paramSlug = toSlug(selectedServiceParam ?? "");
  if (paramSlug) {
    const titleMatch = serviceList.find(
      (service) => toSlug(service.title) === paramSlug,
    );
    if (titleMatch) {
      return titleMatch.id;
    }
  }

  return serviceList[0]?.id ?? null;
};

export default function TabSection() {
  const searchParams = useSearchParams();
  const selectedServiceParam = searchParams?.get("service") ?? null;
  const [services, setServices] = useState<ServiceTab[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [valuesData, setValuesData] = useState<ValueVideoItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res: unknown = await getPublicServices();
        const resObj = res as { data?: unknown };
        const rawServices = Array.isArray(resObj?.data) ? resObj.data : [];

        const normalized: ServiceTab[] = rawServices.map(
          (service, index: number) => {
            const serviceObj = service as Record<string, unknown>;
            const serviceId =
              asString(serviceObj["_id"]) ??
              asString(serviceObj["id"]) ??
              `service-${index}`;
            const subServices = asArray(serviceObj["subServices"]);
            return {
              id: serviceId,
              title:
                cleanText(
                  asString(serviceObj["title"]) ?? asString(serviceObj["name"]),
                ) || "Service",
              description: cleanText(
                asString(serviceObj["detail"]) ??
                  asString(serviceObj["description"]),
              ),
              subServices: subServices.map((sub, subIndex: number) => {
                const subObj = sub as Record<string, unknown>;
                return {
                  id:
                    asString(subObj["_id"]) ??
                    asString(subObj["id"]) ??
                    `${serviceId}-sub-${subIndex}`,
                  title:
                    cleanText(asString(subObj["title"])) ||
                    `Offering ${subIndex + 1}`,
                  description: cleanText(
                    asString(subObj["description"]) ??
                      asString(subObj["detail"]),
                  ),
                  imageUrl:
                    asString(subObj["image"]) ?? asString(subObj["imageUrl"]),
                };
              }),
            };
          },
        );

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

  useEffect(() => {
    if (!services.length) {
      return;
    }

    setActiveServiceId(
      resolveSelectedServiceId(services, selectedServiceParam),
    );
  }, [services, selectedServiceParam]);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res: unknown = await getPublicValuesApi();
        const resObj = res as { data?: unknown };
        const rawValues = Array.isArray(resObj?.data) ? resObj.data : [];

        const normalized: ValueVideoItem[] = rawValues.map((item) => {
          const obj = item as Record<string, unknown>;
          return {
            _id: asString(obj["_id"]),
            videoUrl: asString(obj["videoUrl"]),
            createdAt: asString(obj["createdAt"]),
            updatedAt: asString(obj["updatedAt"]),
          };
        });

        setValuesData(normalized);
      } catch (error) {
        console.error("Failed to fetch values", error);
      }
    };

    fetchValues();
  }, []);

  const activeService = services.find(
    (service) => service.id === activeServiceId,
  );
  const hasTabs = services.length > 0;
  const lastServiceId = services.length
    ? services[services.length - 1]?.id
    : null;
  const isLastTabActive = Boolean(
    lastServiceId && activeServiceId === lastServiceId,
  );
  const lastVideoUrl = valuesData.length
    ? valuesData[valuesData.length - 1]?.videoUrl
    : undefined;

  return (
    <section
      className="min-h-screen  px-6 py-20 font-sans"
      style={{
        background:
          "linear-gradient(1.25deg, rgba(255, 249, 243, 0.6) 15.09%, rgba(253, 188, 140, 0.156) 83.28%, rgba(250, 111, 11, 0) 105.77%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-16 rounded-full border border-b-[#F78532] border-transparent bg-transparent p-1.5">
          <ul className="flex  items-center justify-between overflow-x-auto px-1">
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
                          className={`w-full max-w-[290px] whitespace-nowrap overflow-hidden rounded-full px-8 py-2.5 text-md transition-all duration-300 ${isActive ? "bg-[#F78532]  text-white shadow-md" : " text-[#465A75] hover:bg-[#FADCC7]/30 cursor-pointer hover:text-[#F48C45]"}`}
                        >
                          <span className="block overflow-hidden truncate whitespace-nowrap">
                            {service.title}
                          </span>
                        </button>
                      </li>
                      <span className="hidden h-4 w-px bg-[#F48C45] sm:block"></span>
                    </React.Fragment>
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
                  {activeService.title}{" "}
               
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
            ) : null}

            {/* {isLastTabActive && lastVideoUrl ? (
              <div className="mt-10 border-l-8 border-[#F78532] rounded-r-[16px] overflow-hidden">
                <div className="aspect-video w-full bg-black">
                  <video
                    autoPlay
                    className="h-full w-full"
                    controls
                    preload="metadata"
                  >
                    <source src={lastVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ) : null} */}
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

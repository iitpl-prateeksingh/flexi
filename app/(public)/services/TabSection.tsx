"use client";

import TabCard from "@/app/components/TabCard";
import React, { useState } from "react";

interface TabData {
  id: string;
  label: string;
  title: string;
  description: string;
}

const tabContent: TabData[] = [
  {
    id: "investments",
    label: "Investments Services",
    title: "Investment services",
    description:
      "A dynamic mix of opportunities created to deliver consistency, flexibility, and long-term value, empowering you to move ahead with clarity and confidence.",
  },
  {
    id: "commercial",
    label: "Commerical banking",
    title: "Commercial banking",
    description:
      "Tailored financial solutions designed to help your business streamline operations, manage cash flow, and achieve sustainable growth.",
  },
  {
    id: "wealth",
    label: "Inter generational wealth...",
    title: "Intergenerational wealth",
    description:
      "Comprehensive strategies focused on preserving your assets, minimizing liabilities, and smoothly transferring wealth to future generations.",
  },
  {
    id: "value",
    label: "Value added services",
    title: "Value added services",
    description:
      "Exclusive complementary services that go beyond traditional banking to provide you with holistic financial and lifestyle support.",
  },
];

interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
const cardsData: CardData[] = [
  {
    id: 1,
    title: "Mutual fund services",
    description:
      "amfi certified experts helping portfolio solutions across asset classes",
    imageUrl: "/card11.png",
  },
  {
    id: 2,
    title: "PMS",
    description:
      "Curated list of PMS managers running focused strategies — for HNI investors ready to move beyond mutual funds.",
    imageUrl: "/card12.png",
  },
  {
    id: 3,
    title: "Real Estate Services",
    description:
      "Enabling real estate opportunities via our established partners.",
    imageUrl: "/card13.png",
  },
  {
    id: 4,
    title: "Structured Notes",
    description:
      "Exclusive structured note opportunities — crafted for HNI investors seeking asymmetric payoffs with defined risk parameters.",
    imageUrl: "/card14.png",
  },
  {
    id: 5,
    title: "Insurance Plans",
    description:
      "Back the next generation of disruptive startups and visionary founders reshaping global industries.",
    imageUrl: "/card15.png",
  },
  {
    id: 6,
    title: "Private Equity",
    description:
      "Curated access to high-conviction private equity opportunities — for investors seeking returns beyond public markets.",
    imageUrl: "/card16.png",
  },
  {
    id: 7,
    title: "Dedicated Gift City Distribution of Funds",
    description:
      "Back the next generation of disruptive startups and visionary founders reshaping global industries.",
    imageUrl: "/card17.png",
  },
];
const cardsData1: CardData[] = [
  {
    id: 1,
    title: "Trade finance Services",
    description:
      "Trade finance services enable businesses to manage cross border and domestic trade by offering instruments such as letters or credit guarantees and working capital solutions that reduce risk and improve cash flow ( via our banking partner).",
    imageUrl: "/c1.png",
  },
  {
    id: 2,
    title: "Working capital services",
    description:
      "Structured working capital solutions support businesses by financing their operational needs such  as inventory receivables and ensuring uniterupted operstions.",
    imageUrl: "/c2.png",
  },
  {
    id: 3,
    title: "Foreign exchange Services",
    description:
      "Effortless inward and outward remittances — backed by institutional banking relationships for competitive rates and full regulatory compliance.",
    imageUrl: "/c3.png",
  },
  {
    id: 4,
    title: "Trade finance services",
    description:
      "trade finance services enable businesses to manage cross border and domestic trade by offering instruments such as letters or credit guarantees and working capital solutions that reduce risk and improve cash flow ( via our banking partner).",
    imageUrl: "/c4.png",
  },
];
const cardsData3: CardData[] = [
  {
    id: 1,
    title: "ATLAS Service",
    description:
      "ATLAS- a one glance central repository giving you a unified view of your assets  and financial landscape. A single, consolidated view of your entire wealth — across asset classes, institutions, and geographies.",
    imageUrl: "/v1.png",
  },
  {
    id: 2,
    title: "Treasury services",
    description:
      "Access exclusive tier-one funds and co-investment opportunities previously reserved for institutional investors.",
    imageUrl: "/v2.png",
  },
  {
    id: 3,
    title: "Comprehensive Portfolio X-Ray",
    description:
      "Diversify your portfolio with actively managed alternative investments designed to mitigate market volatility.",
    imageUrl: "/v3.png",
  },
  {
    id: 4,
    title: "Off shore investment services",
    description:
      "Invest in premium commercial and residential properties with stable yields and long-term capital appreciation.",
    imageUrl: "/v4.png",
  },
];
export default function TabSection() {
  const [activeTab, setActiveTab] = useState<string>(tabContent[0].id);
  console.log("aaaaaaa", activeTab);

  return (
    <section className="min-h-screen bg-[#FFF7F0] px-6 py-20 font-sans">
      <div className="mx-auto max-w-6xl">
        {/* Navigation Tabs Container */}
        <div className="relative mb-16 rounded-full border border-b-[#F78532] border-transparent bg-transparent p-1.5 ">
          <ul className="flex flex-wrap items-center justify-between sm:flex-nowrap gap-2">
            {tabContent.map((tab, index) => {
              const isActive = activeTab === tab.id;

              return (
                <React.Fragment key={tab.id}>
                  <li className="flex-1">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full whitespace-nowrap rounded-full px-6 py-2.5 text-md transition-all duration-300 ${
                        isActive
                          ? "bg-[#F48C45]  text-white shadow-md"
                          : " text-[#465A75] hover:bg-[#FADCC7]/30 cursor-pointer hover:text-[#F48C45]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>

                  {/* Render the vertical separators between inactive tabs */}
                  {index < tabContent.length - 1 && (
                    <span className="hidden h-4 w-px bg-[#F48C45] sm:block"></span>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        {activeTab === "investments" && (
          <>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
              {/* Left side: Heading */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold tracking-tight text-[#F48C45] sm:text-5xl">
                  Investment services
                </h2>
              </div>

              {/* Right side: Description */}
              <div>
                <p className="text-lg leading-relaxed text-[#204667A3]">
                  A dynamic mix of opportunities created to deliver consistency,
                  flexibility, and long-term value, empowering you to move ahead
                  with clarity and confidence.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-6">
              <TabCard cardData={cardsData} />
            </div>
          </>
        )}
        {activeTab === "commercial" && (
          <>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
              <div>
                <h2 className="text-2xl font-playfair font-semibold tracking-tight text-[#F48C45] sm:text-5xl">
                  Commercial Banking Services
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[#204667A3]">
                  {
                    "A focused set of banking services built to keep your business moving. We handle the complexity so you don't have to."
                  }
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-6">
              <TabCard cardData={cardsData1} />
            </div>
          </>
        )}
        {activeTab === "wealth" && (
          <>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
              <div>
                <h2 className="text-3xl font-playfair font-semibold leading-none text-[#F48C45] sm:text-5xl ">
                  Inter Generational Wealth Transfer and Succession Services
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[#204667A3]">
                  providing structured solution to prortect and transition
                  wealth and business ownerships across generations while
                  ensuring governance, continuity and long term wealth
                  preservation.
                </p>
              </div>
            </div>
          </>
        )}
        {activeTab === "value" && (
          <>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
              <div>
                <h2 className="text-3xl font-playfair font-semibold tracking-tight text-[#F48C45] sm:text-5xl">
                  Value Added Services
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[#204667A3]">
                  A powerful combination of services covering markets,
                  structures and research-backed analysis that are designed to
                  move you forward with precision and confidence.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-6">
              <TabCard cardData={cardsData3} />
            </div>
            <div className="mt-10 border-l-8 border-[#F78532] rounded-r-[16px] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/mains1.mp4" type="video/mp4" />

                <img
                  src="/fallback-image.jpg"
                  alt="Background"
                  className="h-full w-full object-cover"
                />
              </video>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

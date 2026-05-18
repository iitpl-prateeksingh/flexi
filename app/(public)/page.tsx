"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "./HomePage/HeroSection";
import KnowUs from "./HomePage/KnowUs";
import SignatureApproach from "./HomePage/SignatureApproach";
import ServicesGrid from "./HomePage/ServicesGrid";
import WhyUs from "./HomePage/WhyUs";
import TransparencySection from "./HomePage/TransparencySection";
import InsightsSection from "./HomePage/InsightsSection";
import CTASection from "./HomePage/CTASection";
import { getHomePagePublicService } from "../services/pages/homepageService";
import InterviewSec from "./HomePage/InterviewSec";
export const dynamic = "force-dynamic";
export default function Page() {
  const [data, setData] = useState<any>(null);

  const fetchHomePage = async () => {
    try {
      const res = await getHomePagePublicService();
      setData(res?.data?.contentRef);
    } catch (error) {
      console.error("Homepage API error:", error);
    }
  };

  useEffect(() => {
    fetchHomePage();
  }, []);



  return (
    <div>
      <HeroSection data={data} />
      <SignatureApproach data={data} />
      <KnowUs data={data} />
      <ServicesGrid data={data} />
      <WhyUs data={data} />
      <TransparencySection data={data} />
      <InterviewSec/>
      <InsightsSection />
      <CTASection />
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import CTASection from "../HomePage/CTASection";
import InsightsSection from "../HomePage/InsightsSection";
import Banner from "./Banner";
import TabSection from "./TabSection";
import { getServiceBannerApi } from "@/app/services/services";

export default function page() {
  const [heading, setHeading] = useState();
  const fetchServicesBanner = async () => {
    try {
      const res = await getServiceBannerApi();
      console.log("service banner", res?.data);
      setHeading(res?.data)
    } catch (error) {
      console.error("Error fetching service banner:", error);
    }
  }

  useEffect(() => {
    fetchServicesBanner();
  }, [])

  return (
    <div>
      <Banner data={heading} />
      <TabSection />
      <InsightsSection />
      <CTASection />
    </div>
  );
}

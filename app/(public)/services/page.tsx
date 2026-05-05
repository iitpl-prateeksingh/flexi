/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import CTASection from "../HomePage/CTASection";
import InsightsSection from "../HomePage/InsightsSection";
import Banner from "./Banner";
import TabSection from "./TabSection";
import { getServiceBannerApi } from "@/app/services/services";

export default function Page() {
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
    <div style={{"background": "linear-gradient(1.25deg, rgba(255, 249, 243, 0.6) 15.09%, rgba(253, 188, 140, 0.156) 83.28%, rgba(250, 111, 11, 0) 105.77%)"}}>
      <Banner data={heading} />
      <TabSection />
      <InsightsSection />
      <CTASection />
    </div>
  );
}

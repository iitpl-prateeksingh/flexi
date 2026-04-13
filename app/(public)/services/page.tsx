import CTASection from "../HomePage/CTASection";
import InsightsSection from "../HomePage/InsightsSection";
import Banner from "./Banner";
import TabSection from "./TabSection";

export default function page() {
  return (
    <div>
      <Banner />
        <TabSection/>
      <InsightsSection />
      <CTASection />
    </div>
  );
}

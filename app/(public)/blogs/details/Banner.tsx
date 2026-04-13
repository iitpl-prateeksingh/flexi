import React from "react";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    // Main Container with Background Image
    <section
      className="relative w-full h-[450px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/weekbg.png")',
        backgroundColor: "#1a202c",
      }}
    >
      

      <div className="absolute bottom-[-16px] left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
    </section>
  );
};

export default Banner;

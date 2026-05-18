import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <section
      className="relative w-full md:h-[300px] h-[300] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/aboutbanner.png")`,
        backgroundColor: "#1a202c",
      }}
    >
      {/* Title Section */}
      <div className="absolute z-10 bottom-24 right-12 md:right-32 flex items-center gap-4">
        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>

        <div
          className="text-[#f8813a]  md:text-4xl font-bold tracking-wide html-editor"
        
        >Latest Interviews</div>

        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>
      </div>

      {/* Bottom Left White Curved Overlay */}
      <div className="absolute bottom-0 left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
      <div className="absolute bottom-10 main-bott right-35 z-10 animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-[4px] bg-[#FFFFFF1F] text-white font-light rounded-full py-3 px-4 md:px-8 inline-flex flex-wrap items-center gap-2 md:gap-4 text-[12px] md:text-sm tracking-wide">
            <span className="flex items-center gap-2">
              <span>AMFI Registered Mutual Fund Distributor</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

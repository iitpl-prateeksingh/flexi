import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    // Main Container with Background Image
    <section
      className="relative w-full h-[450px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/interviewban.png)`,
        backgroundColor: "#1a202c",
      }}
    >
      <div className="relative z-10 text-end container mx-auto px-6 lg:px-12  text-white">
        <div className="container mx-auto pt-30 md:pt-60">
          <div className="flex items-center justify-end gap-4">
            <span className="w-8 md:w-8 h-[1px] bg-[#f8813a]"></span>
            <h1 className="text-[#f8813a] md:text-md font-bold tracking-wide">
              FlexiCapital Media Hub
            </h1>
            <span className="w-8 md:w-8 h-[1px] bg-[#f8813a]"></span>
          </div>
        </div>
        <div className="max-w-4xl float-end">
          <h1 className="font-playfair main-blog  font-semibold text-3xl  md:text-[50px]  leading-[106%]  tracking-[0] text-[#fff]">
            <div className="html-editor">
              The Clear View: <div className="inline text-[#F78532]">News, <br /> Interviews & Market Insights</div> 
            </div>
          </h1>
          <div className="font-inter  md:text-[24px] leading-[126%]  mt-4 text-right">
            <div className="html-editor main-blog-des" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 main-bott left-0 z-10 animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-[4px] bg-[#FFFFFF1F] text-white font-light rounded-full py-3 px-4 md:px-8 inline-flex flex-wrap items-center gap-2 md:gap-4 text-[12px] md:text-sm tracking-wide">
            <span className="flex items-center gap-2">
              <span>AMFI Registered Mutual Fund Distributor</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-16px] left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
    </section>
  );
};

export default Banner;

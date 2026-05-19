import React from "react";
import Link from "next/link";
 
const Banner = ({ data }: any) => {
  return (
 
    <section
      className="relative w-full md:h-[450px] h-[400px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${data?.banner})`,
        backgroundColor: "#1a202c",
      }}
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12  text-white">
        <div className="container mx-auto pt-40">
          <div className="flex items-center gap-4">
            <span className="w-8 md:w-8 h-[2px] bg-[#f8813a]"></span>
            <h1 className="text-[#f8813a]  md:text-md font-bold tracking-wide">
              Services{" "}
            </h1>
            <span className="w-8 md:w-8 h-[2px] bg-[#f8813a]"></span>
          </div>
        </div>
        <div className="max-w-2xl">
          <h1
            className="font-playfair html-editor service-banner font-semibold text-5xl md:text-[50px] leading-[106%] tracking-[0] text-[#fff]"
            dangerouslySetInnerHTML={{
              __html: data?.bannerText.replace(/&nbsp;/g, " ") || '',
            }}
          />
        </div>
      </div>
 
      <div className="absolute bottom-[-16px] left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF2E8] rounded-tr-[150px] z-20"></div>
    <div className="absolute bottom-10 main-bott right-0 z-10 animate__animated animate__fadeInUp">
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
 
 
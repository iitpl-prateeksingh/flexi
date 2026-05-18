import React from "react";

const Banner = ({ data }: any) => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">

      {/* BACKGROUND VIDEO */}
      {data?.bannerVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={data.bannerVideo} type="video/mp4" />
        </video>
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* TEXT (HTML from API) */}
      {/* <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
        <div
          className="text-white text-3xl md:text-5xl font-bold"
          dangerouslySetInnerHTML={{ __html: data?.banner }}
        />
      </div> */}

      {/* CURVE */}
      <div className="absolute bottom-0 left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
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
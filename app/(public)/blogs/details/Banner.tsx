"use client";
import React from "react";

const Banner = ({ data }: any) => {
  if (!data) return null; // ✅ prevent crash

  return (
    <section
      className="relative w-full h-[450px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${data?.image || "/weekbg.png"})`, // ✅ fallback
        backgroundColor: "#1a202c",
      }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-end">
        <div className="container mx-auto px-6 lg:px-12 text-white text-right">

          {/* Top Label */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <span className="w-8 h-[1px] bg-[#f8813a]"></span>
            <h1 className="text-[#f8813a] text-sm md:text-md font-bold tracking-wide">
              Blogs
            </h1>
            <span className="w-8 h-[1px] bg-[#f8813a]"></span>
          </div>

          {/* Title */}
          <div className="max-w-4xl ml-auto">
            <h1 className="font-playfair main-blog font-semibold text-3xl md:text-[50px] leading-[106%] text-white">
              <div
                className="html-editor "
                dangerouslySetInnerHTML={{
                  __html: data?.title?.replace(/&nbsp;/g, " ") || "",
                }}
              />
            </h1>

            {/* Description */}
            <div className="font-inter md:text-[24px] leading-[126%] mt-4">
              <div
                className="html-editor main-blog-des"
                dangerouslySetInnerHTML={{
                  __html: data?.detail?.replace(/&nbsp;/g, " ") || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Shape (same as your original) */}
      <div className="absolute bottom-[-16px] left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
    </section>
  );
};

export default Banner;
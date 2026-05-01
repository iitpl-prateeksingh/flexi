import React from 'react';
// import Image from 'next/image';

const WeAreThe = ({ data }: any) => {
  return (
    <section className="bg-[#fcf8f5] w-full py-16 md:pb-28 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        <div className="w-full lg:w-1/2 flex flex-col relative z-10">

          {/* ✅ Title from API */}
          <h2
            className="font-playfair text-[#204667] know-main font-bold text-2xl sm:text-3xl html-editor md:text-[38px] mb-6"
            dangerouslySetInnerHTML={{
              __html: data?.section1Title.replace(/&nbsp;/g, " ") || "",
            }}
          />

          {/* ✅ Description from API */}
          <div
            className="flex flex-col gap-2 text-[#204667] text-sm md:text-base  html-editor leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: data?.section1Description.replace(/&nbsp;/g, " ") || "",
            }}
          />

        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
          <img
            src={data?.section1Image || "/right1.png"}
            style={{ maxWidth: "500px", width: "100%" }}
            className="mx-auto"
            alt=""
          />
        </div>

      </div>

      <img
        src="/secline.png"
        className="absolute left-0 bottom-5 md:bottom-15"
        alt=""
      />
    </section>
  );
};

export default WeAreThe;
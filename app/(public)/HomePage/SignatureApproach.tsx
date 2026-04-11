import React from 'react';

const SignatureApproach = ({ data }: { data: any }) => {

  return (
    <section className="relative w-full min-h-[450px] flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={data?.ctoImage || "/home-sig1.png"} // Replace with your actual image path
          alt="Mother and daughter smiling"
          className="w-full h-full object-cover object-center"
        />
        {/* Optional overlay to ensure text readability on mobile */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
      </div>

      {/* Content Container */}
      <div className="z-2 relative md:-top-22" style={{ width: "100%" }}>
        <div className="flex justify-end">
          <div
            className="w-full md:w-1/2 lg:w-[39.5%] bg-[#B13229CC] p-8 md:p-16 shadow-[0px_4.49px_4.49px_0px_#00000040] max-w-xl mx-auto lg:mx-0 break-words whitespace-normal overflow-hidden quill-content html-editor"
            dangerouslySetInnerHTML={{ __html: data?.ctoContent.replace(/&nbsp;/g, " ") }}
          />
        </div>
      </div>
    </section>
  );
};

export default SignatureApproach;
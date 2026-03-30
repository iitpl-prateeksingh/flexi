import React from 'react';

const SignatureApproach: React.FC = () => {
  return (
    <section className="relative w-full min-h-[450px] flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/home-sig1.png" // Replace with your actual image path
          alt="Mother and daughter smiling"
          className="w-full h-full object-cover object-center"
        />
        {/* Optional overlay to ensure text readability on mobile */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
      </div>

      {/* Content Container */}
      <div className="z-2 relative md:-top-22" style={{width:"100%"}}>
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 lg:w-[40%] bg-[#B13229CC] p-8 md:p-16 text-white shadow-[0px_4.49px_4.49px_0px_#00000040]">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Our Signature Approach
            </h2>
           
            <p className="text-lg md:text-2xl font-light leading-relaxed opacity-90">
              &ldquo;Standing alongside families as they shape the future 
              they&apos;ve always envisioned, built on trust.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureApproach;
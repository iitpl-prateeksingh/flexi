import React from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Uncomment if using Next.js Image component for the logo/bg

const Banner: React.FC = () => {
  return (
    // Main Container with Background Image
    <section 
      className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat"
      // style={{
       
      //   backgroundImage: 'url("/contactusban.png")', 
      //   backgroundColor: '#1a202c' // Fallback color
      // }}
    >
       <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/contact.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img
            src="/fallback-image.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </video>
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />
      </div>
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

     

      {/* "Contact Us" Title Section */}
      {/* <div className="absolute z-10 bottom-24 right-12 md:right-32 flex items-center gap-4">
        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>
        <h1 className="text-[#f8813a] text-3xl md:text-4xl font-bold tracking-wide">
          Contact Us
        </h1>
        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>
      </div> */}

      {/* Bottom Left White Curved Overlay */}
      <div className="absolute bottom-0 left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
    </section>
  );
};

export default Banner;
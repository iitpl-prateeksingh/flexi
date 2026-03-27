import React from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Uncomment if using Next.js Image component for the logo/bg

const Banner: React.FC = () => {
  return (
    // Main Container with Background Image
    <section 
      className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat"
      style={{
        // Replace this URL with your actual background image path from your public folder
        backgroundImage: 'url("/aboutbanner.png")', 
        backgroundColor: '#1a202c' // Fallback color
      }}
    >
      
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

     

      {/* "About Us" Title Section */}
      <div className="absolute z-10 bottom-24 right-12 md:right-32 flex items-center gap-4">
        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>
        <h1 className="text-[#f8813a] text-3xl md:text-4xl font-bold tracking-wide">
          About Us
        </h1>
        <span className="w-8 md:w-12 h-[2px] bg-[#f8813a]"></span>
      </div>

      {/* Bottom Left White Curved Overlay */}
      <div className="absolute bottom-0 left-0 w-3/4 md:w-1/2 h-4 md:h-8 bg-[#FFF9F3] rounded-tr-[150px] z-20"></div>
    </section>
  );
};

export default Banner;
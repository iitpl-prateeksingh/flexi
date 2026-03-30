import React from 'react';
// import Image from 'next/image'; // Recommended for Next.js projects

const WeAreThe: React.FC = () => {
  return (
    <section className="bg-[#fcf8f5] w-full py-16 md:py-28 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
   
        <div className="w-full lg:w-1/2 flex flex-col relative z-10">
          
          <h2 className="font-playfair text-[#204667] font-bold text-2xl sm:text-3xl md:text-[38px] mb-6">
            <span className="text-[#324f63]">We Are The </span>
            <span className="text-[#f68037]">Steady Hand On A<br/>Winding Road</span>
          </h2>
          
          <div className="flex flex-col gap-6 text-[#5b6e7a] text-sm md:text-base leading-relaxed font-medium">
            <p>
              Life moves through many stages, and markets move through cycles. The path is
              rarely straight, and every turn brings new considerations. We stand beside you
              through these shifts, offering structured access to a carefully selected range of
              mutual fund solutions with clarity and consistency.
            </p>
            
            <p>
              Flexi Capital is a boutique, AMFI-registered Mutual fund distributor & private wealth
              institution dedicated to connecting individuals, families, and Institutions with a
              diverse range of financial products.<br />
              These include all products and services ranging from Mutual Funds, Corporate
              Deposits, Structured Notes, Insurance Products, Alternate Investment Funds,
              Portfolio Management Services, Equity Trading through broking services, Real Estate
              opportunities, and Family Office support — creating a structured pathway for long-
              term wealth creation.
            </p>
          </div>

        </div>

        {/* Right Column: Image with Offset Background */}
        <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
          {/* Peach Offset Background Rectangle */}
        <img src="/right1.png" style={{maxWidth:"500px",width:"100%"}} className='mx-auto' alt='' />
        </div>

      </div>
        <img src="/secline.png" className='absolute left-0 bottom-5 md:bottom-15'  alt='' />
      
          
    </section>
  );
};

export default WeAreThe;
import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section className="bg-[#fcf8f5] w-full py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-playfair text-[#F78532] font-bold text-3xl md:text-4xl mb-8">
          Contact Us
        </h2>

        {/* Contact Card Container */}
        <div className="flex flex-col lg:flex-row w-full rounded-2xl overflow-hidden shadow-xl bg-white">
          
          {/* Left Column: Contact Details */}
          <div className="w-full lg:w-[40%] bg-[#082a45] p-8 md:p-12 flex flex-col">
            <h3 className="text-white text-2xl font-medium mb-8">New Delhi</h3>

            {/* 1. Service Request */}
            <div className="flex flex-col">
              <h4 className="text-white font-playfair text-lg mb-4">For Service Request</h4>
              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full text-[#F78532] flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m2 6 10 7 10-7"></path>
                  </svg>
                </div>
                <p className="text-[#a4b8c9] text-sm md:text-base leading-relaxed break-all">
                  customer.service@flexicapital.co.in
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/10 my-8" />

            {/* 2. Corporate Office */}
            <div className="flex flex-col">
              <h4 className="text-white font-playfair text-lg mb-4">Our Corporate Office</h4>
              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full text-[#F78532] flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-[#a4b8c9] text-sm md:text-base leading-relaxed">
                  Flexicapital Pvt Ltd.<br />
                  B - 45, M-4B, Mezzanine Floor,<br />
                  Greater Kailash, Part 1, New Delhi –<br />
                  110048
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/10 my-8" />

            {/* 3. Phone */}
            <div className="flex flex-col">
              <h4 className="text-white font-playfair text-lg mb-4">Phone</h4>
              <div className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full text-[#F78532] flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <p className="text-[#a4b8c9] text-sm md:text-base leading-relaxed">
                  +91 1149072143
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Map Image */}
          <div className="w-full lg:w-[60%] min-h-[300px] sm:min-h-[400px] lg:min-h-auto relative bg-gray-200">
            <iframe 
              src="https://maps.google.com/maps?q=Greater%20Kailash%20Part%201,%20New%20Delhi&t=k&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full absolute inset-0 border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Flexicapital Office Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;
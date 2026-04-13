import React from 'react'

export default function ExploreCard() {
  return (
    <div>
        <div className="group cursor-pointer">
           <div className="relative h-64 w-full overflow-hidden mb-6 rounded-[4px]">
              <img 
                src="/ins2.png" 
                alt="Market Outlook"       
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
                  <span className="text-[#F78532] text-xl block font-playfair">
                Weekly Flexi Wrap 
              </span>
              {/* <h3 className="text-xl font-medium text-[#204667] group-hover:text-[#4A86E8] transition-colors font-inter">
                Succession Strategies for Family Enterprises
              </h3> */}
              <p className="text-gray-500 text-sm leading-relaxed font-inter">
               Cut through the Lawyers, your weekly market insights delivered weekly.
              </p>
            </div>
          </div>
    </div>
  )
}

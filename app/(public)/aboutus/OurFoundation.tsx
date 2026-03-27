import React from 'react';

// Define the type for our team members
type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
};

// Mock data for the team (replace image URLs with your actual assets)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nasser Salim',
    role: 'Managing Partner',
    imageUrl: '/ft1.png', // Update this path
    linkedinUrl: '#',
  },
  {
    id: 2,
    name: 'Nasser Salim',
    role: 'Founder & Principal Advisor',
    imageUrl: '/ft2.png', // Update this path
    linkedinUrl: '#',
  },
  {
    id: 3,
    name: 'Nasser Salim',
    role: 'Founder & Principal Advisor',
    imageUrl: '/ft3.png', // Update this path
    linkedinUrl: '#',
  },
];

const OurFoundation: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-[42px] font-playfair font-bold text-[#204667] mb-6">
            The <span className="text-[#f68037]">Pillars</span> of Our Foundation
          </h2>
          <p className="text-[#7a8b98] text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Behind every structured step stands a team grounded in experience and integrity.
            Meet the individuals who guide our direction, uphold our standards, and shape the
            strength that supports every journey.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="relative overflow-hidden group w-full aspect-[4/5] bg-gray-100 shadow-sm"
            >
              {/* Profile Image */}
              <img 
                src={member.imageUrl} 
                alt={`${member.name} - ${member.role}`} 
                className="w-full h-full object-cover"
              />

              {/* Glassmorphism Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-[#FFFFFF38]  backdrop-blur-[30.56px] flex justify-between items-end">
                
                {/* Text Info */}
                <div>
                  <h3 className="text-[#204667] font-bold text-lg md:text-xl leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#4a6b82] text-sm font-medium mt-1">
                    {member.role}
                  </p>
                </div>

                {/* LinkedIn Icon */}
                <a 
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{  "border": "0.89px solid #204667",padding:"5px" }}
                  className="text-[#204667] hover:text-[#204667] rounded-full bg-[#D9D9D91F]  transition-colors duration-300"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurFoundation;
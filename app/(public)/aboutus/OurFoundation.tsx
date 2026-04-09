// import React from 'react';


// type TeamMember = {
//   id: number;
//   name: string;
//   role: string;
//   imageUrl: string;
//   linkedinUrl: string;
// };


// const teamMembers: TeamMember[] = [
//   {
//     id: 1,
//     name: 'Nasser Salim',
//     role: 'Managing Partner',
//     imageUrl: '/ft1.png', // Update this path
//     linkedinUrl: '#',
//   },
//   {
//     id: 2,
//     name: 'Nasser Salim',
//     role: 'Founder & Principal Advisor',
//     imageUrl: '/ft2.png', // Update this path
//     linkedinUrl: '#',
//   },
//   {
//     id: 3,
//     name: 'Nasser Salim',
//     role: 'Founder & Principal Advisor',
//     imageUrl: '/ft3.png', // Update this path
//     linkedinUrl: '#',
//   },
// ];

// const OurFoundation: React.FC = () => {
//   return (
//     <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-[42px] font-playfair font-bold text-[#204667] mb-6">
//             The <span className="text-[#f68037]">Pillars</span> of Our Foundation
//           </h2>
//           <p className="text-[#7a8b98] text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
//             Behind every structured step stands a team grounded in experience and integrity.
//             Meet the individuals who guide our direction, uphold our standards, and shape the
//             strength that supports every journey.
//           </p>
//         </div>

//         {/* Team Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map((member) => (
//             <div 
//               key={member.id} 
//               className="relative overflow-hidden group w-full aspect-[4/5] bg-gray-100 shadow-sm"
//             >
//               {/* Profile Image */}
//               <img 
//                 src={member.imageUrl} 
//                 alt={`${member.name} - ${member.role}`} 
//                 className="w-full h-full object-cover"
//               />

//               {/* Glassmorphism Gradient Overlay */}
//               <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-[#FFFFFF38]  backdrop-blur-[30.56px] flex justify-between items-end">
                
//                 {/* Text Info */}
//                 <div>
//                   <h3 className="text-[#204667] font-bold text-lg md:text-xl leading-tight">
//                     {member.name}
//                   </h3>
//                   <p className="text-[#4a6b82] text-sm font-medium mt-1">
//                     {member.role}
//                   </p>
//                 </div>

//                 {/* LinkedIn Icon */}
//                 <a 
//                   href={member.linkedinUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{  "border": "0.89px solid #204667",padding:"5px" }}
//                   className="text-[#204667] hover:text-[#204667] rounded-full bg-[#D9D9D91F]  transition-colors duration-300"
//                   aria-label={`${member.name}'s LinkedIn`}
//                 >
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     width="20" 
//                     height="20" 
//                     viewBox="0 0 24 24" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     strokeWidth="1.5" 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round"
//                   >
//                     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//                     <rect x="2" y="9" width="4" height="12"></rect>
//                     <circle cx="4" cy="4" r="2"></circle>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default OurFoundation;
import React from 'react';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  bio: string; // Added bio field
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nasser Salim',
    role: 'Managing Partner',
    imageUrl: '/team1.png',
    linkedinUrl: '#',
    bio: 'Nasser has over 15 years of investment and commercial banking experience including retail banking. He previously worked with Citibank (New Delhi; November 2004 to July 2016), and more recently as a Cluster Head Investments for Citi Private Clients. Prior to Citi, Nasser worked with ABN AMRO in the Retail Distribution Business (New Delhi; April 2004 to October 2004).',
  },
  {
    id: 2,
    name: 'Nasser Salim',
    role: 'Founder & Principal Advisor',
    imageUrl: '/team2.png',
    linkedinUrl: '#',
    bio: "Nasser's experience in investments, retail and commercial banking provides a unique advantage in terms of his industry knowledge for managing high net worth private banking clients.",
  },
  {
    id: 3,
    name: 'Nasser Salim',
    role: 'Founder & Principal Advisor',
    imageUrl: '/team3.png',
    linkedinUrl: '#',
    bio: 'Extensive background in wealth management and financial strategy, focused on providing bespoke solutions for private banking clients globally.',
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
              className="relative overflow-hidden group w-full aspect-[4/5] bg-gray-100 shadow-sm cursor-pointer"
            >
              {/* Profile Image */}
              <img 
                src={member.imageUrl} 
                alt={`${member.name} - ${member.role}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default Bottom Bar (Hidden on hover) */}
              <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-[#00000085] backdrop-blur-[30.56px] flex justify-between items-end transition-opacity duration-300 group-hover:opacity-0">
                <div>
                  <h3 className="text-[#fff] font-bold text-lg md:text-xl leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#fff] text-sm font-medium mt-1">
                    {member.role}
                  </p>
                </div>
                <div className="p-1.5 border-[0.89px] border-[#fff] rounded-full bg-[#D9D9D91F] text-[#fff]">
                   <LinkedInIcon />
                </div>
              </div>

              {/* Hover Bio Overlay (Visible on hover) */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md p-8 flex flex-col justify-start translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-white">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-gray-300 text-sm">{member.role}</p>
                  </div>
                  <a 
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-white/40 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                
                <div className="w-12 h-[2px] bg-[#f68037] mb-4"></div>
                
                <p className="text-white/90 text-sm leading-relaxed overflow-y-auto">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Reusable Icon Component
const LinkedInIcon = () => (
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
);

export default OurFoundation;
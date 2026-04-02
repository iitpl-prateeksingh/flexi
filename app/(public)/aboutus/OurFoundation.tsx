import React from "react";

// Define API team member type
type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  description: string;
  link: string
  image: string;
};

const OurFoundation = ({ data }: any) => {
  const teamMembers: TeamMember[] = data?.teamMembers || [];
  console.log(teamMembers)
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className=" html-editor font-playfair font-bold text-[#204667] mb-6"
            dangerouslySetInnerHTML={{ __html: data?.team.replace(/&nbsp;/g, " ") || "" }}
          />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="group relative w-full aspect-[4/5] overflow-hidden bg-gray-100 shadow-sm"
            >
              {/* Profile Image */}
              <img
                src={member.image}
                alt={`${member.name} - ${member.designation}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-95"
              />

              {/* Glassmorphism Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[50%] translate-y-[62%] bg-black/60 px-6 py-5 backdrop-blur-[30.56px] transition-transform duration-500 ease-out group-hover:translate-y-0">
                <div className="flex h-full flex-col gap-3">
                  <div className="flex items-end justify-between gap-4">
                    <div className="pr-3">
                      <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#ffffffaf]">
                        {member.designation}
                      </p>
                    </div>

                    <a
                      href={member.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!member.link) e.preventDefault();
                      }}
                      style={{ border: "0.89px solid #204667", padding: "5px" }}
                      className="rounded-full bg-white/50 text-[#204667] transition-colors duration-300 hover:text-[#204667]"
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

                  <p className="overflow-hidden text-sm leading-6 text-white/90">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurFoundation;

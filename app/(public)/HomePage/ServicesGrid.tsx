import React from "react";
import {
  TrendingUp,
  ShieldCheck,
  Users,
  HandCoins,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Wealth Management and Investment Advisory",
    description:
      "We help you move forward with confidence, identifying opportunities that align with your evolving priorities and life stages.",
    icon: <TrendingUp className="w-6 h-6" />,
    image: "/g1.png",
  },
  {
    title: "Insurance & Protection Planning",
    description:
      "Our offerings are designed to support your loved ones through life's uncertainties, helping ensure stability when it matters most.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "/g2.png",
  },
  {
    title: "Family Office Services",
    description:
      "We assist families in bringing together multiple elements under one coordinated approach, helping maintain continuity and balance across generations.",
    icon: <Users className="w-6 h-6" />,
    image: "/g3.png",
  },
  {
    title: "Loans & Financial Solutions",
    description:
      "Whether addressing a timely requirement or responding to an emerging opportunity, our structured solutions help you maintain your momentum.",
    icon: <HandCoins className="w-6 h-6" />,
    image: "/g4.png",
  },
];

const ServicesGrid = () => {
  return (
    <section className="bg-[#fdf8f3] py-16 px-0 md:px-6 md:py-24">
      <div className="px-4 md:px-20 mx-auto ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#204667] mb-6">
              Our Innovation at Work
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {
                " Every family's financial journey begins with a vision of comfort, continuity, and something meaningful to pass forward. At Flexi Capital, we focus on helping you translate those aspirations into a well-structured path that supports today's needs and tomorrow's possibilities."
              }
            </p>
          </div>
          <button className="group flex items-center gap-2 border border-[#F78532] text-[#F78532] cursor-pointer px-6 py-2 rounded-full hover:bg-orange-50 transition-colors w-fit">
            Explore More services{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative w-full h-100 md:h-[290px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Full Background Image - Placed behind everything */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
              />

              {/* Glassmorphism Gradient Overlay - Left Side */}
              <div className="absolute inset-y-0 left-0 z-10 w-full sm:w-[55%] p-8 flex flex-col justify-center bg-[#00000052] to-transparent backdrop-blur-[2px] md:backdrop-blur-md">
                {/* Content */}
                <div className="mb-2 text-white/90 p-3 bg-white/10 w-fit rounded-full backdrop-blur-sm border border-white/10">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-playfair md:text-xl font-serif text-white mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-white font-medium md:font-light text-sm md:text-sm leading-relaxed opacity-90">
                  {service.description}
                </p>

                {/* Optional decorative line */}
                <div className="w-12 h-[1px] bg-white/40 mt-6 group-hover:w-20 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

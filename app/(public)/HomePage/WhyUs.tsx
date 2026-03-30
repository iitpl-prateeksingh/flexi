const features = [
  {
    title: "Measured Craftsmanship",
    description: "Every element is approached with care and intention, ensuring thoughtful alignment between today's decisions and tomorrow's outcomes.",
    icon: "/m1.png"
  },
  {
    title: "Legacy in Motion",
    description: "Our role is to ensure continuity, care, and thoughtful progression across generations.",
    icon: "/m2.png"
  },
  {
    title: "A Steady Hand",
    description: "Through changing conditions, we remain composed and deliberate, helping families navigate transitions with reassurance and control.",
    icon: "/m3.png"
  },
  {
    title: "Balance at Every Level",
    description: "We emphasize harmony across financial elements to support stability and forward momentum.",
    icon: "/m4.png"
  }
];

const WhyUs = () => {
  return (
    <section className="bg-[#fdf8f3] py-16">
      <div className="max-w-5xl mx-auto p-2 md:p-0">
               
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block  bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
            Why us
          </span>
          <h2 className="text-4xl md:text-[42px] font-playfair font-bold text-[#204667] mb-6">
            What Keeps Our Clients Coming Back?
          </h2>
          <p className="text-[#204667A3] leading-relaxed text-md">
            Every enduring structure is defined by intention, discipline, and craftsmanship. Our approach reflects the same principles, carefully considered, quietly confident, and built to stand the test of time.
          </p>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-center">
          
          
          <div className="h-[500px]  w-full relative  overflow-hidden shadow-lg">
             {/* Note: The 'rounded-t-[100px]' gives that slight arch/modern shape if desired, 
                 remove it for a standard square image like the reference. */}
            <img 
              src="/build1.png" // Replace with your image path
              alt="Skyscrapers looking up" 
              className="w-full h-full object-cover"
            />
          </div>

         
          <div className="flex flex-col">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex gap-6 py-4 ${
                  index !== features.length - 1 ? 'border-b border-orange-100' : ''
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0  w-[40px] text-[#204667]">
                  <img src={feature.icon}    alt="" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-playfair font-medium text-[#204667] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#204667D1]  text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;
const WhyUs = ({ data }: any) => {
  const features = data?.whyChooseList || [];

  return (
    <section className="bg-[#fdf8f3] py-16">
      <div className="max-w-5xl mx-auto p-2 md:p-0">

        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-gradient-to-r from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-medium mb-4">
            Why us
          </span>

          {/* Dynamic Title */}
          <div
            className="text-4xl md:text-[42px] font-playfair font-bold text-[#204667] mb-2"
            dangerouslySetInnerHTML={{
              __html: data?.whyChooseTitle || "",
            }}
          />

          {/* Optional Detail */}
          <div
            className="text-[#204667A3] leading-relaxed text-md"
            dangerouslySetInnerHTML={{
              __html: data?.whyChooseDetail || "",
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="h-[500px] w-full relative overflow-hidden shadow-lg">
            <img
              src={data?.whyChooseImage}
              alt="why-us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Features List */}
          <div className="flex flex-col">
            {features.map((feature: any, index: number) => (
              <div
                key={feature._id || index}
                className={`flex gap-6 py-4 ${index !== features.length - 1
                  ? "border-b border-orange-100"
                  : ""
                  }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-[40px] text-[#204667]">
                  <img src={feature.icon} alt="" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-playfair font-medium text-[#204667] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#204667D1] text-sm leading-relaxed">
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
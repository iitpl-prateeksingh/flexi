interface Feature {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

interface WhyUsData {
  whyChooseList?: Feature[];
  whyChooseTitle?: string;
  whyChooseDetail?: string;
  whyChooseImage?: string;
}

const WhyUs = ({ data }: { data: WhyUsData }) => {
  const features = data?.whyChooseList || [];
const cleanHTML = (html?: string) => {
  return html
    ?.replace(/&nbsp;/g, " ") // remove nbsp 
    .replace(/<span[^>]*>/g, "") // remove span open
    .replace(/<\/span>/g, "") || ""; // remove span close
};
  return (
    <section className="bg-[#fdf8f3]  pb-16 px-0 md:px-6 md:pb-24">
      <div className="px-4 md:px-20 mx-auto">

        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-gradient-to-r bedge-main from-[#1B365D] to-[#4A90E2] text-white px-6 py-1.5 rounded-full text-sm font-light mb-4">
            Why us
          </span>
<p className="text-lg font-semibold text-[#204667] text-center mb-3">
              AMFI Registered Mutual Fund Distributor
            </p>
          {/* Dynamic Title */}
          <div style={{wordBreak:"break-all"}}
            className="text-4xl md:text-[42px] main-why font-playfair font-bold why-head text-[#204667] mb-2"
           dangerouslySetInnerHTML={{
    __html: (data?.whyChooseTitle || "").replace(/&nbsp;/g, " "),
  }}
          />

          {/* Optional Detail */}
          <div
            className="text-[#204667A3] leading-relaxed why-text text-md"
            dangerouslySetInnerHTML={{
              __html: data?.whyChooseDetail || "",
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">

          {/* Image */}
          <div className="h-[600px] w-full relative overflow-hidden shadow-lg">
            <img
              src={data?.whyChooseImage}
              alt="why-us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Features List */}
          <div className="flex flex-col">
            {features.map((feature: Feature, index: number) => (
              <div
                key={feature._id || index}
                className={`flex gap-3 py-4 ${index !== features.length - 1
                  ? "border-b border-orange-100"
                  : ""
                  }`}
              >
                <div className="flex gap-6 py-4 items-start">

                  {/* Icon */}
                  <div className="flex-shrink-0 w-[40px] text-[#204667]">
                    <img src={feature.icon} alt="" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">

                    <h3 className="text-xl font-playfair font-medium text-[#204667] mb-1">
                      {feature.title}
                    </h3>

                    <div
                      className="flex flex-col gap-6 text-[#5b6e7a] html-editor leading-relaxed "
                      dangerouslySetInnerHTML={{
                        __html: cleanHTML(feature?.description || ""),
                      }}
                    />
                  </div>
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
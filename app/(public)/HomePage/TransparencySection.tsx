export default function TransparencySection({ data }: any) {

  console.log("BAnner", data?.banner, data?.bannerText)
  return (
    <section className="bg-[#FFF9F3]">
      <div
        className="bg-cover overflow-hidden flex justify-end"
        style={{
          backgroundImage: `url(${data?.banner})`,
          borderRadius: "70px 70px 0px 0px",
        }}
      >
        {/* Right Glass Content */}
        <div className="md:w-1/3 h-full relative">
          {/* Glass Layer */}
          <div
            className="py-14 px-0 md:px-8"
            style={{
              backdropFilter: "blur(16px)",
              background: "#00000014",
            }}
          >
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 py-10 text-white">

              {/* Dynamic Content (Title + Description) */}
              <div
                className="font-playfair html-editor text-xl sm:text-3xl md:text-[30.41px] leading-[1.06]"
                dangerouslySetInnerHTML={{
                  __html: (data?.bannerText || "").replace(/&nbsp;/g, " "),
                }}
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
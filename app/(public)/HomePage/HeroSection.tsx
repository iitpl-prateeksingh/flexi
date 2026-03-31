import 'animate.css';

const HeroSection = ({ data }: { data: any }) => {
  const videoUrl = data?.videos?.[0];
  const titleHTML = data?.title.replace(/&nbsp;/g, " ");

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoUrl || "/hero-video.mp4"} type="video/mp4" />

          {/* fallback */}
          <img
            src="/fallback-image.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </video>

        <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center lg:items-end text-center lg:text-right text-white">
        <div className="max-w-3xl">

          {/* ✅ Render HTML from API */}
          <div
            className="html-editor animate__animated animate__fadeInRight"
            dangerouslySetInnerHTML={{ __html: titleHTML }}
          />

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-10 left-0 right-0 z-10 animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-[4px] bg-[#FFFFFF1F] text-white font-light rounded-full py-3 px-4 md:px-8 inline-flex flex-wrap items-center gap-2 md:gap-4 text-[12px] md:text-sm tracking-wide">
            <span>AMFI Registered</span>
            <span className="opacity-40">|</span>
            <span>FEMA-Compliant Advisory</span>
            <span className="opacity-40">|</span>
            <span>Client-First Approach</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
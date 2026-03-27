
import 'animate.css';

const HeroSection = () => {
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
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img
            src="/fallback-image.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </video>
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-center lg:items-end text-center lg:text-right text-white">
        <div className="max-w-3xl">
          <h1 className="animate__animated animate__fadeInRight  font-playfair  font-semibold text-3xl  md:text-[60.2px]  leading-[106%]  tracking-[0]  text-right text-[#FFFFFFD1]">
            Is <span className="text-[#f58437]">your Success</span> Giving you
            Moments Like These?
          </h1>

          <p className="animate__animated animate__fadeInRight animate__slow font-inter font-semibold md:text-[27.78px] leading-[126%] tracking-[0] mt-4 text-right">
            {"If not, then it's time to redefine your future."}
          </p>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="absolute bottom-10 left-0 right-0 z-10 animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-[4px] bg-[#FFFFFF1F] text-white font-light rounded-full py-3 px-4 md:px-8 inline-flex flex-wrap items-center gap-2 md:gap-4 text-[12px] md:text-sm font-[family-name:var(--font-inter)] tracking-wide">
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

export default function TransparencySection() {
  return (
    <section className="bg-[#FFF9F3]">
      <div className="bg-[url('/cta1.png')] bg-cover overflow-hidden flex justify-end" style={{borderRadius:"70px 70px 0px 0px"}} >

     
        {/* Right Glass Content */}
        <div className="md:w-1/3  h-full relative ">
          {/* Glass Layer */}
          <div className="py-14 px-0 md:px-8" style={{"backdropFilter": "blur(16px)","background": "#00000014"}}>
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 py-10 text-white">
            <h3 className="font-playfair text-xl sm:text-3xl md:text-[30.41px] leading-[1.06]">
              Transparency in Action
            </h3>

            <p className="mt-4 font-light text-sm sm:text-base leading-relaxed text-gray-200">
              “We anchor your path in absolute transparency, mirroring your
              ambitions with unshakeable institutional fortitude.”
            </p>
          </div>
          </div>

        </div>

      </div>
    </section>
  )
}

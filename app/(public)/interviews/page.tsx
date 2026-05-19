// import React from "react";
// import Link from "next/link";
// import { Play } from "lucide-react";
// import Banner from "./Banner";


// interface InterviewSec {
//   id: string;
//   title: string;
//   youtubeId: string;
//   thumbnailUrl: string;
//   duration: string;
// }


// const interviewData: InterviewSec[] = [
//   {
//     id: "1",
//     title: "The Future of Luxury Real Estate in 2026",
//     youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
//     duration: "14:20",
//   },
//   {
//     id: "2",
//     title: "Expert Interview: Navigating High Interest Rates",
//     youtubeId: "dQw4w9WgXcQ",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
//     duration: "22:15",
//   },
//   {
//     id: "3",
//     title: "Top 5 Strategies for First-Time Homebuyers",
//     youtubeId: "dQw4w9WgXcQ",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
//     duration: "08:45",
//   },
//   {
//     id: "4",
//     title: "Commercial Real Estate: Market Crash or Correction?",
//     youtubeId: "dQw4w9WgXcQ",
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
//     duration: "19:30",
//   },
// ];
// // --- Types & Dummy Data ---
// interface VideoItem {
//   id: string;
//   source: string;
//   title: string;
//   thumbnailUrl: string;
//   videoUrl: string;
// }

// const SIDE_VIDEOS: VideoItem[] = [
//   {
//     id: "1",
//     source: "NDTV",
//     title:
//       "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
//     thumbnailUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Dummy business thumbnail
//     videoUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
//   {
//     id: "2",
//     source: "NDTV",
//     title:
//       "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
//     thumbnailUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Dummy business thumbnail
//     videoUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
//   {
//     id: "3",
//     source: "NDTV",
//     title:
//       "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
//     thumbnailUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Dummy business thumbnail
//     videoUrl:
//       "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
// ];

// // --- Icons ---
// const PlayIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className="w-10 h-10 text-white opacity-90 drop-shadow-md"
//   >
//     <path
//       fillRule="evenodd"
//       d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={2}
//     stroke="currentColor"
//     className="w-4 h-4 text-orange-500"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// export default function InterviewSec() {
//   return (
//     <>
//       <Banner />
//       <section className="bg-[#FFF9F3] py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <p className="font-playfair pb-4 font-semibold text-[32px] leading-[48px] tracking-[0.04em] text-[#F78532]">
//             Recent Episodes
//           </p>
//           <section className="">
//             <div className=" flex flex-col lg:flex-row gap-8 lg:gap-12">
//               {/* Left Column: Featured Video */}
//               <div className="flex-1 flex flex-col gap-5">
//                 {/* Main Video Player */}
//                 <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-sm">
//                   <video
//                     controls
//                     className="w-full h-full object-cover"
//                     poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000" // Dummy poster image
//                   >
//                     <source
//                       src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//                       type="video/mp4"
//                     />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>

//                 {/* Featured Video Meta */}
//                 <div className="space-y-3 pl-1">
//                   <h1 className="text-xl md:text-[22px] font-serif text-[#181A2A] leading-snug">
//                     Rising yields often precede better forward returns in debt.
//                     For HNIs, this is a phase to refine asset allocation not
//                     retreat from risk, but price it correctly.
//                   </h1>
//                   <p className="text-gray-500 font-medium text-base tracking-wide uppercase">
//                     NDTV
//                   </p>
//                 </div>
//               </div>

//               {/* Right Column: Video Playlist */}
//               <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col gap-4 lg:border-l lg:border-orange-100 lg:pl-8">
//                 {SIDE_VIDEOS.map((video) => (
//                   <article
//                     key={video.id}
//                     className="shadow-[0px_4px_6px_0px_#0000000F] bg-[#FFFDFA] border border-[#F7853238] p-4 transition-shadow cursor-pointer flex flex-col gap-3"
//                   >
//                     {/* Card Header */}
//                     <div className="flex justify-between items-center">
//                       <span className="text-orange-600 font-medium text-sm tracking-wide">
//                         {video.source}
//                       </span>
//                       <ChevronRightIcon />
//                     </div>

//                     {/* Card Body */}
//                     <div className="flex gap-4 items-start">
                   
//                       <div className="relative w-32 shrink-0 aspect-[16/10] bg-gray-200 rounded overflow-hidden">
//                         <img
//                           src={video.thumbnailUrl}
//                           alt="Video thumbnail"
//                           className="w-full h-full object-cover"
//                         />
                  
//                         <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
//                           <PlayIcon />
//                         </div>
//                       </div>

                  
//                       <h2 className="text-[15px] text-gray-800 leading-snug font-medium line-clamp-4">
//                         {video.title}
//                       </h2>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </section>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {interviewData.map((video) => (
//               <Link
//                 key={video.id}
//                 href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
//               >
//                 {/* Thumbnail Container */}
//                 <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
//                   <img
//                     src={video.thumbnailUrl}
//                     alt={video.title}
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                   />

//                   {/* Play Button Overlay */}
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                       <Play className="w-6 h-6 text-[#F48C45] fill-[#F48C45] ml-1" />
//                     </div>
//                   </div>

//                   {/* Duration Badge */}
//                   <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                     {video.duration}
//                   </div>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-5 flex-1 flex flex-col justify-between">
//                   <h3 className="text-lg font-semibold text-[#204667] line-clamp-2 group-hover:text-[#F48C45] transition-colors leading-tight">
//                     {video.title}
//                   </h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";
import Banner from "./Banner"; // Adjust import path if needed

// --- Types & Dummy Data ---
interface InterviewSec {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: string;
  date: string;
  slug: string;
}

const interviewData: InterviewSec[] = [
  {
    id: "1",
    title: "The Future of Luxury Real Estate in 2026",
    youtubeId: "dQw4w9WgXcQ", 
    thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    duration: "14:20",
    date: "17 Mar, 2025",
    slug: "luxury-real-estate-2026",
  },
  {
    id: "2",
    title: "Expert Interview: Navigating High Interest Rates",
    youtubeId: "tgbNymZ7vqY",
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    duration: "22:15",
    date: "18 Mar, 2025",
    slug: "navigating-high-interest-rates",
  },
  {
    id: "3",
    title: "Top 5 Strategies for First-Time Homebuyers",
    youtubeId: "kJQP7kiw5Fk",
    thumbnailUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    duration: "08:45",
    date: "19 Mar, 2025",
    slug: "first-time-homebuyers-strategies",
  },

];

interface VideoItem {
  id: string;
  source: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const SIDE_VIDEOS: VideoItem[] = [
  {
    id: "1",
    source: "NDTV",
    title: "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000", 
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    source: "NDTV",
    title: "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000", 
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3",
    source: "NDTV",
    title: "Wealth isn't lost in crashes alone. It's lost quietly, every year, through high costs and hidden friction....",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000", 
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// --- Icons ---
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white opacity-90 drop-shadow-md">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// --- Sub-Component: NewsCard ---
function NewsCard({ post }: { post: { videoUrl: string; slug: string; title: string; duration: string; date: string; } }) {
  return (
    <div className="bg-[#F785320A] border border-[#F4D3BA] rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300 h-full">
      {/* Card Video */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-5 bg-black">
        <iframe
          src={post.videoUrl}
          title={post.title}
          className="w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Meta Data */}
      <div className="flex justify-between items-center text-sm text-[#20466785] font-inter mb-3 font-medium">
        <span>{post.duration} Min</span>
        <span>{post.date}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-playfair text-[#F28B46] font-semibold mb-4 flex-grow">
        {post.title}
      </h3>

    
    </div>
  );
}

// --- Main Component ---
export default function Page() {
  return (
    <>
      <Banner />
      <section className="bg-[#FFF9F3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-playfair pb-4 font-semibold text-[32px] leading-[48px] tracking-[0.04em] text-[#F78532]">
            Recent Episodes
          </p>
          
          <section>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column: Featured Video */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Main Video Player */}
                <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-sm">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Featured Video Meta */}
                <div className="space-y-3 pl-1">
                  <h1 className="text-xl md:text-[22px] font-serif text-[#181A2A] leading-snug">
                    Rising yields often precede better forward returns in debt.
                    For HNIs, this is a phase to refine asset allocation not
                    retreat from risk, but price it correctly.
                  </h1>
                  <p className="text-gray-500 font-medium text-base tracking-wide uppercase">
                    NDTV
                  </p>
                </div>
              </div>

              {/* Right Column: Video Playlist */}
              <div className="w-full lg:w-[400px] xl:w-[570px] flex flex-col gap-4 lg:border-l lg:border-orange-100 lg:pl-8">
                {SIDE_VIDEOS.map((video) => (
                  <article
                    key={video.id}
                    className="shadow-[0px_4px_6px_0px_#0000000F] bg-[#FFFDFA] border border-[#F7853238] p-4 transition-shadow cursor-pointer flex flex-col gap-3"
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-medium text-sm tracking-wide">
                        {video.source}
                      </span>
                      <ChevronRightIcon />
                    </div>

                    {/* Card Body */}
                    <div className="flex gap-4 items-start">
                      <div className="relative w-32 shrink-0 aspect-[16/10] bg-gray-200 rounded overflow-hidden">
                        <img
                          src={video.thumbnailUrl}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <PlayIcon />
                        </div>
                      </div>

                      <h2 className="text-[15px] text-gray-800 leading-snug font-medium line-clamp-4">
                        {video.title}
                      </h2>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <p className="font-playfair pt-14 font-semibold text-[24px] leading-[48px] tracking-[0.04em] text-[#F78532]">
            All Episodes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {interviewData.map((video) => (
              <NewsCard 
                key={video.id} 
                post={{
                  videoUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
                  title: video.title,
                  duration: video.duration,
                  date: video.date,
                  slug: video.slug
                }} 
              />
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
}
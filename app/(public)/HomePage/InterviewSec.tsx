// import React from "react";
// import Link from "next/link";
// import { Play } from "lucide-react";

// // Define the TypeScript interface for our video data
// interface InterviewSec {
//   id: string;
//   title: string;
//   youtubeId: string;
//   thumbnailUrl: string;
//   duration: string;
// }

// // Placeholder data with real estate themes
// // To use actual YouTube thumbnails, change the thumbnailUrl to:
// // https://img.youtube.com/vi/[YOUR_YOUTUBE_ID]/maxresdefault.jpg
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

// export default function InterviewSec() {
//   return (
//    <section className="bg-[#FFF9F3] py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="mb-10 flex items-center justify-between">
//           <div>
//             <h2 className="text-4xl md:text-[42px] text-[#204667] font-bold leading-tight font-playfair">
//               Latest Interviews
//             </h2>
//             <p className="mt-2 text-lg text-[#465A75]">
//               Insights from top real estate professionals and market analysts.
//             </p>
//           </div>
//            <Link 
//             href="/interviews" 
//             className="hidden sm:block text-[#F48C45] hover:text-[#F78532] font-medium transition-colors"
//           >
//             View all interviews &rarr;
//           </Link>
//         </div>

//         {/* Video Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {interviewData.map((video) => (
//             <Link
//               key={video.id}
//               href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
//             >
//               {/* Thumbnail Container */}
//               <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
//                 <img
//                   src={video.thumbnailUrl}
//                   alt={video.title}
//                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                 />

//                 {/* Play Button Overlay */}
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
//                   <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                     <Play className="w-6 h-6 text-[#F48C45] fill-[#F48C45] ml-1" />
//                   </div>
//                 </div>

//                 {/* Duration Badge */}
//                 <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                   {video.duration}
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-5 flex-1 flex flex-col justify-between">
//                 <h3 className="text-lg font-semibold text-[#204667] line-clamp-2 group-hover:text-[#F48C45] transition-colors leading-tight">
//                   {video.title}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Mobile "View All" Button */}
//         <div className="mt-8 sm:hidden">
//           <Link
//             href="/interviews"
//             className="block w-full text-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             View all interviews
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

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
    youtubeId: "32TG7acjGPE", // Replace with actual YouTube ID
    thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    duration: "14",
    date: "17 Mar, 2025",
    slug: "future-of-luxury-real-estate",
  },
  {
    id: "2",
    title: "Expert Interview: Navigating High Interest Rates",
    youtubeId: "32TG7acjGPE",
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    duration: "22",
    date: "18 Mar, 2025",
    slug: "navigating-high-interest-rates",
  },
  {
    id: "3",
    title: "Top 5 Strategies for First-Time Homebuyers",
    youtubeId: "32TG7acjGPE",
    thumbnailUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    duration: "8",
    date: "19 Mar, 2025",
    slug: "strategies-for-first-time-homebuyers",
  },

];

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
      <div className="flex justify-between items-center text-sm text-gray-500 mb-3 font-medium">
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

// --- Main Page Component ---
export default function InterviewSec() {
  return (
    <section className="bg-[#FFF9F3] py-16">
      <div className="max-w-7xl mx-auto px-2">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-[42px] text-[#204667] font-bold leading-tight font-playfair">
              Latest Interviews
            </h2>
            <p className="mt-2 text-lg text-[#465A75]">
              Insights from top real estate professionals and market analysts.
            </p>
          </div>
          <Link 
            href="/interviews" 
            className="hidden sm:block text-[#F48C45] hover:text-[#F78532] font-medium transition-colors whitespace-nowrap"
          >
            View all interviews &rarr;
          </Link>
        </div>

        {/* Video Cards Grid replacing the old cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Mobile "View All" Button */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/interviews"
            className="block w-full text-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View all interviews
          </Link>
        </div>

      </div>
    </section>
  );
}
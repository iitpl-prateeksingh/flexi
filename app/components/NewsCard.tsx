import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { NewsPost } from "./path-to-your-data-file"; // Import the interface

export default function NewsCard({ post }: { post: NewsPost }) {
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
        
        {/* Note: If you are using direct MP4 files instead of YouTube/Vimeo embeds, 
            replace the iframe above with the video tag below:
            
        <video controls className="w-full h-full object-cover">
          <source src={post.videoUrl} type="video/mp4" />
        </video> 
        */}
      </div>

      {/* Meta Data */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-3 font-medium">
        <span>{post.duration} Min</span>
        <span>{post.date}</span>
      </div>

      {/* Title (Takes remaining space to push the link to the bottom) */}
      <h3 className="text-xl font-playfair text-[#F28B46] font-semibold mb-4 flex-grow">
        {post.title}
      </h3>

      {/* Watch More Link */}
      <div className="flex justify-end mt-auto pt-2">
        <Link 
          href={`/news/${post.slug}`} 
          className="flex items-center gap-1 text-[13px] text-[#F28B46] hover:text-[#D57130] font-medium transition-colors"
        >
          Watch more <GoArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
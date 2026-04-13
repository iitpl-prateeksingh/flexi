import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

interface BlogPost {
  imageUrl: string;
  title: string;
  readTime: string;
  date: string;
  description: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
      <div className="bg-[#F785320A] border border-[#F4D3BA] rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300">
      
      {/* Card Image */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-5">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Meta Data */}
      <div className="flex justify-between items-center text-[13px] text-gray-500 mb-3 font-medium">
        <span>{post.readTime}</span>
        <span>{post.date}</span>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-playfair text-[#F28B46] font-semibold mb-1">
        {post.title}
      </h3>
      <p className="text-md text-gray-500 leading-5 mb-4 flex-grow">
        {post.description}
      </p>

      {/* Read More Link */}
      <div className="flex justify-end mt-auto">
        <a
          href="/blogs/details"
          className="flex items-center gap-1 text-[13px] text-[#F28B46] hover:text-[#D57130] font-medium transition-colors"
        >
          Read more
          <GoArrowUpRight size={16} />
        </a>
      </div>
   
    </div>
  );
}
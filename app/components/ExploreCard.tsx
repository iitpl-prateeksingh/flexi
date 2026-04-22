"use client";
import React from "react";
import Link from "next/link";

export default function ExploreCard({ blog }: any) {
  if (!blog) return null;

  return (
    <Link href={`/blogs/${blog?.slug}`}>
      <div className="group cursor-pointer">

        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden mb-6 rounded-[4px]">
          <img
            src={blog?.thumbnail || "/ins2.png"}
            alt={blog?.title || "blog"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <span className="text-[#F78532] text-xl block font-playfair">
            {blog?.category === "monthly"
              ? "Monthly Market Outlook"
              : "Weekly Flexi Wrap"}
          </span>

          <h3 className="text-xl font-medium text-[#204667] group-hover:text-[#4A86E8] transition-colors font-inter">
            {blog?.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed font-inter">
            {blog?.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentInterviewsService } from "../../services/pages/interviewpageService";

interface InterviewCardItem {
  id: string;
  title: string;
  description: string;
  linkedinUrl: string;
  thumbnailUrl: string;
  date: string;
}

const formatDate = (date?: string) => {
  if (!date) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  return value.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function NewsCard({ post }: { post: InterviewCardItem }) {
  return (
    <div className="bg-[#F785320A] border border-[#F4D3BA] rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300 h-full">
      <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-48 rounded-xl overflow-hidden mb-5 bg-black">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </a>

     

      <h3 className="text-xl font-playfair text-[#F28B46] font-semibold mb-2">
        {post.title}
      </h3>
<div
        className="text-sm text-[#465A75] leading-6 line-clamp-3 html-editor"
        dangerouslySetInnerHTML={{ __html: post.description || "" }}
      />
     
    </div>
  );
}

export default function InterviewSec() {
  const [interviewData, setInterviewData] = useState<InterviewCardItem[]>([]);

  useEffect(() => {
    const loadRecentInterviews = async () => {
      try {
        const response = await getRecentInterviewsService();
        const items = response?.data?.interviews || [];
        if (!Array.isArray(items) || items.length === 0) return;

        const mapped = items.slice(0, 3).map((item: any, index: number) => ({
          id: item?._id || `${index + 1}`,
          title: item?.title || "",
          description: item?.description || "",
          linkedinUrl: item?.videoUrl || "",
          thumbnailUrl: item?.thumbnail || "",
          date: formatDate(item?.updatedAt) || "",
        }));

        setInterviewData(mapped);
      } catch (error) {}
    };

    loadRecentInterviews();
  }, []);

  return (
    <section className="bg-[#FFF9F3] py-16">
      <div className="max-w-7xl mx-auto px-2">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewData.map((video) => (
            <NewsCard key={video.id} post={video} />
          ))}
        </div>

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

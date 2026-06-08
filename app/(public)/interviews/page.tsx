"use client";

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { getAllInterviewsService } from "../../services/pages/interviewpageService";

interface InterviewItem {
  id: string;
  title: string;
  description: string;
  linkedinUrl: string;
  thumbnailUrl: string;
  date: string;
}
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

// function NewsCard({ post }: { post: InterviewItem }) {
//   return (
//     <div className="bg-[#F785320A] border border-[#F4D3BA] rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300 h-full">
//       <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
//         <div className="w-full h-48 rounded-xl overflow-hidden mb-5 bg-black">
//           <img
//             src={post.thumbnailUrl}
//             alt={post.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </a>
//       <div className="flex justify-end items-center text-sm text-[#20466785] font-inter mb-3 font-medium">
//         <span>{post.date}</span>
//       </div>
//       <h3 className="text-xl font-playfair text-[#F28B46] font-semibold mb-4 flex-grow">
//         {post.title}
//       </h3>
//       <div
//         className="text-sm text-[#465A75] leading-6 line-clamp-3 html-editor"
//         dangerouslySetInnerHTML={{ __html: post.description || "" }}
//       />
//     </div>
//   );
// }
function NewsCard({ post }: { post: InterviewCardItem }) {
  return (
    <div className="bg-[#F785320A] border border-[#F4D3BA] rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow duration-300 h-full">
      <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-48 rounded-xl overflow-hidden mb-5 bg-black">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-contain object-center"
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
       {/* <div className="flex justify-end items-center text-xs text-gray-500 mt-3 font-medium">
       {post.date}
      </div> */}
      
    </div>
  );
}


export default function Page() {
  const [interviewData, setInterviewData] = useState<InterviewCardItem[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getAllInterviewsService(1, 100);
        const items = response?.data?.interviews || [];
        if (!Array.isArray(items) || items.length === 0) return;

        const mapped = items.map((item: any, index: number) => ({
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

    fetchInterviews();
  }, []);

  return (
    <>
      <Banner />
      <section className="bg-[#FFF9F3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <p className="font-playfair pb-1 font-semibold text-[32px] leading-[48px] tracking-[0.04em] text-[#F78532]">
            All Episodes
          </p>
          <p className="text-md font-semibold text-[#204667] mb-3">
              AMFI Registered Mutual Fund
            </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewData.map((video) => (
            <NewsCard key={video.id} post={video} />
          ))}
        </div>
          {/* <section>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1 flex flex-col gap-5">
                <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-sm">
                  {featured && (
                    <a
                      href={featured.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={featured.thumbnailUrl}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  )}
                </div>

                <div className="space-y-3 pl-1">
                  <h1 className="text-xl md:text-[22px] font-serif text-[#181A2A] leading-snug">
                    {featured?.title}
                  </h1>
                  <div
                    className="text-sm text-[#465A75] leading-6 line-clamp-3 html-editor"
                    dangerouslySetInnerHTML={{
                      __html: featured?.description || "",
                    }}
                  />
                  <p className="text-gray-500 font-medium text-base tracking-wide uppercase">
                    {featured?.date}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-[400px] xl:w-[570px] flex flex-col gap-4 lg:border-l lg:border-orange-100 lg:pl-8">
                {sideVideos.map((video) => (
                  <article
                    key={video.id}
                    className="relative shadow-[0px_4px_6px_0px_#0000000F] bg-[#FFFDFA] border border-[#F7853238] p-4 transition-shadow cursor-pointer flex flex-col gap-3"
                  >
                    <FaChevronRight
                      size={10}
                      className="text-orange-600 absolute top-4 right-4"
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-medium text-sm tracking-wide">
                        {video.title}
                      </span>
                    </div>

                    <a
                      href={video.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="relative w-32 shrink-0 aspect-[16/10] bg-gray-200 rounded overflow-hidden">
                          <img
                            src={video.thumbnailUrl}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-[15px] text-gray-800 leading-snug font-medium line-clamp-4">
                            {video.title}
                          </h2>
                          <div
                            className="text-sm text-[#465A75] leading-6 line-clamp-3 html-editor"
                            dangerouslySetInnerHTML={{
                              __html: video.description || "",
                            }}
                          />
                          <p className="text-gray-500 text-xs mt-2 font-medium text-base tracking-wide uppercase">
                            {featured?.date}
                          </p>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section> */}

          {/*<p className="font-playfair pt-14 font-semibold text-[24px] leading-[48px] tracking-[0.04em] text-[#F78532]">
            All Episodes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {interviews.map((video) => (
              <NewsCard key={video.id} post={video} />
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
}

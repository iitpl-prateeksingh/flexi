"use client";

import BlogCard from "@/app/components/BlogCard";
import React, { useEffect, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { getPublicBlogsService } from "../../../services/blogService";

export default function CardList({ data }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Past 7days");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState(data || []);

  const ranges = ["Past 7days", "Past 30days", "Past Year", "All Time"];

  const getDaysFromRange = (range: string) => {
    switch (range) {
      case "Past 7days":
        return 7;
      case "Past 30days":
        return 30;
      case "Past Year":
        return 365;
      case "All Time":
        return null;
      default:
        return 7;
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await getPublicBlogsService({
        category: "monthly",
        search: search || undefined,
        days: getDaysFromRange(selectedRange),
      });

      setBlogs(res?.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedRange]);

  const handleSearch = () => {
    fetchBlogs();
  };
  useEffect(() => {
    if (search === "") {
      fetchBlogs();
    }
  }, [search]);

  console.log("Blogs to display:", blogs);
  return (
    <div className="min-h-screen bg-[#FFFaf5] p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

          {/* Search Bar */}
          <div className="flex items-center bg-transparent border border-[#F4A261] rounded-full p-1 w-full md:max-w-[400px] shadow-sm">
            <div className="px-3 text-gray-400">
              <FiSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Search your blog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="bg-[#F28B46] hover:bg-[#E07935] text-white text-sm font-medium px-6 py-1.5 rounded-full transition-colors"
            >
              SEARCH
            </button>
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full md:w-auto gap-3 border border-[#F4A261] rounded-full px-5 py-2.5 bg-white text-[#E07935] text-sm font-medium shadow-sm hover:bg-orange-50 transition-colors"
            >
              <span>{selectedRange}</span>
              <FiChevronDown
                size={18}
                className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full md:w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                {ranges.map((range) => (
                  <div
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#E07935] cursor-pointer transition-colors"
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20 text-lg font-medium">
            No blogs found
          </div>
        )}
      </div>
    </div>
  );
}
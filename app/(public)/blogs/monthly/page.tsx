"use client"
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import CardList from './cardList';
import { getPublicBlogsService } from "../../../services/blogService"
import { getpublicInsight } from '../../../services/insightService';

export default function Page() {
  const [monthlyBlogs, setMonthlyBlogs] = useState([]);
  const [bannerHeading, setBannerHeading] = useState("");

  useEffect(() => {
    const fetchMonthlyBlogs = async () => {
      try {
        const bannerRes = await getpublicInsight()
        const res = await getPublicBlogsService({
          category: "monthly", // 👈 key param for backend
        });
        setBannerHeading(bannerRes?.data?.monthly);
        setMonthlyBlogs(res?.data || []);
      } catch (err) {
        console.error("Error fetching monthly blogs:", err);
      }
    };

    fetchMonthlyBlogs();
  }, []);
  console.log("Monthly blogs data:", monthlyBlogs);

  return (
    <div>
      <Banner data={bannerHeading} />
      <CardList data={monthlyBlogs} /> {/* 👈 pass data */}
    </div>
  );
}
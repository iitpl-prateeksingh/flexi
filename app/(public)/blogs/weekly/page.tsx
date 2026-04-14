"use client"
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import CardList from './cardList'
import { getpublicInsight } from '../../../services/insightService';
import { getPublicBlogsService } from '../../../services/blogService';

export default function page() {

  const [weeklyBlogs, setWeeklyBlogs] = useState([]);
  const [bannerHeading, setBannerHeading] = useState("");

  useEffect(() => {
    const fetchWeeklyBlogs = async () => {
      try {
        const bannerRes = await getpublicInsight()
        const res = await getPublicBlogsService({
          category: "weekly",
        });
        setBannerHeading(bannerRes?.data?.weekly);
        setWeeklyBlogs(res?.data || []);
      } catch (err) {
        console.error("Error fetching weekly blogs:", err);
      }
    };

    fetchWeeklyBlogs();
  }, []);
  console.log("Weekly blogs data:", weeklyBlogs);
  console.log("banner Heading", bannerHeading)

  return (
    <div>
      <Banner data={bannerHeading} />
      <CardList />
    </div>
  )
}

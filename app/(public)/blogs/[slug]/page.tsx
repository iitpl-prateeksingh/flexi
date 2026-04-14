"use client"
import { useEffect, useState } from 'react';
import ArticlePage from '../details/ArticlePage'
import Banner from '../details/Banner'
import ExploreOther from '../details/ExploreOther'
import { getBlogBySlugService, getPublicBlogsService } from '../../../services/blogService';
import { useParams } from 'next/navigation';
import { getpublicInsight } from '../../../services/insightService';

export default function page() {
  const { slug } = useParams(); // ✅ correct
  console.log("SLUG:", slug);

  const [post, setPost] = useState(null);
  const [bannerHeading, setBannerHeading] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const fetchRelatedBlogs = async (category: string, currentId: string) => {
    try {
      const res = await getPublicBlogsService({
        category,
        limit: 5, // take extra to filter
      });

      let blogs = res?.data || [];

      // ❌ remove current blog
      blogs = blogs.filter((item: any) => item._id !== currentId);

      // ✅ take only 4
      setRelatedBlogs(blogs.slice(0, 4));

    } catch (error) {
      console.log("Error fetching related blogs:", error);
    }
  };

  const fetchPost = async (slug: string) => {
    try {
      const res = await getBlogBySlugService(slug);
      const bannerRes = await getpublicInsight();

      const blog = res?.data;
      const insightData = bannerRes?.data;

      const category = blog?.category;

      // ✅ Banner selection
      const bannerData =
        category === "monthly"
          ? insightData?.monthly
          : insightData?.weekly;

      setPost(blog);
      setBannerHeading(bannerData);

      // 🔥 NEW: Fetch related blogs
      fetchRelatedBlogs(category, blog?._id);

    } catch (error) {
      console.log("Error fetching post:", error);
    }
  };


  useEffect(() => {
    if (slug) fetchPost(slug as string);
  }, [slug]);

  console.log("POST IN PAGE:", relatedBlogs); // IGNORE

  return (
    <div>
      <Banner data={bannerHeading} />
      <ArticlePage post={post} banner={bannerHeading} />
      <ExploreOther blogs={relatedBlogs} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { getBlogsService, deleteBlogService } from "../../../services/blogService";
import BlogTable from "../../../component/insight/BlogTable";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const normalizeResponse = (res) => {
        const list = res?.data ?? res?.blogs ?? res?.docs ?? res;
        return Array.isArray(list) ? list : [];
    };

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await getBlogsService();
            setBlogs(normalizeResponse(res));
        } catch (err) {
            console.error(err);
            toast.error("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBlogService(id);
            toast.success("Blog deleted");
            fetchBlogs();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="p-10">
                <p className="text-gray-500">Loading blogs...</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Blogs
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your blog posts here.
                    </p>
                </div>

                <button
                    onClick={() => router.push("/admin/blogs/create")}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                >
                    + Add Blog
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto px-6 py-4">
                    <BlogTable list={blogs} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}

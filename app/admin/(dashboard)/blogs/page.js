"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { getBlogsService, deleteBlogService, reorderBlogsService } from "../../../services/blogService";
import BlogTable from "../../../component/insight/BlogTable";
import { requestConfirmation } from "../../../component/common/confirmBus";

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
            const [weeklyRes, monthlyRes] = await Promise.all([
                getBlogsService({ category: "weekly" }),
                getBlogsService({ category: "monthly" }),
            ]);
            setBlogs([
                ...normalizeResponse(weeklyRes),
                ...normalizeResponse(monthlyRes),
            ]);
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
        const ok = await requestConfirmation({
            title: "Delete Blog",
            description: "Are you sure you want to delete this blog?",
            confirmText: "Yes, Delete",
        });
        if (!ok) return;
        try {
            await deleteBlogService(id);
            toast.success("Blog deleted");
            fetchBlogs();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    const handleReorder = async (orderedIds) => {
        const ok = await requestConfirmation({
            title: "Save Order",
            description: "Are you sure you want to save this new order?",
            confirmText: "Yes, Save",
            confirmColor: "bg-black",
        });
        if (!ok) return false;
        try {
            await reorderBlogsService(orderedIds);
            toast.success("Order saved");
            return true;
        } catch (err) {
            console.error(err);
            toast.error("Failed to save order");
            return false;
        }
    };

    if (loading) {
        return (
            <div className="p-4 md:p-10">
                <p className="text-gray-500">Loading blogs...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
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

            <div className="rounded-xl shadow-lg overflow-hidden">
                <BlogTable list={blogs} onDelete={handleDelete} onReorder={handleReorder} />
            </div>
        </div>
    );
}

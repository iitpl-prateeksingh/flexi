"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import BlogForm from "../../../../../component/insight/BlogForm";
import {
    getBlogBySlugService,
    updateBlogService,
} from "../../../../../services/blogService";

export default function EditBlogPage() {
    const { slug } = useParams();
    const router = useRouter();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const res = await getBlogBySlugService(slug);
            setData(res?.data || res);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load blog");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) fetchBlog();
    }, [slug]);

    const handleSubmit = async (formData) => {
        try {
            toast.loading("Updating blog...", { id: "blog" });
            await updateBlogService(data._id, formData);
            toast.success("Updated successfully", { id: "blog" });
            router.push("/admin/blogs");
        } catch (err) {
            console.error(err);
            toast.error("Update failed", { id: "blog" });
        }
    };

    if (loading) {
        return <div className="p-4 md:p-10">Loading...</div>;
    }

    if (!data) {
        return <div className="p-4 md:p-10 text-red-500">Blog not found</div>;
    }

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            <div className="bg-white  rounded-xl shadow">
                <BlogForm initialData={data} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

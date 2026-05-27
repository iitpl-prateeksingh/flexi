"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BlogForm from "../../../../component/insight/BlogForm";
import { createBlogService } from "../../../../services/blogService";
import { uploadImageService } from "../../../../services/imageService";

export default function CreateBlogPage() {
    const router = useRouter();

    const handleSubmit = async (data) => {
        try {
            toast.loading("Creating blog...", { id: "blog" });

            let thumbnailUrl = data.thumbnail;

            if (data.thumbnail instanceof File) {
                const res = await uploadImageService(data.thumbnail);
                thumbnailUrl = res.data.url;
            }

            const payload = {
                ...data,
                thumbnail: thumbnailUrl,
            };

            await createBlogService(payload);

            toast.success("Blog created", { id: "blog" });
            router.push("/admin/blogs");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create blog", { id: "blog" });
        }
    };

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

            <div className="bg-white p-6 rounded-xl shadow">
                <BlogForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

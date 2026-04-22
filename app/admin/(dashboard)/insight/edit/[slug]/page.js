// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import toast from "react-hot-toast";

// import BlogForm from "../../../../../component/insight/BlogForm";
// import {
//     getBlogBySlugService,
//     updateBlogService,
// } from "../../../../../services/blogService";

// export default function EditBlogPage() {
//     const { slug } = useParams();   // ✅ use slug instead of id
//     const router = useRouter();

//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // ✅ FETCH BLOG BY SLUG
//     const fetchBlog = async () => {
//         try {
//             console.log("Fetching blog with slug:", slug);
//             setLoading(true);

//             const res = await getBlogBySlugService(slug);
//             console.log("Fetched blog data:", res);
//             setData(res);
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to load blog");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (slug) fetchBlog();
//     }, [slug]);

//     console.log("slug", slug)

//     // ✅ HANDLE UPDATE (uses _id)
//     const handleSubmit = async (formData) => {
//         try {
//             toast.loading("Updating blog...", { id: "blog" });

//             // 🔥 IMPORTANT: use _id from fetched data
//             await updateBlogService(data._id, formData);

//             toast.success("Updated successfully", { id: "blog" });

//             router.push("/admin/blogs");
//         } catch (err) {
//             console.error(err);
//             toast.error("Update failed", { id: "blog" });
//         }
//     };

//     // ✅ LOADING STATE
//     if (loading) {
//         return <div className="p-10">Loading...</div>;
//     }

//     if (!data) {
//         return <div className="p-10 text-red-500">Blog not found</div>;
//     }

//     return (
//         <div className="p-10 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

//             <div className="bg-white p-6 rounded-xl shadow">
//                 <BlogForm initialData={data} onSubmit={handleSubmit} />
//             </div>
//         </div>
//     );
// }